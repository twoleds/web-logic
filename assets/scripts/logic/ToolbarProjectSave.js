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
    "logic/ToolbarButton",
    "project/ProjectIO"
], function (ToolbarButton, ProjectIO) {

    function ToolbarProjectSave(environment) {
        this._environment = environment;
        this.setIcon('fa fa-fw fa-save');
        this.setTitle('Nastavenia projektu');
        ToolbarButton.call(this);
    }

    ToolbarProjectSave.prototype = Object.create(ToolbarButton.prototype);
    ToolbarProjectSave.prototype.constructor = ToolbarProjectSave;

    ToolbarProjectSave.prototype.execute = function () {
        var data = btoa(ProjectIO.write(this._environment._project));
        var link = document.createElement("a");
        link.download = this._environment._project.getName() + ".fsm";
        link.href = "data:application/x-download;base64," + data;
        link.target = "_blank";
        link.click();
    };

    return ToolbarProjectSave;

});