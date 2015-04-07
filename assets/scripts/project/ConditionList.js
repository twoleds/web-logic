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
    "project/Condition"
], function (Condition) {

    function ConditionList() {
        this._items = [];
    }

    ConditionList.prototype = Object.create(Object.prototype);
    ConditionList.prototype.constructor = ConditionList;

    ConditionList.prototype.append = function (condition) {
        if (condition instanceof Condition === false) {
            throw new Error("Invalid type of condition.");
        }
        this._items.push(condition);
    };

    ConditionList.prototype.clear = function () {
        this._items = [];
    };

    ConditionList.prototype.get = function (index) {
        var value = null;
        if (index >= 0 && index < this._items.length) {
            value = this._items[index];
        }
        return value;
    };

    ConditionList.prototype.getByInput = function (input) {
        for (var i = 0; i < this._items.length; i++) {
            if (this._items[i].test(input)) {
                return this._items[i];
            }
        }
        return null;
    };

    ConditionList.prototype.length = function () {
        return this._items.length;
    };

    ConditionList.prototype.remove = function (condition) {
        if (condition instanceof Condition === false) {
            throw new Error("Invalid type of condition.");
        }
        var index = this._items.indexOf(condition);
        if (index >= 0) {
            this._items.splice(index, 1);
        }
        return index >= 0;
    };

    return ConditionList;

});