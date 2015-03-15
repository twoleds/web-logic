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

    function Bounds(x, y, w, h) {
        this.x = x || 0;
        this.y = y || 0;
        this.w = w || 0;
        this.h = h || 0;
    }

    Bounds.prototype = Object.create(Object.prototype);
    Bounds.prototype.constructor = Bounds;

    Bounds.prototype.clone = function () {
        return new Bounds(this.x, this.y, this.w, this.h);
    };

    Bounds.prototype.contains = function (point) {
        return (point.x >= this.x) && (point.y >= this.y) &&
            (point.x <= (this.x + this.w)) && (point.y <= (this.y + this.h));
    };

    Bounds.prototype.intersects = function (bounds) {
        return ((bounds.x + bounds.w) >= this.x) &&
            ((bounds.y + bounds.h) >= this.y) &&
            (bounds.x <= (this.x + this.w)) &&
            (bounds.y <= (this.y + this.h));
    };

    Bounds.prototype.translate = function (dx, dy) {
        this.x += dx;
        this.y += dy;
        return this;
    };

    return Bounds;

});