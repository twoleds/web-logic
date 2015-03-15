define([], function () {

    function Transform(a, b, c, d, e, f) {
        this.m11 = a || 1;
        this.m21 = b || 0;
        this.m12 = c || 0;
        this.m22 = d || 1;
        this.m13 = e || 0;
        this.m23 = f || 0;
    }

    Transform.prototype = Object.create(Object.prototype);
    Transform.prototype.constructor = Transform;

    Transform.prototype.clone = function () {
        return new Transform(
            this.m11, this.m21, this.m12, this.m22, this.m13, this.m23
        );
    };

    Transform.prototype.reset = function () {
        this.m11 = 1;
        this.m12 = 0;
        this.m13 = 0;
        this.m21 = 0;
        this.m22 = 1;
        this.m23 = 0;
        return this;
    };

    Transform.prototype.rotate = function (delta) {
        var cos = Math.cos(delta);
        var sin = Math.sin(delta);
        this.multiply(cos, sin, -sin, cos, 0, 0);
        return this;
    };

    Transform.prototype.rotateIn = function (delta, cx, cy) {
        this.translate(cx, cy);
        this.rotate(delta);
        this.translate(-cx, -cy);
        return this;
    };

    Transform.prototype.scale = function (sx, sy) {
        this.multiply(sx, 0, 0, sy, 0, 0);
        return this;
    };

    Transform.prototype.shear = function (sx, sy) {
        this.multiply(1, sy, sx, 1, 0, 0);
        return this;
    };

    Transform.prototype.multiply = function (a, b, c, d, e, f) {
        var m11, m12, m13, m21, m22, m23;
        m11 = (this.m11 * a) + (this.m12 * b);
        m12 = (this.m11 * c) + (this.m12 * d);
        m13 = (this.m11 * e) + (this.m12 * f) + (this.m13);
        m21 = (this.m21 * a) + (this.m22 * b);
        m22 = (this.m21 * c) + (this.m22 * d);
        m23 = (this.m21 * e) + (this.m22 * f) + (this.m23);
        this.m11 = m11;
        this.m12 = m12;
        this.m13 = m13;
        this.m21 = m21;
        this.m22 = m22;
        this.m23 = m23;
        return this;
    };

    Transform.prototype.transform = function (p) {
        var x = (this.m11 * p.x) + (this.m12 * p.y) + (this.m13);
        var y = (this.m21 * p.x) + (this.m22 * p.y) + (this.m23);
        p.x = x;
        p.y = y;
        return this;
    };

    Transform.prototype.translate = function (tx, ty) {
        this.multiply(1, 0, 0, 1, tx, ty);
        return this;
    };

    return Transform;

});