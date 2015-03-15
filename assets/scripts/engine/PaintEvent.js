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
    "engine/Event"
], function (Event) {

    function PaintEvent(engine, context, bounds) {
        Event.call(this, engine);
        this._context = context;
        this._bounds = bounds;
    }

    PaintEvent.prototype = Object.create(Event.prototype);
    PaintEvent.prototype.constructor = PaintEvent;

    PaintEvent.prototype.getBounds = function () {
        return this._bounds;
    };

    PaintEvent.prototype.getContext = function () {
        return this._context;
    };

    return PaintEvent;

});