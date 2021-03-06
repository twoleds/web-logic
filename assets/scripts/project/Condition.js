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
    "project/ValueList"
], function (ValueList) {

    function Condition() {
        this._input = new ValueList();
        this._output = new ValueList();
    }

    Condition.prototype = Object.create(Object.prototype);
    Condition.prototype.constructor = Condition;

    Condition.prototype.getInput = function () {
        return this._input;
    };

    Condition.prototype.getOutput = function () {
        return this._output;
    };

    Condition.prototype.test = function (input) {
        for (var i = 0, c = this._input.length(); i < c; i++) {
            var signalA = this._input.get(i);
            var signalB = input.getByName(signalA.getName());
            if (signalB === null || signalB.getValue() != signalA.getValue()) {
                return false;
            }
        }
        return true;
    };

    return Condition;

});