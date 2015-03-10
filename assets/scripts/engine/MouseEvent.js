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

define(["engine/Event"], function (Event) {

    function MouseEvent(engine, point) {
        Event.call(this, engine);
        this._point = point;
    }

    MouseEvent.prototype = Object.create(Event.prototype);
    MouseEvent.prototype.constructor = MouseEvent;

    MouseEvent.prototype.getPoint = function () {
        return this._point.clone();
    };

    return MouseEvent;

});