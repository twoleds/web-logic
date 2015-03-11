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
    "project/State",
    "project/ValueList"
], function (State, ValueList) {

    function MooreState() {
        State.call(this);
        this._valueList = new ValueList();
    }

    MooreState.prototype = Object.create(State.prototype);
    MooreState.prototype.constructor = MooreState;

    MooreState.prototype.getValueList = function () {
        return this._valueList;
    };

    return MooreState;

});