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

    function ToolbarButton() {
        this._root = null;
        this._icon = this._icon || '';
        this._title = this._title || '';
        this._init();
    }

    ToolbarButton.prototype = Object.create(Object.prototype);
    ToolbarButton.prototype.constructor = ToolbarButton;

    ToolbarButton.prototype._init = function () {
        var self = this;

        this._root = document.createElement("button");
        this._root.classList.add("btn");
        this._root.classList.add("btn-default");

        var icon = document.createElement("span");
        icon.className = this._icon;
        this._root.appendChild(icon);

        this._root.addEventListener('click', function () {
            self.execute();
        });

    };

    ToolbarButton.prototype.execute = function () {
    };

    ToolbarButton.prototype.getActive = function () {
        return this._root.classList.contains('active');
    };

    ToolbarButton.prototype.setActive = function (active) {
        if (active) {
            this._root.classList.add('active');
        } else {
            this._root.classList.remove('active');
        }
    };

    ToolbarButton.prototype.getIcon = function () {
        return this._icon;
    };

    ToolbarButton.prototype.setIcon = function (icon) {
        this._icon = icon;
    };

    ToolbarButton.prototype.getTitle = function () {
        return this._title;
    };

    ToolbarButton.prototype.setTitle = function (title) {
        this._title = title;
    };

    return ToolbarButton;

});