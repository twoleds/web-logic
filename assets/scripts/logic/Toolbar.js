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
    "dialogs/ProjectDialog",
    "project/ProjectIO"
], function (ProjectDialog, ProjectIO) {

    function Toolbar(ide) {
        this._ide = ide;
        this._init();
    }

    Toolbar.prototype = Object.create(Object.prototype);
    Toolbar.prototype.constructor = Toolbar;

    Toolbar.prototype._init = function () {
        var self = this;

        this._toolbar = document.createElement("div");
        this._toolbar.classList.add("logic-toolbar");

        var projectGroup = document.createElement("div");
        projectGroup.classList.add("btn-group");
        this._toolbar.appendChild(projectGroup);

        this._projectNew = document.createElement("button");
        this._projectNew.classList.add("btn");
        this._projectNew.classList.add("btn-default");
        this._projectNew.innerHTML = '<i class="fa fa-file-o fa-fw"></i>';
        this._projectNew.addEventListener('click', function () {
            self.onProjectNew();
        });
        this._projectNew.addEventListener('mouseover', function () {
            self._ide.showStatus("Vytvorí nový projekt");
        });
        projectGroup.appendChild(this._projectNew);

        this._projectOpen = document.createElement("button");
        this._projectOpen.classList.add("btn");
        this._projectOpen.classList.add("btn-default");
        this._projectOpen.innerHTML = '<i class="fa fa-folder-open-o fa-fw"></i>';
        this._projectOpen.addEventListener('click', function () {
            self.onProjectOpen();
        });
        this._projectOpen.addEventListener('mouseover', function () {
            self._ide.showStatus("Načíta projekt zo súboru");
        });
        projectGroup.appendChild(this._projectOpen);

        this._projectSave = document.createElement("button");
        this._projectSave.classList.add("btn");
        this._projectSave.classList.add("btn-default");
        this._projectSave.innerHTML = '<i class="fa fa-save fa-fw"></i>';
        this._projectSave.disabled = true;
        this._projectSave.addEventListener('click', function () {
            self.onProjectSave();
        });
        this._projectSave.addEventListener('mouseover', function () {
            self._ide.showStatus("Uloží projekt do súboru");
        });
        projectGroup.appendChild(this._projectSave);

        this._projectConfig = document.createElement("button");
        this._projectConfig.classList.add("btn");
        this._projectConfig.classList.add("btn-default");
        this._projectConfig.innerHTML = '<i class="fa fa-cogs fa-fw"></i>';
        this._projectConfig.disabled = true;
        this._projectConfig.addEventListener('click', function () {
            self.onProjectConfig();
        });
        this._projectConfig.addEventListener('mouseover', function () {
            self._ide.showStatus("Nastavenia aktuálneho projektu");
        });
        projectGroup.appendChild(this._projectConfig);

        this._toolbar.appendChild(document.createTextNode(" "));

        var modeGroup = document.createElement("div");
        modeGroup.classList.add("btn-group");
        this._toolbar.appendChild(modeGroup);

        this._modeEditor = document.createElement("button");
        this._modeEditor.classList.add("btn");
        this._modeEditor.classList.add("btn-default");
        this._modeEditor.innerHTML = '<i class="fa fa-edit fa-fw"></i>';
        this._modeEditor.disabled = true;
        this._modeEditor.addEventListener('click', function () {
            self.onModeEditor();
        });
        this._modeEditor.addEventListener('mouseover', function () {
            self._ide.showStatus("Prepne do módu editor");
        });
        modeGroup.appendChild(this._modeEditor);

        this._modeSimulator = document.createElement("button");
        this._modeSimulator.classList.add("btn");
        this._modeSimulator.classList.add("btn-default");
        this._modeSimulator.innerHTML = '<i class="fa fa-flask fa-fw"></i>';
        this._modeSimulator.disabled = true;
        this._modeSimulator.addEventListener('click', function () {
            self.onModeSimulator();
        });
        this._modeSimulator.addEventListener('mouseover', function () {
            self._ide.showStatus("Prepne do módu simulátor");
        });
        modeGroup.appendChild(this._modeSimulator);

        this._toolbar.appendChild(document.createTextNode(" "));

        this._editorGroup = document.createElement("div");
        this._editorGroup.classList.add("btn-group");
        this._editorGroup.classList.add("hidden");
        this._toolbar.appendChild(this._editorGroup);

        var editorState = document.createElement("button");
        editorState.classList.add("btn");
        editorState.classList.add("btn-default");
        editorState.innerHTML = '<i class="fa fa-circle-o fa-fw"></i>';
        editorState.addEventListener('mouseover', function () {
            self._ide.showStatus("Vytvorí nový stav");
        });
        this._editorGroup.appendChild(editorState);

        var editorConnector = document.createElement("button");
        editorConnector.classList.add("btn");
        editorConnector.classList.add("btn-default");
        editorConnector.innerHTML = '<i class="fa fa-long-arrow-right fa-fw"></i>';
        editorState.addEventListener('mouseover', function () {
            self._ide.showStatus("Vytvorí nový prechod");
        });
        this._editorGroup.appendChild(editorConnector);

    };

    Toolbar.prototype.onModeEditor = function () {
        this._ide.changeMode("editor");
    };

    Toolbar.prototype.onModeSimulator = function () {
        this._ide.changeMode("simulator")
    };

    Toolbar.prototype.onProjectNew = function () {
        var self = this;
        var dialog = new ProjectDialog();
        dialog.setTitle("Vytvoriť projekt");
        dialog.setConfirmTitle("Vytvoriť projekt");
        dialog.show(function () {
            self._ide._project = dialog.getProject();
            self._ide.changeMode('editor');
            self._ide.showStatus("Projekt bol úspešne vytvorený");
            self._projectSave.disabled = false;
            self._projectConfig.disabled = false;
            self._modeEditor.disabled = false;
            self._modeSimulator.disabled = false;
            dialog.destroy();
        });
    };

    Toolbar.prototype.onProjectOpen = function () {
        var self = this;

        var file = document.createElement("input");
        file.type = "file";
        file.click();

        file.addEventListener("change", function () {
            if (file.files.length > 0) {
                var reader = new FileReader();
                reader.onloadend = function () {
                    self._ide._project = ProjectIO.read(reader.result);
                    self._ide.changeMode('editor');
                    self._ide.showStatus("Súbor \"" + file.files[0].name + "\" bol úspešne načítaný");
                    self._projectSave.disabled = false;
                    self._projectConfig.disabled = false;
                    self._modeEditor.disabled = false;
                    self._modeSimulator.disabled = false;
                };
                reader.readAsText(file.files[0], "UTF-8");
            }
        });
    };

    Toolbar.prototype.onProjectSave = function () {
        var data = btoa(ProjectIO.write(this._ide._project));
        var link = document.createElement("a");
        link.download = this._ide._project.getName() + ".fsm";
        link.href = "data:text/json;base64," + data;
        link.target = "_blank";
        link.click();
    };

    Toolbar.prototype.onProjectConfig = function () {
        var dialog = new ProjectDialog(this._ide._project);
        dialog.setConfirmTitle("Uložiť zmeny");
        dialog.show(function () {
            dialog.destroy();
        });
    };

    return Toolbar;

});