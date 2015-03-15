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
    "engine/Component",
    "engine/Bounds"
], function (Component, Bounds) {

    function Container() {
        Component.call(this);
        this._children = [];
    }

    Container.prototype = Object.create(Component.prototype);
    Container.prototype.constructor = Container;

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

    Container.prototype.getBounds = function () {
        var x0 = Number.POSITIVE_INFINITY, y0 = Number.POSITIVE_INFINITY;
        var x1 = Number.NEGATIVE_INFINITY, y1 = Number.NEGATIVE_INFINITY;
        for (var i = 0; i < this._children.length; i++) {
            var bounds = this._children[i].getBounds();
            if (bounds.x < x0) x0 = bounds.x;
            if (bounds.y < y0) y0 = bounds.y;
            if ((bounds.x + bounds.w) > x1) x1 = bounds.x + bounds.w;
            if ((bounds.y + bounds.h) > y1) y1 = bounds.y + bounds.h;
        }
        return new Bounds(x0, y0, x1 - x0, y1 - y0);
    };

    Container.prototype.getChildren = function () {
        return this._children.slice(0);
    };

    Container.prototype.onPaint = function (event) {
        for (var i = this._children.length - 1; i >= 0; i--) {
            this._children[i].onPaint(event);
        }
    };

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