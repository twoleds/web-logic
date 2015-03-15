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
    "engine/Engine",
    "logic/Toolbar",
    "project/Project"
], function (Engine, Toolbar, Project) {

    function LogicIDE(container) {
        this._container = container;
        this._engine = null;
        this._engineCtx = null;
        this._mode = LogicIDE.MODE_EDITOR;
        this._project = new Project();
        this._init();
        this._changeModeToWelcome();
        this.showStatus('Vítaj v editore a simulátore konečných stavových automatov');
    }

    LogicIDE.prototype = Object.create(Object.prototype);
    LogicIDE.prototype.constructor = LogicIDE;

    LogicIDE.MODE_EDITOR = 'editor';
    LogicIDE.MODE_SIMULATOR = 'simulator';
    LogicIDE.MODE_WELCOME = 'welcome';

    LogicIDE.prototype._init = function () {

        this._root = document.createElement("div");
        this._root.classList.add("logic-ide");
        this._container.appendChild(this._root);

        this._content = document.createElement("div");
        this._content.classList.add("logic-content");
        this._root.appendChild(this._content);

        this._toolbar = new Toolbar(this);
        this._root.appendChild(this._toolbar._toolbar);

        this._status = document.createElement("div");
        this._status.classList.add("logic-status");
        this._root.appendChild(this._status);

    };

    LogicIDE.prototype.changeMode = function (mode) {

        this._toolbar._editorGroup.classList.add("hidden");
        this._toolbar._modeEditor.classList.remove("active");
        this._toolbar._modeSimulator.classList.remove("active");

        switch (mode) {
            case LogicIDE.MODE_EDITOR:
                this._changeModeToEditor();
                break;
            case LogicIDE.MODE_SIMULATOR:
                this._changeModeToSimulator();
                break;
            case LogicIDE.MODE_WELCOME:
                this._changeModeToWelcome();
                break;
        }
    };

    LogicIDE.prototype._changeModeToEditor = function () {
        this._content.innerHTML = '';
        var canvas = document.createElement("canvas");
        this._content.appendChild(canvas);
        this._toolbar._modeEditor.classList.add("active");
        this._toolbar._editorGroup.classList.remove("hidden");
    };

    LogicIDE.prototype._changeModeToSimulator = function () {
        this._toolbar._modeSimulator.classList.add("active");
    };

    LogicIDE.prototype._changeModeToWelcome = function () {
        this._content.innerHTML = '\
            <table style="border: 0; width: 100%; height: 100%;">\
                <tr>\
                    <td style="text-align: center; vertical-align: middle;">\
                        <div style="display: inline-block; width: 250px; height: 100px;">\
                            <i class="fa fa-file-o fa-fw"></i> VYTVOR NOVÝ PROJEKT<br/>\
                            alebo<br/>\
                            <i class="fa fa-folder-open-o fa-fw"></i> NAČÍTAJ PROJEKT ZO SÚBORU \
                        </div>\
                    </td>\
                </tr>\
            </table>\
        ';
    };

    LogicIDE.prototype.clearStatus = function () {
        this.showStatus("");
    };

    LogicIDE.prototype.showStatus = function (status) {
        $(this._status).text(status);
    };

    return LogicIDE;

});