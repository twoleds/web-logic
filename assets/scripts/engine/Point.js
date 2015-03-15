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

    function Point(x, y) {
        this.x = x || 0;
        this.y = y || 0;
    }

    Point.prototype = Object.create(Object.prototype);
    Point.prototype.constructor = Point;

    Point.prototype.add = function (p) {
        this.x += p.x;
        this.y += p.y;
        return this;
    };

    Point.prototype.clone = function () {
        return new Point(this.x, this.y);
    };

    Point.prototype.length = function () {
        return Math.sqrt((this.x * this.x) + (this.y * this.y));
    };

    Point.prototype.normalize = function () {
        var length = this.length();
        this.x /= length;
        this.y /= length;
        return this;
    };

    Point.prototype.normal = function () {
        var tmp = this.x;
        this.x = -this.y;
        this.y = tmp;
        return this;
    };

    Point.prototype.rotate = function (delta) {
        var cos = Math.cos(delta);
        var sin = Math.sin(delta);
        var x = (cos * this.x) - (sin * this.y);
        var y = (sin * this.x) + (cos * this.y);
        this.x = x;
        this.y = y;
        return this;
    };

    Point.prototype.round = function () {
        this.x = Math.round(this.x);
        this.y = Math.round(this.y);
        return this;
    };

    Point.prototype.scale = function (sx, sy) {
        this.x *= sx;
        this.y *= sy;
        return this;
    };

    Point.prototype.sub = function (p) {
        this.x -= p.x;
        this.y -= p.y;
        return this;
    };

    Point.prototype.transform = function (transform) {
        transform.transform(this);
        return this;
    };

    Point.prototype.translate = function (dx, dy) {
        this.x += dx;
        this.y += dy;
        return this;
    };

    return Point;

});