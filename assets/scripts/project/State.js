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
    }

    State.prototype = Object.create(State.prototype);
    State.prototype.constructor = State;

    State.prototype.getName = function () {
        return this._name;
    };

    State.prototype.setName = function (name) {
        if (typeof name !== "string") {
            throw new Error("Invalid type of state name.");
        }
        this._name = name;
    };

    return State;

});