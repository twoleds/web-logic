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

define(["engine/Component", "engine/Bounds"], function (Component, Bounds) {

    /**
     * The Container class groups one or more component together.
     *
     * @constructor
     * @public
     */
    function Container() {
        Component.call(this);
        this._children = [];
    }

    Container.prototype = Object.create(Component.prototype);
    Container.prototype.constructor = Container;

    /**
     * Appends the specified component into this container.
     *
     * @param {Component} component
     * @public
     */
    Container.prototype.appendChild = function (component) {

        if (component instanceof Component === false) {
            throw new Error("Invalid argument.");
        }

        if (component._parent !== null) {
            component._parent.removeChild(component);
        }

        var index = 0;
        for (var i = 0; i < this._children.length; i++) {
            if (this._children[i]._index > component._index) {
                break;
            }
        }
        this._children.splice(index, 0, component);

    };

    /**
     * @param {Point} point
     * @returns {null|Component}
     */
    Container.prototype.findByPoint = function (point) {
        var result = null;
        for (var i = this._children.length - 1; i >= 0; i--) {
            var child = this._children[i];
            if (child instanceof Container) {
                result = child.findByPoint(point);
                if (result !== null) {
                    break;
                }
            } else if (child.contains(point)) {
                result = child;
                break;
            }
        }
        return result;
    };

    /**
     * Returns bounds of this container.
     *
     * @returns {Bounds}
     * @public
     */
    Container.prototype.getBounds = function () {
        var bounds = new Bounds(
            Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY,
            Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY
        );
        for (var i = 0; i < this._children.length; i++) {
            bounds.expand(this._children[i].getBounds());
        }
        return bounds;
    };

    /**
     * Returns list of child components of this container.
     *
     * @returns {Component[]}
     * @public
     */
    Container.prototype.getChildren = function () {
        return this._children.slice(0);
    };

    /**
     *
     * @param {PaintEvent} event
     */
    Container.prototype.onPaint = function (event) {
        for (var i = this._children.length - 1; i >= 0; i--) {
            this._children[i].onPaint(event);
        }
    };

    /**
     * Removes the specified component from this container.
     *
     * @param {Component} component
     * @return {boolean}
     * @public
     */
    Container.prototype.removeChild = function (component) {

        if (component instanceof Component === false) {
            throw new Error("Invalid argument.");
        }

        var index = this._children.indexOf(component);
        if (index >= 0) {
            this._children.splice(index, 1);
        }

        return index >= 0;

    };

    return Container;

});