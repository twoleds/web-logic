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
    "simulator/ToolbarPause",
    "simulator/ToolbarPlay",
    "simulator/ToolbarReset",
    "simulator/ToolbarStep",
    "simulator/ConnectorComponent",
    "simulator/StateComponent",
    "project/ValueList",
    "project/Value"
], function (Container, Engine, ToolbarGroup, ToolbarPause, ToolbarPlay, ToolbarReset, ToolbarStep,
             ConnectorComponent, StateComponent, ValueList, Value) {

    function Simulator(environment, project) {
        Container.apply(this);

        this._environment = environment;
        this._project = project;

        this._input = new ValueList();
        this._output = new ValueList();

        var signalList = this._project.getSignalList();
        for (var i = 0, c = signalList.length(); i < c; i++) {
            var signal = signalList.get(i);
            var value = new Value();
            value.setName(signal.getName());
            value.setValue('0');
            if (signal.getDirection() == 'input') {
                this._input.append(value);
            } else {
                this._output.append(value);
            }
        }

        this._currentCondition = null;
        this._currentConnector = null;
        this._currentState = null;
        this._interval = null;

        this._init();
    }

    Simulator.prototype = Object.create(Container.prototype);
    Simulator.prototype.constructor = Simulator;

    Simulator.prototype._destroy = function () {
        this._environment.getToolbar().removeGroup(this._toolbar);
    };

    Simulator.prototype._initTask = function () {

        var container = document.createElement("div");
        container.style.position = "absolute";
        container.style.left = "0";
        container.style.top = "0";
        container.style.width = "100%";
        container.style.height = "100px";
        container.style.boxSizing = "border-box";
        this._container.appendChild(container);

        var canvas = document.createElement("canvas");
        canvas.style.width = "300px";
        canvas.style.height = "100px";
        canvas.style.display = "block";
        canvas.style.margin = "0 auto";
        canvas.width = 300;
        canvas.height = 100;
        container.appendChild(canvas);

        this._taskContainer = container;
        this._taskCanvas = canvas;
        this._task = null;

        var self = this;
        require(["simulator/carpark/CarPark"], function (CarPark) {
            self._task = new CarPark(self);
            self._task._canvas = self._taskCanvas;
        });

    };

    Simulator.prototype._initSimulator = function () {

        var container = document.createElement("div");
        container.style.position = "absolute";
        container.style.left = "0";
        container.style.top = "0";
        container.style.width = "100%";
        container.style.height = "100%";
        container.style.paddingTop = "100px";
        container.style.boxSizing = "border-box";
        this._container.appendChild(container);

        var canvas = document.createElement("canvas");
        canvas.style.width = "100%";
        canvas.style.height = "100%";
        canvas.width = this._environment._content.offsetWidth;
        canvas.height = this._environment._content.offsetHeight;
        container.appendChild(canvas);

        this._engine = new Engine(canvas);
        this._engine.getContainer().appendChild(this);

        var stateList = this._project.getStateList();
        var connectorList = this._project.getConnectorList();
        var states = {};

        for (var i = 0, c = stateList.length(); i < c; i++) {
            var state = stateList.get(i);
            var component = new StateComponent(this, this._project, state);
            states[state.getName()] = component;
            this.appendChild(component);
            if (state.getDefault()) {
                this._currentState = state;
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

    Simulator.prototype._init = function () {

        this._toolbar = new ToolbarGroup();
        this._environment.getToolbar().appendGroup(this._toolbar);

        this._toolbarPlay = new ToolbarPlay(this);
        this._toolbar.appendButton(this._toolbarPlay);
        this._toolbarPause = new ToolbarPause(this);
        this._toolbar.appendButton(this._toolbarPause);
        this._toolbarStep = new ToolbarStep(this);
        this._toolbar.appendButton(this._toolbarStep);
        this._toolbarReset = new ToolbarReset(this);
        this._toolbar.appendButton(this._toolbarReset);

        var container = document.createElement("div");
        container.style.position = "relative";
        container.style.width = "100%";
        container.style.height = "100%";
        container.style.left = "0";
        container.style.top = "0";
        this._environment._content.appendChild(container);
        this._container = container;

        this._initSimulator();
        this._initTask();

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

    Simulator.prototype.step = function () {

        if (this._currentConnector !== null) {
            this._currentConnector = null;
            this._currentCondition = null;
            this._engine.update();
        }

        var connectors = this._project.getConnectorList().getBySource(this._currentState.getName());
        for (var i = 0; i < connectors.length; i++) {
            var condition = connectors[i].getConditionList().getByInput(this._input);
            if (condition !== null) {
                this._currentState = this._project.getStateList().getByName(connectors[i].getTarget());
                this._currentConnector = connectors[i];
                this._currentCondition = condition;
                if (this._project.getType() == "moore") {
                    this._output.copy(this._currentState.getOutput());
                } else {
                    this._output.copy(this._currentCondition.getOutput());
                }
                this._engine.update();
                break;
            }
        }

        if (this._task !== null) {
            this._task.step();
        }

    };

    return Simulator;

});