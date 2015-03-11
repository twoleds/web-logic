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
    "project/List",
    "project/Value"
], function (List, Value) {

    function ValueList() {
        List.call(this);
    }

    ValueList.prototype = Object.create(List.prototype);
    ValueList.prototype.constructor = ValueList;

    ValueList.prototype.append = function (signal) {
        if (signal instanceof Value === false) {
            throw new Error("Invalid argument.");
        }
        List.prototype.append.call(this, signal);
    };

    ValueList.prototype.getByName = function (name) {
        var signal = null;
        if (typeof name === "string") {
            for (var i = 0; i < this._items.length; i++) {
                if (this._items[i].getName() == name) {
                    signal = this._items[i];
                    break;
                }
            }
        }
        return signal;
    };

    ValueList.prototype.remove = function (signal) {
        if (signal instanceof Value === false) {
            throw new Error("Invalid argument.");
        }
        List.prototype.remove.call(signal);
    };

    ValueList.prototype.toString = function () {
        var str = "";
        for (var i = 0; i < this._items.length; i++) {
            str += this._items[i];
        }
        return str;
    };

    return ValueList;

});