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
    "../logic/ToolbarButton"
], function (ToolbarButton) {

    function ToolbarPause(simulator) {
        this._simulator = simulator;
        this.setIcon('fa fa-fw fa-pause');
        this.setTitle("Pozastaviť simuláciu");
        ToolbarButton.call(this);
    }

    ToolbarPause.prototype = Object.create(ToolbarButton.prototype);
    ToolbarPause.prototype.constructor = ToolbarPause;

    ToolbarPause.prototype.execute = function () {
        if (this._simulator._interval !== null) {
            clearInterval(this._simulator._interval);
            this._simulator._interval = null;
        }
    };

    return ToolbarPause;

});