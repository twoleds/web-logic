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

define(["engine/Bounds"], function (Bounds) {

    /**
     * The Component class is base class of all graphics components.
     *
     * @constructor
     * @public
     */
    function Component() {
        this._parent = null;
        this._index = Number.POSITIVE_INFINITY;
    }

    Component.prototype = Object.create(Object.prototype);
    Component.prototype.constructor = Component;

    Component.prototype.getBounds = function () {
        return new Bounds();
    };

    /**
     * Returns parent component of this component.
     *
     * @returns {null|Component}
     * @public
     */
    Component.prototype.getParent = function () {
        return this._parent;
    };

    /**
     * Returns z-index of this component.
     *
     * @returns {number}
     */
    Component.prototype.getIndex = function () {
        return this._index;
    };

    /**
     *
     * @param {PaintEvent} event
     */
    Component.prototype.onPaint = function (event) {
        throw new Error("Override this method.");
    };

    /**
     * Sets new z-index of this component.
     *
     * @param {number} index
     */
    Component.prototype.setIndex = function (index) {
        this._index = index;
    };

    return Component;

});