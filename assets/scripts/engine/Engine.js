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

define(["engine/Container", "engine/PaintEvent", "engine/Point"], function (Container, PaintEvent, Point) {

    function Engine(canvas) {
        this._canvas = canvas;
        this._container = new Container();
        this._init();

        this._hoveredComponent = null;
        this._focusedComponent = null;
    }

    Engine.prototype = Object.create(Object.prototype);
    Engine.prototype.constructor = Engine;

    Engine.prototype._draw = function () {
        var ctx = this._canvas.getContext("2d");
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        this._container.onPaint(new PaintEvent(this, ctx));
    };

    Engine.prototype._init = function () {
        var self = this;

        this._canvas.addEventListener("mousemove", function (event) {

            var point = new Point(
                event.pageX - self._canvas.offsetLeft,
                event.pageY - self._canvas.offsetTop
            );

            var component = self._container.findByPoint(point);

        });

    };

    Engine.prototype.getCanvas = function () {
        return this._canvas;
    };

    Engine.prototype.getContainer = function () {
        return this._container;
    };

    Engine.prototype.getContext = function () {
        return this._canvas.getContext("2d");
    };

    return Engine;

});