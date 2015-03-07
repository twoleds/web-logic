define(["engine/Component"], function (Component) {

    function MooreState() {
        Component.call(this);
    }

    MooreState.prototype = Object.create(Component.prototype);
    MooreState.prototype.constructor = MooreState;

    return MooreState;

});