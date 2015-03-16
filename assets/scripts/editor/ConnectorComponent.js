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
    "engine/Point",
    "engine/Bounds"
], function (Component, Point, Bounds) {

    function ConnectorComponent(connector, source, target) {
        Component.call(this);

        this.setFocusable(true);
        this.setDraggable(false);
        this.setIndex(100);

        this._connector = connector;
        this._source = source;
        this._target = target;

        this._c0 = new Point(0, 0);
        this._c1 = new Point(0, 0);
        this._c2 = new Point(0, 0);
        this._c3 = new Point(0, 0);
    }

    ConnectorComponent.prototype = Object.create(Component.prototype);
    ConnectorComponent.prototype.constructor = ConnectorComponent;

    ConnectorComponent.prototype.contains = function (point) {
        var ctx = this.getEngine().getContext();
        ctx.beginPath();
        ctx.moveTo(this._c0.x, this._c0.y);
        ctx.lineTo(this._c1.x, this._c1.y);
        ctx.lineTo(this._c2.x, this._c2.y);
        ctx.lineTo(this._c3.x, this._c3.y);
        ctx.closePath();
        return ctx.isPointInPath(point.x, point.y);
    };

    ConnectorComponent.prototype.getBounds = function () {
        return new Bounds(
            Math.min(Math.min(Math.min(this._c0.x, this._c1.x), this._c2.x), this._c3.x),
            Math.min(Math.min(Math.min(this._c0.y, this._c1.y), this._c2.y), this._c3.y),
            Math.max(Math.max(Math.max(this._c0.x, this._c1.x), this._c2.x), this._c3.x),
            Math.max(Math.max(Math.max(this._c0.y, this._c1.y), this._c2.y), this._c3.y)
        );
    };

    ConnectorComponent.prototype.onPaint = function (event) {
        var ctx = event.getContext();

        if (this._source === this._target) {

            var sBounds = this._source.getBounds();
            var sc = sBounds.center();
            var sd = sc.clone().translate(0, -50);
            var se = sc.clone().translate(0, -(sBounds.w / 2));
            var sa = se.clone().rotate(-(Math.PI / 4), sc.x, sc.y);
            var sb = se.clone().rotate(Math.PI / 4, sc.x, sc.y);
            var sf = sc.clone().translate(0, -100);
            var sg = se.clone().rotate(-(Math.PI / 4), sf.x, sf.y);
            var sh = se.clone().rotate(Math.PI / 4, sf.x, sf.y);

            ctx.strokeStyle = "#000";
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(sb.x, sb.y);
            ctx.bezierCurveTo(sg.x, sg.y, sh.x, sh.y, sa.x, sa.y);
            ctx.stroke();

            var zv = (new Point(sb.x - sc.x, sb.y - sc.y)).normalize();
            var zn = zv.clone().normal().scale(5, 5);
            var z = sb.clone().add(zv.clone().scale(10, 10));
            var x = z.clone().add(zn);
            var y = z.clone().sub(zn);

            ctx.beginPath();
            ctx.moveTo(sb.x, sb.y);
            ctx.lineTo(x.x, x.y);
            ctx.moveTo(sb.x, sb.y);
            ctx.lineTo(y.x, y.y);
            ctx.stroke();

            //ctx.textAlign = "center";
            //ctx.textBaseline = "middle";
            //ctx.fillText(this._text, sd.x, sd.y);

        }
        else {

            var ow = 55;
            var os = 0.55;

            var s1 = this._source.getBounds().center();
            var s2 = this._target.getBounds().center();

            var sc = s2.clone().sub(s1).scale(0.5, 0.5).add(s1);
            var sd = s2.clone().sub(s1).normalize().normal().scale(ow, ow).add(sc);

            var c0 = sd.clone().sub(s1).normalize().scale(25, 25).add(s1);
            var c1 = sd.clone().sub(s1).scale(os, os).add(s1);
            var c2 = sd.clone().sub(s2).scale(os, os).add(s2);
            var c3 = sd.clone().sub(s2).normalize().scale(25, 25).add(s2);

            var c01 = c1.clone().sub(c0).scale(0.5, 0.5).add(c0);
            var c12 = c2.clone().sub(c1).scale(0.5, 0.5).add(c1);
            var c23 = c3.clone().sub(c2).scale(0.5, 0.5).add(c2);

            var ca = c01.clone().sub(c12).scale(0.5, 0.5).add(c12);
            var cb = c12.clone().sub(c23).scale(0.5, 0.5).add(c23);
            var cc = ca.clone().sub(cb).scale(0.5, 0.5).add(cb);
            var cd = cb.clone().sub(ca).normalize().normal().scale(10, 10).add(cc);

            var zd = c2.clone().sub(c3).normalize().scale(8, 8).add(c3);
            var zn = c2.clone().sub(c3).normalize().normal().scale(6, 6);
            var z0 = zd.clone().add(zn);
            var z1 = zd.clone().sub(zn);

            this._c0 = c0;
            this._c1 = c1;
            this._c2 = c2;
            this._c3 = c3;

            if (this._hovered || this._focused) {
                ctx.strokeStyle = "#00d";
            } else {
                ctx.strokeStyle = "#000";
            }
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(c0.x, c0.y);
            ctx.bezierCurveTo(c1.x, c1.y, c2.x, c2.y, c3.x, c3.y);
            ctx.stroke();

            //ctx.beginPath();
            //ctx.moveTo(c0.x, c0.y);
            //ctx.lineTo(c1.x, c1.y);
            //ctx.lineTo(c2.x, c2.y);
            //ctx.lineTo(c3.x, c3.y);
            //ctx.closePath();
            //ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(z0.x, z0.y);
            ctx.lineTo(c3.x, c3.y);
            ctx.lineTo(z1.x, z1.y);
            ctx.stroke();

            //context.textAlign = "center";
            //context.textBaseline = "middle";
            //context.fillText(this._text, cd.x, cd.y);
        }

    };

    return ConnectorComponent;

});