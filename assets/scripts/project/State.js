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

define(function () {

    function State() {
        this._name = '';
        this._x = 0;
        this._y = 0;
        this._z = 0;
    }

    State.prototype = Object.create(State.prototype);
    State.prototype.constructor = State;

    State.prototype.getName = function () {
        return this._name;
    };

    State.prototype.getX = function () {
        return this._x;
    };

    State.prototype.getY = function () {
        return this._y;
    };

    State.prototype.getZ = function () {
        return this._z;
    };

    State.prototype.setName = function (name) {
        if (typeof name !== "string") {
            throw new Error("Invalid type of state name.");
        }
        this._name = name;
    };

    State.prototype.setXYZ = function (x, y, z) {
        if (typeof x !== "number") {
            throw new Error("Invalid type of argument.");
        }
        if (typeof y !== "number") {
            throw new Error("Invalid type of argument.");
        }
        if (typeof z !== "number") {
            throw new Error("Invalid type of argument.");
        }
        this._x = x;
        this._y = y;
        this._z = z;
    };

    return State;

});