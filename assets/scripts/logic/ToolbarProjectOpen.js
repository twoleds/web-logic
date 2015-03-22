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

    function ToolbarProjectOpen(environment) {
        this._environment = environment;
        this.setIcon('fa fa-fw fa-folder-o');
        this.setTitle('Nastavenia projektu');
        ToolbarButton.call(this);
    }

    ToolbarProjectOpen.prototype = Object.create(ToolbarButton.prototype);
    ToolbarProjectOpen.prototype.constructor = ToolbarProjectOpen;

    ToolbarProjectOpen.prototype.execute = function () {
        var self = this;

        var file = document.createElement("input");
        file.type = "file";
        file.click();

        file.addEventListener("change", function () {
            if (file.files.length > 0) {
                var reader = new FileReader();
                reader.onloadend = function () {
                    self._environment._project = ProjectIO.read(reader.result);
                    self._environment.changeMode('editor');
                    self._environment.showStatus("Súbor \"" + file.files[0].name + "\" bol úspešne načítaný");
                };
                reader.readAsText(file.files[0], "UTF-8");
            }
        });
    };

    return ToolbarProjectOpen;

});