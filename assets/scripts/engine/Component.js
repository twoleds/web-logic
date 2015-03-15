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
    "engine/Bounds"
], function (Bounds) {

    function Component() {
        this._parent = null;
        this._index = Number.POSITIVE_INFINITY;
        this._draggable = false;
        this._focusable = false;
    }

    Component.prototype = Object.create(Object.prototype);
    Component.prototype.constructor = Component;

    Component.prototype.contains = function (point) {
        return this.getBounds().contains(point);
    };

    Component.prototype.getBounds = function () {
        return new Bounds(0, 0, 0, 0);
    };

    Component.prototype.getEngine = function () {
        var engine = null;
        if (this._parent !== null) {
            engine = this._parent.getEngine();
        }
        return engine;
    };

    Component.prototype.getParent = function () {
        return this._parent;
    };

    Component.prototype.getIndex = function () {
        return this._index;
    };

    Component.prototype.isDraggable = function () {
        return this._draggable;
    };

    Component.prototype.isFocusable = function () {
        return this._focusable;
    };

    Component.prototype.onBlur = function (event) {
        if (this._parent !== null) {
            this._parent.onBlur(event);
        }
    };

    Component.prototype.onClick = function (event) {
        if (this._parent !== null) {
            this._parent.onClick(event);
        }
    };

    Component.prototype.onDrag = function (event) {
        if (this._parent !== null) {
            this._parent.onDrag(event);
        }
    };

    Component.prototype.onEnter = function (event) {
        if (this._parent !== null) {
            this._parent.onEnter(event);
        }
    };

    Component.prototype.onFocus = function (event) {
        if (this._parent !== null) {
            this._parent.onFocus(event);
        }
    };

    Component.prototype.onLeave = function (event) {
        if (this._parent !== null) {
            this._parent.onLeave(event);
        }
    };

    Component.prototype.onPaint = function (event) {
    };

    Component.prototype.setDraggable = function (draggable) {
        this._draggable = draggable;
    };

    Component.prototype.setFocusable = function (focusable) {
        this._focusable = focusable;
    };

    Component.prototype.setIndex = function (index) {
        this._index = index;
    };

    return Component;

});