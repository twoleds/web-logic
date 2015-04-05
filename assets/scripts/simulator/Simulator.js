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
    "logic/ToolbarGroup",
    "simulator/ToolbarPlay",
    "simulator/ToolbarReset",
    "simulator/ToolbarStep",
    "simulator/ConnectorComponent",
    "simulator/StateComponent",
    "project/ValueList"
], function (Container, Engine, ToolbarGroup, ToolbarPlay, ToolbarReset, ToolbarStep,
             ConnectorComponent, StateComponent, ValueList) {

    function Simulator(environment, project) {
        Container.apply(this);

        this._environment = environment;
        this._project = project;

        this._input = new ValueList();
        this._output = new ValueList();

        this._currentCondition = null;
        this._currentConnector = null;
        this._currentState = null;

        this._init();
    }

    Simulator.prototype = Object.create(Container.prototype);
    Simulator.prototype.constructor = Simulator;

    Simulator.prototype._destroy = function () {
        this._environment.getToolbar().removeGroup(this._toolbar);
    };

    Simulator.prototype._init = function () {

        var canvas = document.createElement("canvas");
        canvas.style.width = "100%";
        canvas.style.height = "100%";
        canvas.width = this._environment._content.offsetWidth;
        canvas.height = this._environment._content.offsetHeight;
        this._environment._content.appendChild(canvas);

        this._engine = new Engine(canvas);
        this._engine.getContainer().appendChild(this);

        this._toolbar = new ToolbarGroup();
        this._environment.getToolbar().appendGroup(this._toolbar);

        this._toolbarPlay = new ToolbarPlay(this);
        this._toolbar.appendButton(this._toolbarPlay);
        this._toolbarStep = new ToolbarStep(this);
        this._toolbar.appendButton(this._toolbarStep);
        this._toolbarReset = new ToolbarReset(this);
        this._toolbar.appendButton(this._toolbarReset);

        var stateList = this._project.getStateList();
        var connectorList = this._project.getConnectorList();
        var states = {};

        for (var i = 0, c = stateList.length(); i < c; i++) {
            var state = stateList.get(i);
            var component = new StateComponent(this, this._project, state);
            states[state.getName()] = component;
            this.appendChild(component);
            if (state.getDefault()) {
                this._currentState = component;
            }
        }

        for (var i = 0, c = connectorList.length(); i < c; i++) {
            var connector = connectorList.get(i);
            var component = new ConnectorComponent(
                this,
                this._project,
                connector,
                states[connector.getSource()],
                states[connector.getTarget()]
            );
            this.appendChild(component);
        }

        this._engine.update();

    };

    Simulator.prototype.getCurrentCondition = function () {
        return this._currentCondition;
    };

    Simulator.prototype.getCurrentConnector = function () {
        return this._currentConnector;
    };

    Simulator.prototype.getCurrentState = function () {
        return this._currentState;
    };

    Simulator.prototype.getInput = function () {
        return this._input;
    };

    Simulator.prototype.getOutput = function () {
        return this._output;
    };

    return Simulator;

});