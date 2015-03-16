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
    "engine/Bounds",
    "engine/Container",
    "engine/MouseEvent",
    "engine/PaintEvent",
    "engine/Point"
], function (Bounds, Container, MouseEvent, PaintEvent, Point) {

    function Engine(canvas) {
        var self = this;

        this._canvas = canvas;

        this._container = new Container();
        this._container.getEngine = function () {
            return self;
        };

        this._wasDragStarted = false;
        this._draggedComponent = null;
        this._dragEvent = null;
        this._focusedComponent = null;
        this._hoveredComponent = null;
        this._updateRequest = null;
        this._mousePoint = new Point(0, 0);

        this._init();
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

        this._canvas.addEventListener("touchstart", function (event) {
            var touch = event.touches[0];
            var point = new Point(
                touch.pageX - self._canvas.offsetLeft,
                touch.pageY - self._canvas.offsetTop
            );
            self._mousePoint = point;
            self._handleMouseDown(point);
        });

        this._canvas.addEventListener("touchend", function (event) {
            self._handleMouseUp(self._mousePoint);
        });

        this._canvas.addEventListener("touchmove", function (event) {
            var touch = event.touches[0];
            var point = new Point(
                touch.pageX - self._canvas.offsetLeft,
                touch.pageY - self._canvas.offsetTop
            );
            self._mousePoint = point;
            self._handleMouseMove(point);
        });

        this._canvas.addEventListener("selectstart", function (event) {
            event.preventDefault();
        });

    };

    Engine.prototype._clearFocus = function () {
        if (this._focusedComponent !== null) {
            this._focusedComponent._focused = false;
            this._focusedComponent.onBlur(new MouseEvent(this, new Point(0, 0)), null);
            this._focusedComponent = null;
            this.update();
        }
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

    Engine.prototype.getFocusedComponent = function () {
        return this._focusedComponent;
    };

    Engine.prototype.getHoveredComponent = function () {
        return this._hoveredComponent;
    };

    Engine.prototype._handleMouseClick = function (point) {

        var component = this._container.findByPoint(point);
        var event = new MouseEvent(this, point, component);

        if (component !== null) {
            component.onClick(event);
            this.update();
        }

    };

    Engine.prototype._handleMouseDown = function (point) {

        var component = this._container.findByPoint(point);
        var event = new MouseEvent(this, point, component);

        if (this._focusedComponent !== component) {
            if (this._focusedComponent !== null) {
                this._focusedComponent._focused = false;
                this._focusedComponent.onBlur(event);
                this._focusedComponent = null;
            }
            if (component !== null && component.isFocusable()) {
                this._focusedComponent = component;
                this._focusedComponent._focused = true;
                this._focusedComponent.onFocus(event);
            }
            this.update();
        }

        if (component !== null && component.isDraggable()) {
            this._draggedComponent = component;
            this._wasDragStarted = false;
            this._dragEvent = event;
            this.update();
        }
        this.update();

    };

    Engine.prototype._handleMouseMove = function (point) {

        var component = this._container.findByPoint(point);
        var event = new MouseEvent(this, point, component);

        if (this._draggedComponent !== null) {
            if (this._wasDragStarted === false) {
                this._draggedComponent.onDragStart(this._dragEvent);
                this._wasDragStarted = true;
            }
            this._draggedComponent.onDrag(event);
            this.update();
        } else if (this._hoveredComponent !== component) {
            if (this._hoveredComponent !== null) {
                this._hoveredComponent._hovered = false;
                this._hoveredComponent.onLeave(event);
                this._hoveredComponent = null;
            }
            if (component !== null) {
                this._hoveredComponent = component;
                this._hoveredComponent._hovered = true;
                this._hoveredComponent.onEnter(event);
            }
            this.update();
        }

    };

    Engine.prototype._handleMouseUp = function (point) {

        var component = this._container.findByPoint(point);
        var event = new MouseEvent(this, point, component);

        if (this._draggedComponent !== null && this._wasDragStarted === true) {
            this._draggedComponent.onDragEnd(event);
        }

        this._draggedComponent = null;
        this._wasDragStarted = false;
        this._dragEvent = null;

    };

    Engine.prototype._handlePaint = function () {

        if (this._canvas.offsetWidth != this._canvas.width ||
            this._canvas.offsetHeight != this._canvas.height) {
            this._canvas.width = this._canvas.offsetWidth;
            this._canvas.height = this._canvas.offsetHeight;
        }

        var ctx = this._canvas.getContext("2d");
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        var event = new PaintEvent(this, ctx, new Bounds(
            0, 0, this._canvas.width, this._canvas.height
        ));

        this._updateRequest = null;
        this._container.onPaint(event);

    };

    Engine.prototype.update = function () {
        var self = this;
        if (this._updateRequest === null) {
            this._updateRequest = window.requestAnimationFrame(function () {
                self._handlePaint();
            });
        }
    };

    return Engine;

});