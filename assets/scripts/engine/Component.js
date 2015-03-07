define(function () {

    /**
     * The Component class is base class of all graphics components.
     *
     * @constructor
     * @public
     */
    function Component() {
        this._parent = null;
    }

    Component.prototype = Object.create(Object.prototype);
    Component.prototype.constructor = Component;

    /**
     * Returns parent component of this component.
     *
     * @returns {null|Component}
     * @public
     */
    Component.prototype.getParent = function () {
        return this._parent;
    };

    return Component;

});