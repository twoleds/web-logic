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
    "engine/Container", "engine/MouseEvent", "engine/PaintEvent", "engine/Point"
], function (Container, MouseEvent, PaintEvent, Point) {

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

        this._canvas.addEventListener("click", function (event) {
            var point = new Point(
                event.pageX - self._canvas.offsetLeft,
                event.pageY - self._canvas.offsetTop
            );
            self._handleMouseClick(point);
        });

        this._canvas.addEventListener("mousedown", function (event) {
            var point = new Point(
                event.pageX - self._canvas.offsetLeft,
                event.pageY - self._canvas.offsetTop
            );
            self._handleMouseDown(point);
        });

        this._canvas.addEventListener("mousemove", function (event) {
            var point = new Point(
                event.pageX - self._canvas.offsetLeft,
                event.pageY - self._canvas.offsetTop
            );
            self._handleMouseMove(point);
        });

        this._canvas.addEventListener("mouseup", function (event) {
            var point = new Point(
                event.pageX - self._canvas.offsetLeft,
                event.pageY - self._canvas.offsetTop
            );
            self._handleMouseUp(point);
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

    Engine.prototype._handleMouseClick = function (point) {

        var event = new MouseEvent(this, point);
        var component = this._container.findByPoint(point);

        if (component !== null) {
            component.onClick(event);
        }

    };

    Engine.prototype._handleMouseDown = function (point) {

        var event = new MouseEvent(this, point);
        var component = this._container.findByPoint(point);

        if (this._focusedComponent !== component) {
            if (this._focusedComponent !== null) {
                this._focusedComponent.onBlur(event);
                this._focusedComponent = null;
            }
            if (component !== null) {
                this._focusedComponent = component;
                this._focusedComponent.onFocus(event);
            }
        }

    };

    Engine.prototype._handleMouseMove = function (point) {

        var event = new MouseEvent(this, point);
        var component = this._container.findByPoint(point);

        if (this._hoveredComponent !== component) {
            if (this._hoveredComponent !== null) {
                this._hoveredComponent.onLeave(event);
                this._hoveredComponent = null;
            }
            if (component !== null) {
                this._hoveredComponent = component;
                this._hoveredComponent.onEnter(event);
            }
        }

    };

    Engine.prototype._handleMouseUp = function (point) {

        var event = new MouseEvent(this, point);
        var component = this._container.findByPoint(point);



    };

    return Engine;

});