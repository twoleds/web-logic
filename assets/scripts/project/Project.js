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

define(["project/SignalList", "project/StateList", "project/ConnectorList"], function (SignalList, StateList, ConnectorList) {

    function Project() {
        this._connectorList = new ConnectorList();
        this._name = '';
        this._signalList = new SignalList();
        this._stateList = new StateList;
        this._type = Project.TYPE_UNKNOWN;
    }

    Project.prototype = Object.create(Object.prototype);
    Project.prototype.constructor = Project;

    Project.TYPE_UNKNOWN = 'unknown';
    Project.TYPE_MOORE = 'moore';
    Project.TYPE_MEALY = 'mealy';

    Project.prototype.getConnectorList = function () {
        return this._connectorList;
    };

    Project.prototype.getName = function () {
        return this._name;
    };

    Project.prototype.getSignalList = function () {
        return this._signalList;
    };

    Project.prototype.getStateList = function () {
        return this._stateList;
    };

    Project.prototype.getType = function () {
        return this._type;
    };

    Project.prototype.setName = function (name) {
        this._name = name;
    };

    Project.prototype.setType = function (type) {
        this._type = type;
    };

    return Project;

});