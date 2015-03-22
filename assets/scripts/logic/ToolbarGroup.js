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
    "logic/ToolbarButton"
], function (ToolbarButton) {

    function ToolbarGroup() {
        this._buttons = [];
        this._root = null;
        this._init();
    }

    ToolbarGroup.prototype = Object.create(Object.prototype);
    ToolbarGroup.prototype.constructor = ToolbarGroup;

    ToolbarGroup.prototype._init = function () {
        this._root = document.createElement("div");
        this._root.classList.add("btn-group");
    };

    ToolbarGroup.prototype.appendButton = function (button) {
        if (button instanceof ToolbarButton === false) {
            throw new Error("Invalid type of toolbar button.");
        }
        var index = this._buttons.indexOf(button);
        if (index < 0) {
            this._buttons.push(button);
            this._root.appendChild(button._root);
        }
        return index < 0;
    };

    ToolbarGroup.prototype.removeButton = function (button) {
        if (button instanceof ToolbarButton === false) {
            throw new Error("Invalid type of toolbar button.");
        }
        var index = this._buttons.indexOf(button);
        if (index >= 0) {
            this._buttons.splice(index, 1);
            this._root.removeChild(button._root);
        }
        return index >= 0;
    };

    return ToolbarGroup;

});