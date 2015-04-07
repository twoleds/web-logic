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
    "project/Value"
], function (Value) {

    function ValueList() {
        this._items = [];
    }

    ValueList.prototype = Object.create(Object.prototype);
    ValueList.prototype.constructor = ValueList;

    ValueList.prototype.append = function (value) {
        if (value instanceof Value === false) {
            throw new Error("Invalid type of value.");
        }
        this._items.push(value);
    };

    ValueList.prototype.clear = function () {
        this._items = [];
    };

    ValueList.prototype.copy = function (values) {
        this.clear();
        for (var i = 0; i < values._items.length; i++) {
            var value = new Value();
            value.setName(values._items[i].getName());
            value.setValue(values._items[i].getValue());
            this.append(value);
        }
    };

    ValueList.prototype.get = function (index) {
        var value = null;
        if (index >= 0 && index < this._items.length) {
            value = this._items[index];
        }
        return value;
    };

    ValueList.prototype.getByName = function (name) {
        var value = null;
        if (typeof name === "string") {
            for (var i = 0; i < this._items.length; i++) {
                if (this._items[i].getName() == name) {
                    value = this._items[i];
                    break;
                }
            }
        }
        return value;
    };

    ValueList.prototype.length = function () {
        return this._items.length;
    };

    ValueList.prototype.remove = function (value) {
        if (value instanceof Value === false) {
            throw new Error("Invalid type of value.");
        }
        var index = this._items.indexOf(value);
        if (index >= 0) {
            this._items.splice(index, 1);
        }
        return index >= 0;
    };

    return ValueList;

});