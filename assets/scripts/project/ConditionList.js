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
    "project/ValueList"
], function (List, ValueList) {

    function ConditionList() {
        List.call(this);
    }

    ConditionList.prototype = Object.create(List.prototype);
    ConditionList.prototype.constructor = ConditionList;

    ConditionList.prototype.append = function (valueList) {
        if (valueList instanceof ValueList === false) {
            throw new Error("Invalid type of value list.");
        }
        List.prototype.append.call(this, valueList);
    };

    ConditionList.prototype.remove = function (valueList) {
        if (valueList instanceof ValueList === false) {
            throw new Error("Invalid type of value list.");
        }
        List.prototype.remove.call(this, valueList);
    };

    return ConditionList;

});