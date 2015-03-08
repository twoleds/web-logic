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

define(["engine/Component", "machine/SignalList"], function (Component, SignalList) {

    function MooreState() {
        Component.call(this);
        this._name = null;
        this._output = new SignalList();
    }

    MooreState.prototype = Object.create(Component.prototype);
    MooreState.prototype.constructor = MooreState;

    MooreState.prototype.getName = function () {
        return this._name;
    };

    MooreState.prototype.getOutput = function () {
        return this._output;
    };

    MooreState.prototype.setName = function (name) {
        this._name = name;
    };

    return MooreState;

});