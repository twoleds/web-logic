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
    "project/Connector"
], function (Connector) {

    function ConnectorList() {
        this._items = [];
    }

    ConnectorList.prototype = Object.create(List.prototype);
    ConnectorList.prototype.constructor = ConnectorList;

    ConnectorList.prototype.append = function (connector) {
        if (connector instanceof Connector === false) {
            throw new Error("Invalid argument.");
        }
        var index = this._items.indexOf(connector);
        if (index < 0) {
            this._items.push(connector);
        }
        return index < 0;
    };

    ConnectorList.prototype.clear = function () {
        this._items = [];
    };

    ConnectorList.prototype.get = function (index) {
        var connector = null;
        if (index >= 0 && index < this._items.length) {
            connector = this._items[index];
        }
        return connector;
    };

    ConnectorList.prototype.getBySource = function (name) {
        var connector = null;
        for (var i = 0; i < this._items.length; i++) {
            if (this._items[i].getSource() == name) {
                connector = this._items[i];
                break;
            }
        }
        return connector;
    };

    ConnectorList.prototype.getByTarget = function (name) {
        var connector = null;
        for (var i = 0; i < this._items.length; i++) {
            if (this._items[i].getTarget() == name) {
                connector = this._items[i];
                break;
            }
        }
        return connector;
    };

    ConnectorList.prototype.length = function () {
        return this._items.length;
    };

    ConnectorList.prototype.remove = function (connector) {
        if (connector instanceof Connector === false) {
            throw new Error("Invalid argument.");
        }
        var index = this._items.indexOf(connector);
        if (index >= 0) {
            this._items.splice(index, 1);
        }
        return index >= 0;
    };

    return ConnectorList;

});