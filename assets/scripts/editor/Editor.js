// An editor and simulator for finite-state machine.
// Copyright (C) 2015  Jaroslav Kuba
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

define([
    "engine/Container",
    "engine/Engine",
    "engine/Bounds",
    "editor/ConnectorComponent",
    "editor/StateComponent",
    "project/State",
    "project/Connector",
    "dialogs/StateDialog",
    "dialogs/ConnectorDialog",
    "logic/ToolbarGroup",
    "editor/ToolbarConfig",
    "editor/ToolbarConnector",
    "editor/ToolbarRemove",
    "editor/ToolbarState"
], function (Container, Engine, Bounds, ConnectorComponent, StateComponent,
             State, Connector, StateDialog, ConnectorDialog, ToolbarGroup,
             ToolbarConfig, ToolbarConnector, ToolbarRemove, ToolbarState) {

    function Editor(environment, project) {
        Container.call(this);
        this.setDraggable(false);
        this.setFocusable(false);

        this._environment = environment;
        this._project = project;

        this._toolbar = null;
        this._toolbarState = null;
        this._toolbarConnector = null;
        this._toolbarConfig = null;
        this._toolbarRemove = null;

        this._mode = null;

        this._init();
    }

    Editor.prototype = Object.create(Container.prototype);
    Editor.prototype.constructor = Editor;

    Editor.prototype._destroy = function () {
        this._environment.getToolbar().removeGroup(this._toolbar);
    };

    Editor.prototype._init = function () {

        var canvas = document.createElement("canvas");
        canvas.style.width = "100%";
        canvas.style.height = "100%";
        canvas.width = this._environment._content.offsetWidth;
        canvas.height = this._environment._content.offsetHeight;
        this._environment._content.appendChild(canvas);
        this._environment._toolbarModeEditor.setActive(true);

        this._engine = new Engine(canvas);
        this._engine.getContainer().appendChild(this);

        this._toolbar = new ToolbarGroup();
        this._toolbarState = new ToolbarState(this);
        this._toolbar.appendButton(this._toolbarState);
        this._toolbarConnector = new ToolbarConnector(this);
        this._toolbar.appendButton(this._toolbarConnector);
        this._toolbarConfig = new ToolbarConfig(this);
        this._toolbar.appendButton(this._toolbarConfig);
        this._toolbarRemove = new ToolbarRemove(this);
        this._toolbar.appendButton(this._toolbarRemove);
        this._environment.getToolbar().appendGroup(this._toolbar);

        var stateList = this._project.getStateList();
        var connectorList = this._project.getConnectorList();
        var states = {};

        for (var i = 0, c = stateList.length(); i < c; i++) {
            var state = stateList.get(i);
            var component = new StateComponent(this._project, state);
            states[state.getName()] = component;
            this.appendChild(component);
        }

        for (var i = 0, c = connectorList.length(); i < c; i++) {
            var connector = connectorList.get(i);
            var component = new ConnectorComponent(
                connector,
                states[connector.getSource()],
                states[connector.getTarget()]
            );
            this.appendChild(component);
        }

        this._engine.update();
        window.editor = this;
        console.log(this._project);

    };

    Editor.prototype._objectEdit = function () {
        var self = this;
        var focusedObject = this.getEngine().getFocusedComponent();
        if (focusedObject !== null) {
            if (focusedObject instanceof StateComponent) {
                var dialog = new StateDialog(this._project, focusedObject._state);
                dialog.show(function () {
                    self.getEngine().update();
                });
            } else if (focusedObject instanceof ConnectorComponent) {
                var dialog = new ConnectorDialog(this._project, focusedObject._connector);
                dialog.show(function () {
                    self.getEngine().update();
                });
            }
        }
    };

    Editor.prototype._findConnector = function (connector) {
        var component = null;
        var children = this.getChildren();
        for (var i = 0; i < children.length; i++) {
            if (children[i] instanceof ConnectorComponent) {
                if (children[i]._connector == connector) {
                    component = children[i];
                    break;
                }
            }
        }
        return component;
    };

    Editor.prototype._remove = function (component) {
        if (component instanceof StateComponent) {
            this._removeState(component);
        } else if (component instanceof ConnectorComponent) {
            this._removeConnector(component);
        }
    };

    Editor.prototype._removeConnector = function (component) {
        this.removeChild(component);
        this._project.getConnectorList().remove(component._connector);
        this.getEngine().update();
        this.getEngine()._clearFocus();
    };

    Editor.prototype._removeState = function (component) {
        this.removeChild(component);
        this._project.getStateList().remove(component._state);

        var stateName = component._state.getName();
        var connectors = this._project.getConnectorList().getByState(stateName);
        for (var i = 0; i < connectors.length; i++) {
            this._removeConnector(this._findConnector(connectors[i]));
        }

        this.getEngine().update();
        this.getEngine()._clearFocus();
    };

    Editor.prototype._createConnector = function (source, target) {

        var connectors = this._project.getConnectorList().getBySource(
            source._state.getName()
        );
        for (var i = 0; i < connectors.length; i++) {
            if (connectors[i].getTarget() == target._state.getName()) {
                return;
            }
        }

        var connector = new Connector();
        connector.setSource(source._state.getName());
        connector.setTarget(target._state.getName());
        this._project.getConnectorList().append(connector);

        var component = new ConnectorComponent(
            connector, source, target
        );
        this.appendChild(component);
        this.getEngine().update();

    };

    Editor.prototype.onFocus = function (event) {
        switch (this._mode) {
            case 'remove':
                this._mode = null;
                this._toolbarRemove.setActive(false);
                this._remove(event.getTarget());
                break;
            case 'connector-start':
                if (event.getTarget() instanceof StateComponent) {
                    this._mode = 'connector-end';
                    this._connectorSource = event.getTarget();
                }
                this.getEngine()._clearFocus();
                break;
            case 'connector-end':
                if (event.getTarget() instanceof StateComponent) {
                    this._mode = null;
                    this._toolbarConnector.setActive(false);
                    this._createConnector(
                        this._connectorSource, event.getTarget()
                    );
                }
                this.getEngine()._clearFocus();
                break;
        }
    };

    Editor.prototype._stateNew = function () {

        // generate name of new state
        var name = 'S';
        var length = this._project.getStateList().length();
        var found = true;
        for (var j = 0; found; j++) {
            name = 'S' + j;
            found = false;
            for (var i = 0; i < length; i++) {
                if (this._project.getStateList().get(i).getName() == name) {
                    found = true;
                    break;
                }
            }
        }

        // create new state and append into list
        var state = new State();
        state.setName(name);
        state.setXY(30, 30);
        this._project.getStateList().append(state);

        // create new component and append into list
        var component = new StateComponent(this._project, state);
        this.appendChild(component);
        this.getEngine().update();

    };

    Editor.prototype.contains = function (point) {
        return true;
    };

    Editor.prototype.getBounds = function () {
        var canvas = this.getEngine().getCanvas();
        return new Bounds(0, 0, canvas.width, canvas.height);
    };

    return Editor;

});