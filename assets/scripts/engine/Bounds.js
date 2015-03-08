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

    function Bounds(x0, y0, x1, y1) {
        this._x0 = x0 || 0;
        this._y0 = y0 || 0;
        this._x1 = x1 || 0;
        this._y1 = y1 || 0;
    }

    Bounds.prototype = Object.create(Object.prototype);
    Bounds.prototype.constructor = Bounds;

    Bounds.prototype.expand = function (bound) {
        this._x0 = Math.min(bound._x0, this._x0);
        this._y0 = Math.min(bound._y0, this._y0);
        this._x1 = Math.max(bound._x1, this._x1);
        this._y1 = Math.max(bound._y1, this._y1);
    };

    Bounds.prototype.getHeight = function () {
        return Math.abs(this._y1 - this._y0);
    };

    Bounds.prototype.getWidth = function () {
        return Math.abs(this._x1 - this._x0);
    };

    Bounds.prototype.getX0 = function () {
        return this._x0;
    };

    Bounds.prototype.getY0 = function () {
        return this._y0;
    };

    Bounds.prototype.getX1 = function () {
        return this._x1;
    };

    Bounds.prototype.getY1 = function () {
        return this._y1;
    };

    Bounds.prototype.scale = function (factor) {
        this._x0 *= factor;
        this._y1 *= factor;
        this._x1 *= factor;
        this._y1 *= factor;
    };

    Bounds.prototype.setX0 = function (x0) {
        this._x0 = x0;
    };

    Bounds.prototype.setY0 = function (y0) {
        this._y0 = y0;
    };

    Bounds.prototype.setX1 = function (x1) {
        this._x1 = x1;
    };

    Bounds.prototype.setY1 = function (y1) {
        this._y1 = y1;
    };

    Bounds.prototype.translate = function (dx, dy) {
        this._x0 += dx;
        this._y0 += dy;
        this._x1 += dx;
        this._y1 += dy;
    };

    return Bounds;

});