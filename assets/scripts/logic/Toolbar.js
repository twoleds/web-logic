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

define([], function () {

    function Toolbar() {
        this._init();
    }

    Toolbar.prototype = Object.create(Object.prototype);
    Toolbar.prototype.constructor = Toolbar;

    Toolbar.prototype._init = function () {
        this._root = document.createElement("div");
        this._root.classList.add("logic-toolbar");
    };

    Toolbar.prototype.appendGroup = function (group) {
        this._root.appendChild(group._root);
    };

    Toolbar.prototype.removeGroup = function (group) {
        this._root.removeChild(group._root);
    };

    return Toolbar;

});