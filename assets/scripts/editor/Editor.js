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
    "engine/Bounds",
    "editor/ConnectorComponent",
    "editor/StateComponent",
    "project/MealyState",
    "project/MooreState",
    "project/MealyConnector",
    "project/MooreConnector",
    "dialogs/StateDialog"
], function (Container, Bounds, ConnectorComponent, StateComponent, MealyState,
             MooreState, MealyConnector, MooreConnector, StateDialog) {

    function Editor(project) {
        Container.call(this);
        this.setDraggable(false);
        this.setFocusable(false);
        this._project = project;
        this._init();
    }

    Editor.prototype = Object.create(Container.prototype);
    Editor.prototype.constructor = Editor;

    Editor.prototype._init = function () {

        var stateList = this._project.getStateList();
        var connectorList = this._project.getConnectorList();
        var states = {};

        for (var i = 0, c = stateList.length(); i < c; i++) {
            var state = stateList.get(i);
            var component = new StateComponent(state);
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
            }
        }
    };

    Editor.prototype._objectRemove = function () {
        var focusedObject = this.getEngine().getFocusedComponent();
        if (focusedObject !== null) {
            if (focusedObject instanceof StateComponent) {
                this._project.getStateList().remove(focusedObject._state);
                this.removeChild(focusedObject);
                this.getEngine()._focusedComponent = null;
                this.getEngine().update();
            }
        }
    };

    Editor.prototype._connectorNew = function () {
        this._connectorSource = null;
        this._connectorTarget = null;
        this._connectorCreate = true;
        console.log('CONNECTOR NEW');
    };

    Editor.prototype._connectorFinish = function () {
        this._connectorCreate = false;

        var connector;
        if (this._project.getType() == 'moore') {
            connector = new MooreConnector();
        } else {
            connector = new MealyConnector();
        }
        connector.setSource(this._connectorSource._state.getName());
        connector.setTarget(this._connectorTarget._state.getName());
        this._project.getConnectorList().append(connector);

        var component = new ConnectorComponent(
            connector, this._connectorSource, this._connectorTarget
        );
        this.appendChild(component);
        this.getEngine().update();

    };

    Editor.prototype.onFocus = function (event) {
        console.log('CONNECTOR FOCUS');
        if (this._connectorCreate && this._connectorSource == null) {
            if (event.getTarget() instanceof StateComponent) {
                this._connectorSource = event.getTarget();
            }
        } else if (this._connectorCreate && this._connectorTarget == null) {
            if (event.getTarget() instanceof StateComponent) {
                this._connectorTarget = event.getTarget();
                this._connectorFinish();
            }
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
        var state;
        if (this._project.getType() == 'moore') {
            state = new MooreState();
        } else {
            state = new MealyState();
        }
        state.setName(name);
        state.setXY(30, 30);
        this._project.getStateList().append(state);

        // create new component and append into list
        var component = new StateComponent(state);
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