define(["engine/Component"], function (Component) {

    function MealyState() {
        Component.call(this);
    }

    MealyState.prototype = Object.create(Component.prototype);
    MealyState.prototype.constructor = MealyState;

    return MealyState;

});