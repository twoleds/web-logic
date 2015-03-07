define(["engine/Component"], function (Component) {

    function MooreConnector() {
        Component.call(this);
        this._sourceState = null;
        this._targetState = null;
    }

    MooreConnector.prototype = Object.create(Component.prototype);
    MooreConnector.prototype.constructor = MooreConnector;

    MooreConnector.prototype.getSourceState = function () {
        return this._sourceState;
    };

    MooreConnector.prototype.getTargetState = function () {
        return this._targetState;
    };

    return MooreConnector;

});