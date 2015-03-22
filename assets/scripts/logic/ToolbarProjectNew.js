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
    "dialogs/ProjectDialog"
], function (ToolbarButton, ProjectDialog) {

    function ToolbarProjectNew(environment) {
        this._environment = environment;
        this.setIcon('fa fa-fw fa-file-o');
        this.setTitle('Vytvoriť nový projekt');
        ToolbarButton.call(this);
    }

    ToolbarProjectNew.prototype = Object.create(ToolbarButton.prototype);
    ToolbarProjectNew.prototype.constructor = ToolbarProjectNew;

    ToolbarProjectNew.prototype.execute = function () {
        var self = this;
        var dialog = new ProjectDialog();
        dialog.setTitle("Vytvoriť projekt");
        dialog.setConfirmTitle("Vytvoriť projekt");
        dialog.show(function () {
            self._environment._project = dialog.getProject();
            self._environment.changeMode('editor');
            self._environment.showStatus("Projekt bol úspešne vytvorený");
            dialog.destroy();
        });
    };

    return ToolbarProjectNew;

});