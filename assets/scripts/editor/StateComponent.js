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

    function StateComponent(project, state) {
        Component.call(this);

        this.setIndex(50);
        this.setDraggable(true);
        this.setFocusable(true);

        this._project = project;
        this._state = state;
        this._x = state.getX();
        this._y = state.getY();
        this._r = 25;
    }

    StateComponent.prototype = Object.create(Component.prototype);
    StateComponent.prototype.constructor = StateComponent;

    StateComponent.prototype.contains = function (point) {
        var result = false;
        if (this.getBounds().contains(point)) {
            result = (Math.pow(point.x - this._x, 2) + Math.pow(point.y - this._y, 2)) <= Math.pow(this._r, 2);
        }
        return result;
    };

    StateComponent.prototype.getBounds = function () {
        return new Bounds(
            this._x - this._r, this._y - this._r,
            this._r * 2, this._r * 2
        );
    };

    StateComponent.prototype.onDrag = function (event) {
        var dx = event.getPoint().x - this._dragMouseX;
        var dy = event.getPoint().y - this._dragMouseY;
        this._x = Math.round((this._dragStartX + dx) / 10) * 10;
        this._y = Math.round((this._dragStartY + dy) / 10) * 10;
    };

    StateComponent.prototype.onDragEnd = function (event) {
        this.onDrag(event);
        this._state.setXY(this._x, this._y);
    };

    StateComponent.prototype.onDragStart = function (event) {
        this._dragMouseX = event.getPoint().x;
        this._dragMouseY = event.getPoint().y;
        this._dragStartX = this._x;
        this._dragStartY = this._y;
    };

    StateComponent.prototype.onPaint = function (event) {
        var ctx = event.getContext();

        ctx.beginPath();
        ctx.moveTo(this._x, this._y - this._r);
        ctx.arcTo(this._x + this._r, this._y - this._r, this._x + this._r, this._y, this._r);
        ctx.arcTo(this._x + this._r, this._y + this._r, this._x, this._y + this._r, this._r);
        ctx.arcTo(this._x - this._r, this._y + this._r, this._x - this._r, this._y, this._r);
        ctx.arcTo(this._x - this._r, this._y - this._r, this._x, this._y - this._r, this._r);
        ctx.closePath();

        if (this._hovered) {
            ctx.fillStyle = '#eeee66';
            ctx.strokeStyle = '#a80036';
        } else if (this._focused) {
            ctx.fillStyle = '#eeee66';
            ctx.strokeStyle = '#a80036';
        } else {
            ctx.fillStyle = '#ffffcc';
            ctx.strokeStyle = '#a80036';
        }

        ctx.lineWidth = 2;
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = '#000000';
        ctx.font = "bold " + Math.floor(this._r * 0.75) + "px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "bottom";
        ctx.fillText(this._state._name, this._x, this._y, this._r);

        if (this._project.getType() == 'moore') {
            var output = '';
            for (var i = 0, c = this._state.getOutput().length(); i < c; i++) {
                output += this._state.getOutput().get(i).getValue();
            }
            ctx.font = "normal " + Math.floor(this._r * 0.55) + "px Arial";
            ctx.textAlign = "center";
            ctx.textBaseline = "top";
            ctx.fillText(output, this._x, this._y, this._r);
        }

    };

    return StateComponent;

});