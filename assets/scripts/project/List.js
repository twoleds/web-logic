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

    function List() {
        this._items = [];
    }

    List.prototype = Object.create(Object.prototype);
    List.prototype.constructor = List;

    List.prototype.append = function (item) {
        this._items.push(item);
    };

    List.prototype.clear = function () {
        this._items = [];
    };

    List.prototype.get = function (index) {
        var item = null;
        if (typeof index === "number") {
            if (index >= 0 && index < this._items.length) {
                item = this._items[index];
            }
        }
        return item;
    };

    List.prototype.length = function () {
        return this._items.length;
    };

    List.prototype.remove = function (item) {
        var index = this._items.indexOf(item);
        if (index >= 0) {
            this._items.splice(index, 1);
        }
    };

    return List;

});