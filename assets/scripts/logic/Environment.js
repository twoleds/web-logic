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
    "editor/Editor",
    "logic/Toolbar",
    "logic/ToolbarGroup",
    "logic/ToolbarModeEditor",
    "logic/ToolbarModeSimulator",
    "logic/ToolbarProjectConfig",
    "logic/ToolbarProjectNew",
    "logic/ToolbarProjectOpen",
    "logic/ToolbarProjectSave",
    "project/Project"
], function (Editor, Toolbar, ToolbarGroup, ToolbarModeEditor,
             ToolbarModeSimulator, ToolbarProjectConfig, ToolbarProjectNew,
             ToolbarProjectOpen, ToolbarProjectSave, Project) {

    function Environment(container) {

        this._container = container;
        this._session = null;
        this._mode = Environment.MODE_EDITOR;
        this._project = new Project();
        this._init();

        this.changeMode(Environment.MODE_WELCOME);
        this.showStatus('Vítaj v editore a simulátore konečných stavových automatov');
    }

    Environment.prototype = Object.create(Object.prototype);
    Environment.prototype.constructor = Environment;

    Environment.MODE_EDITOR = 'editor';
    Environment.MODE_SIMULATOR = 'simulator';
    Environment.MODE_WELCOME = 'welcome';

    Environment.prototype._init = function () {

        this._root = document.createElement("div");
        this._root.classList.add("logic-ide");
        this._container.appendChild(this._root);

        this._content = document.createElement("div");
        this._content.classList.add("logic-content");
        this._root.appendChild(this._content);

        this._toolbar = new Toolbar();
        this._root.appendChild(this._toolbar._root);

        this._toolbarProject = new ToolbarGroup();
        this._toolbarProjectNew = new ToolbarProjectNew(this);
        this._toolbarProject.appendButton(this._toolbarProjectNew);
        this._toolbarProjectOpen = new ToolbarProjectOpen(this);
        this._toolbarProject.appendButton(this._toolbarProjectOpen);
        this._toolbarProjectSave = new ToolbarProjectSave(this);
        this._toolbarProject.appendButton(this._toolbarProjectSave);
        this._toolbarProjectConfig = new ToolbarProjectConfig(this);
        this._toolbarProject.appendButton(this._toolbarProjectConfig);
        this._toolbar.appendGroup(this._toolbarProject);

        this._toolbarMode = new ToolbarGroup();
        this._toolbarModeEditor = new ToolbarModeEditor(this);
        this._toolbarMode.appendButton(this._toolbarModeEditor);
        this._toolbarModeSimulator = new ToolbarModeSimulator(this);
        this._toolbarMode.appendButton(this._toolbarModeSimulator);
        this._toolbar.appendGroup(this._toolbarMode);

        this._status = document.createElement("div");
        this._status.classList.add("logic-status");
        this._root.appendChild(this._status);

    };

    Environment.prototype.changeMode = function (mode) {

        this._content.innerHTML = '';
        if (this._session !== null) {
            if (typeof this._session.destroy == "function") {
                this._session.destroy();
            }
            this._session = null;
        }

        this._toolbarModeEditor.setActive(false);
        this._toolbarModeSimulator.setActive(false);

        switch (mode) {
            case Environment.MODE_EDITOR:
                this._session = new Editor(this, this._project);
                break;
            case Environment.MODE_SIMULATOR:
                this._session = new Simulator(this, this._project);
                break;
            case Environment.MODE_WELCOME:
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
                break;
        }
    };

    Environment.prototype.clearStatus = function () {
        this.showStatus("");
    };

    Environment.prototype.showStatus = function (status) {
        $(this._status).text(status);
    };

    Environment.prototype.getToolbar = function () {
        return this._toolbar;
    };

    return Environment;

});