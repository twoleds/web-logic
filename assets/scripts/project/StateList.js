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
    "project/State"
], function (State) {

    function StateList() {
        this._items = [];
    }

    StateList.prototype = Object.create(Object.prototype);
    StateList.prototype.constructor = StateList;

    StateList.prototype.append = function (state) {
        if (state instanceof State === false) {
            throw new Error("Invalid argument.");
        }
        var index = this._items.indexOf(state);
        if (index < 0) {
            this._items.push(state);
        }
        return index < 0;
    };

    StateList.prototype.clear = function () {
        this._items = [];
    };

    StateList.prototype.get = function (index) {
        var state = null;
        if (index >= 0 && index < this._items.length) {
            state = this._items[index];
        }
        return state;
    };

    StateList.prototype.getByName = function (name) {
        var state = null;
        if (typeof name === "string") {
            for (var i = 0; i < this._items.length; i++) {
                if (this._items[i].getName() == name) {
                    state = this._items[i];
                    break;
                }
            }
        }
        return state;
    };

    StateList.prototype.length = function () {
        return this._items.length;
    };

    StateList.prototype.remove = function (state) {
        if (state instanceof State === false) {
            throw new Error("Invalid argument.");
        }
        var index = this._items.indexOf(state);
        if (index >= 0) {
            this._items.splice(index, 1);
        }
        return index >= 0;
    };

    return StateList;

});