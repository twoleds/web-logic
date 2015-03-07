// An editor and simulator for final state machine.
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