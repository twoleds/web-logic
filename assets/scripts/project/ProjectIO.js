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
    "project/ConnectorList",
    "project/MealyConnector",
    "project/MealyState",
    "project/MooreConnector",
    "project/MooreState",
    "project/Project",
    "project/Signal",
    "project/SignalList",
    "project/StateList",
    "project/Value",
    "project/ValueList"
], function (ConnectorList, MealyConnector, MealyState, MooreConnector,
             MooreState, Project, Signal, SignalList, StateList, Value,
             ValueList) {

    var ProjectIO = {};

    ProjectIO._readConditionList = function (json, conditionList) {
        if (typeof json !== "object" || !json instanceof Array) {
            throw new Error("Invalid type of condition list.");
        }
        for (var i = 0; i < json.length; i++) {
            var valueList = new ValueList();
            this._readValueList(json[i], valueList);
            conditionList.append(valueList);
        }
    };

    ProjectIO._readConnector = function (json) {
        var connector;
        if (typeof json.type !== "string") {
            throw new Error("Undefined type of connector.");
        }
        switch (json.type) {
            case "mealy":
                connector = new MealyConnector();
                this._readSignalList(json.values, connector.getValueList());
                break;
            case "moore":
                connector = new MooreConnector();
                break;
            default:
                throw new Error("Unknown type of connector.");
        }
        this._readConditionList(json.conditions, connector.getConditionList());
        connector.setSource(json.source);
        connector.setTarget(json.target);
        return connector;
    };

    ProjectIO._readConnectorList = function (json, connectorList) {
        if (typeof json !== "object" || !json instanceof Array) {
            throw new Error("Invalid list of connectors.");
        }
        for (var i = 0; i < json.length; i++) {
            connectorList.append(this._readConnector(json[i]));
        }
    };

    ProjectIO._readProject = function (json, project) {
        if (typeof json !== "object" || json === null) {
            throw new Error("Invalid type of project data.");
        }
        project.setName(json.name);
        project.setType(json.type);
    };

    ProjectIO._readSignal = function (json) {
        var signal = new Signal();
        signal.setName(json.name);
        signal.setDirection(json.direction);
        return signal;
    };

    ProjectIO._readSignalList = function (json, signalList) {
        if (typeof json !== "object" || !json instanceof Array) {
            throw new Error("Invalid list of signals.");
        }
        for (var i = 0; i < json.length; i++) {
            signalList.append(this._readSignal(json[i]));
        }
    };

    ProjectIO._readState = function (json) {
        var state;
        if (typeof json.type !== "string") {
            throw new Error("Type of state is undefined.");
        }
        switch (json.type) {
            case "mealy":
                state = new MealyState();
                break;
            case "moore":
                state = new MooreState();
                this._readValueList(json.values, state.getValueList());
                break;
            default:
                throw new Error("Invalid type of state.");
        }
        state.setName(json.name);
        state.setXY(json.x, json.y);
        return state;
    };

    ProjectIO._readStateList = function (json, stateList) {
        if (typeof json !== "object" || json === null) {
            throw new Error("Invalid type of state list.");
        }
        for (var i = 0; i < json.length; i++) {
            stateList.append(this._readState(json[i]));
        }
    };

    ProjectIO._readValue = function (json) {
        if (typeof json !== "object" || json === null) {
            throw new Error("Invalid type of value.");
        }
        var value = new Value();
        value.setName(json.name);
        value.setValue(json.value);
        return value;
    };

    ProjectIO._readValueList = function (json, valueList) {
        if (typeof json !== "object" || !json instanceof Array) {
            throw new Error("Invalid type of value list.");
        }
        for (var i = 0; i < json.length; i++) {
            valueList.append(this._readValue(json[i]));
        }
        return valueList;
    };

    ProjectIO._writeConditionList = function (conditionList) {
        var json = [];
        for (var i = 0, c = conditionList.length(); i < c; i++) {
            json.push(this._writeValueList(conditionList.get(i)));
        }
        return json;
    };

    ProjectIO._writeConnector = function (connector) {
        var json = {};
        json.conditions = this._writeConditionList(
            connector.getConditionList()
        );
        json.source = connector.getSource();
        json.target = connector.getTarget();
        if (connector instanceof MealyConnector) {
            json.type = "mealy";
            json.values = this._writeValueList(connector.getValueList());
        }
        if (connector instanceof MooreConnector) {
            json.type = "moore";
        }
        return json;
    };

    ProjectIO._writeConnectorList = function (connectorList) {
        var json = [];
        for (var i = 0, c = connectorList.length(); i < c; i++) {
            json.push(this._writeConnector(connectorList.get(i)));
        }
        return json;
    };

    ProjectIO._writeProject = function (project) {
        var json = {};
        json.name = project.getName();
        json.type = project.getType();
        return json;
    };

    ProjectIO._writeSignal = function (signal) {
        var json = {};
        json.name = signal.getName();
        json.direction = signal.getDirection();
        return json;
    };

    ProjectIO._writeSignalList = function (signalList) {
        var json = [];
        for (var i = 0, c = signalList.length(); i < c; i++) {
            json.push(this._writeSignal(signalList.get(i)));
        }
        return json;
    };

    ProjectIO._writeState = function (state) {
        var json = {};
        json.name = state.getName();
        json.x = state.getX();
        json.y = state.getY();
        if (state instanceof MealyState) {
            json.type = "mealy";
        }
        if (state instanceof MooreState) {
            json.type = "moore";
            json.values = this._writeValueList(state.getValueList());
        }
        return json;
    };

    ProjectIO._writeStateList = function (stateList) {
        var json = [];
        for (var i = 0, c = stateList.length(); i < c; i++) {
            json.push(this._writeState(stateList.get(i)));
        }
        return json;
    };

    ProjectIO._writeValue = function (value) {
        var json = {};
        json.name = value.getName();
        json.value = value.getValue();
        return json;
    };

    ProjectIO._writeValueList = function (valueList) {
        var json = [];
        for (var i = 0, c = valueList.length(); i < c; i++) {
            json.push(this._writeValue(valueList.get(i)));
        }
        return json;
    };

    ProjectIO.read = function (jsonStr) {
        var json = JSON.parse(jsonStr);
        if (typeof json !== "object" || json === null) {
            throw new Error("Invalid type of input data.");
        }
        var project = new Project();
        this._readProject(json.project, project);
        this._readSignalList(json.signals, project.getSignalList());
        this._readStateList(json.states, project.getStateList());
        this._readConnectorList(json.connectors, project.getConnectorList());
        return project;
    };

    ProjectIO.write = function (project) {
        var json = {};
        json.project = this._writeProject(project);
        json.signals = this._writeSignalList(project.getSignalList());
        json.states = this._writeStateList(project.getStateList());
        json.connectors = this._writeConnectorList(project.getConnectorList());
        return JSON.stringify(json);
    };

    return ProjectIO;

});