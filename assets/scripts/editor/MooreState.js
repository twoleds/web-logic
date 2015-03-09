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

define(["engine/Component", "engine/Bounds", "machine/SignalList"], function (Component, Bounds, SignalList) {

    function MooreState() {
        Component.call(this);
        this._name = null;
        this._output = new SignalList();
        this._x = 100;
        this._y = 100;
        this._r = 25;
    }

    MooreState.prototype = Object.create(Component.prototype);
    MooreState.prototype.constructor = MooreState;

    MooreState.prototype.contains = function (point) {
        var result = false;
        if (this.getBounds().contains(point)) {
            result = (Math.pow(point._x - this._x, 2) + Math.pow(point._y - this._y, 2)) <= Math.pow(this._r, 2);
        }
        return result;
    };

    MooreState.prototype.getBounds = function () {
        return new Bounds(
            this._x - this._r, this._y - this._r,
            this._x + this._r, this._y + this._r
        );
    };

    MooreState.prototype.getName = function () {
        return this._name;
    };

    MooreState.prototype.getOutput = function () {
        return this._output;
    };

    MooreState.prototype.onPaint = function (event) {
        var ctx = event.getContext();

        ctx.beginPath();
        ctx.moveTo(this._x, this._y - this._r);
        ctx.arcTo(this._x + this._r, this._y - this._r, this._x + this._r, this._y, this._r);
        ctx.arcTo(this._x + this._r, this._y + this._r, this._x, this._y + this._r, this._r);
        ctx.arcTo(this._x - this._r, this._y + this._r, this._x - this._r, this._y, this._r);
        ctx.arcTo(this._x - this._r, this._y - this._r, this._x, this._y - this._r, this._r);
        ctx.closePath();

        ctx.fillStyle = '#fefece';
        ctx.fill();
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#a80036';
        ctx.stroke();

        ctx.fillStyle = '#000000';
        ctx.font = "bold " + Math.floor(this._r * 0.75) + "px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "bottom";
        ctx.fillText(this._name, this._x, this._y, this._r);

        ctx.font = "normal " + Math.floor(this._r * 0.5) + "px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "top";
        ctx.fillText(this._output.toString(), this._x, this._y, this._r);

    };

    MooreState.prototype.setName = function (name) {
        this._name = name;
    };

    return MooreState;

});