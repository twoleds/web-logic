define(["engine/Component"], function (Component) {

    function MealyConnector() {
        Component.call(this);
        this._sourceState = null;
        this._targetState = null;
    }

    MealyConnector.prototype = Object.create(Component.prototype);
    MealyConnector.prototype.constructor = MealyConnector;

    MealyConnector.prototype.getSourceState = function () {
        return this._sourceState;
    };

    MealyConnector.prototype.getTargetState = function () {
        return this._targetState;
    };

    return MealyConnector;

});