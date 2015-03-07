define(["engine/Component"], function (Component) {

    function Editor() {
        Component.call(this);
    }

    Editor.prototype = Object.create(Component.prototype);
    Editor.prototype.constructor = Editor;

    return Editor;

});