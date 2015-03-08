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

    function Point(x, y) {
        this._x = x || 0;
        this._y = y || 0;
    }

    Point.prototype.ceil = function () {
        this._x = Math.ceil(this._x);
        this._y = Math.ceil(this._y);
        return this;
    };

    Point.prototype.clone = function () {
        return new Point(this._x, this._y);
    };

    Point.prototype.distance = function () {
        return Math.sqrt((this._x * this._x) + (this._y * this._y));
    };

    Point.prototype.floor = function () {
        this._x = Math.floor(this._x);
        this._y = Math.floor(this._y);
        return this;
    };

    Point.prototype.getX = function () {
        return this._x;
    };

    Point.prototype.getY = function () {
        return this._y;
    };

    Point.prototype.normalize = function () {
        var distance = this.distance();
        this._x /= distance;
        this._y /= distance;
        return this;
    };

    Point.prototype.round = function () {
        this._x = Math.round(this._x);
        this._y = Math.round(this._y);
        return this;
    };

    Point.prototype.scale = function (factor) {
        this._x *= factor;
        this._y *= factor;
        return this;
    };

    Point.prototype.setX = function (x) {
        this._x = x;
        return this;
    };

    Point.prototype.setXY = function (x, y) {
        this._x = x;
        this._y = y;
        return this;
    };

    Point.prototype.setY = function (y) {
        this._y = y;
        return this;
    };

    Point.prototype.translate = function (dx, dy) {
        this._x += dx;
        this._y += dy;
        return this;
    };

    return Point;

});