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

    function Value() {
        this._name = '';
        this._value = '';
    }

    Value.prototype = Object.create(Object.prototype);
    Value.prototype.constructor = Value;

    Value.prototype.getName = function () {
        return this._name;
    };

    Value.prototype.getValue = function () {
        return this._value;
    };

    Value.prototype.setName = function (name) {
        if (typeof name !== "string") {
            throw new Error("Invalid type of signal name.");
        }
        if (name.length == 0) {
            throw new Error("Signal name cannot be empty.");
        }
        this._name = name;
    };

    Value.prototype.setValue = function (value) {
        if (typeof value !== "string") {
            throw new Error("Invalid type of signal value.");
        }
        if (value.length !== 1) {
            throw new Error("Value of signal must contain only one character.");
        }
        this._value = value;
    };

    return Value;

});