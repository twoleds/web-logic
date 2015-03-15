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
    "dialogs/Dialog",
    "project/Project",
    "project/Signal"
], function (Dialog, Project, Signal) {

    function ProjectDialog(project) {
        Dialog.call(this);

        this.setIcon("fa fa-cogs fa-fw");
        this.setTitle("Nastavenia projektu");

        this._project = project || new Project();
    }

    ProjectDialog.prototype = Object.create(Dialog.prototype);
    ProjectDialog.prototype.constructor = ProjectDialog;

    ProjectDialog.prototype._initBody = function (root) {
        var self = this;

        root.innerHTML = '\
            <div class="row">\
                <div class="col-xs-8">\
                    <div class="form-group">\
                        <label>Názov projektu</label>\
                        <input id="dialog-' + this._id + '-project-name" class="form-control" type="text" value="" />\
                    </div>\
                </div>\
                <div class="col-xs-4">\
                    <div class="form-group">\
                        <label>Typ automatu</label>\
                        <select id="dialog-' + this._id + '-project-type" class="form-control show-tick">\
                            <option value="' + Project.TYPE_MEALY + '">\
                                Mealyho automat\
                            </option>\
                            <option value="' + Project.TYPE_MOORE + '" selected>\
                                Moorov automat\
                            </option>\
                        </select>\
                    </div>\
                </div>\
            </div>\
            <div class="panel panel-default">\
                <div class="panel-heading">\
                    <strong>Zoznam signálov</strong>\
                </div>\
                <div class="panel-body">\
                    <table class="table table-hover table-striped" id="dialog-' + this._id + '-signal-table">\
                        <thead>\
                            <tr>\
                                <th style="width: 50%;">Názov</th>\
                                <th style="width: 50%;">Typ</th>\
                                <th></th>\
                            </tr>\
                        </thead>\
                        <tbody></tbody>\
                    </table>\
                    <button class="btn btn-success pull-right" id="dialog-' + this._id + '-signal-new">\
                        <i class="fa fa-plus fa-fw"></i> <strong>Pridať signál</strong>\
                    </button>\
                </div>\
            </div>\
        ';

        $(root).find('select').selectpicker();

        $(root).find('#dialog-' + this._id + '-signal-new').click(function () {
            self._newSignal();
        });

    };

    ProjectDialog.prototype._clearSignals = function () {
        $('#dialog-' + this._id + '-signal-table tbody').html('');
    };

    ProjectDialog.prototype._newSignal = function (name, direction) {

        var name = name || '';
        var direction = direction || Signal.DIRECTION_INPUT;

        var html = $('\
            <tr>\
                <td>\
                    <input type="text" class="form-control" value="' + name + '" />\
                </td>\
                <td>\
                    <select class="form-control">\
                        <option data-content="<i class=\'fa fa-arrow-right text-success\'></i> Vstupný signál" value="' + Signal.DIRECTION_INPUT + '" ' + (direction == Signal.DIRECTION_INPUT ? 'selected' : '') + '>Vstupný signál</option>\
                        <option data-content="<i class=\'fa fa-arrow-left text-danger\'></i> Výstupný signál" value="' + Signal.DIRECTION_OUTPUT + '" ' + (direction == Signal.DIRECTION_OUTPUT ? 'selected' : '') + '>Výstupný signál</option>\
                    </select>\
                </td>\
                <td>\
                    <button class="btn btn-danger">\
                        <i class="fa fa-remove fa-fw"></i>\
                    </button>\
                </td>\
            </tr>\
        ');

        html.find('select').selectpicker();
        html.find('button.btn-danger').click(function () {
            html.remove();
        });

        $('#dialog-' + this._id + '-signal-table tbody').append(html);

    };

    ProjectDialog.prototype.getProject = function () {
        return this._project;
    };

    ProjectDialog.prototype.setProject = function (project) {
        if (project instanceof Project === false) {
            throw new Error("Invalid type of project.");
        }
        this._project = project;
    };

    ProjectDialog.prototype.onBeforeShow = function () {

        $('#dialog-' + this._id + '-project-name').val(this._project.getName());

        var $type = $('#dialog-' + this._id + '-project-type');
        $type.val(this._project.getType());
        $type.prop(
            'disabled',
            this._project.getType() !== Project.TYPE_UNKNOWN
        );
        $type.selectpicker('refresh');

        this._clearSignals();
        var signalList = this._project.getSignalList();
        for (var i = 0, c = signalList.length(); i < c; i++) {
            var signal = signalList.get(i);
            this._newSignal(signal.getName(), signal.getDirection());
        }

    };

    ProjectDialog.prototype.onConfirm = function () {
        var project = this._project;

        project.setName($('#dialog-' + this._id + '-project-name').val());
        project.setType($('#dialog-' + this._id + '-project-type').val());

        project.getSignalList().clear();
        var signals = $('#dialog-' + this._id + '-signal-table tbody tr');
        signals.each(function () {
            var name = $(this).find('input[type=text]').val();
            var type = $(this).find('select').val();
            if (name !== "" && type === Signal.DIRECTION_INPUT) {
                var signal = new Signal();
                signal.setName(name);
                signal.setDirection(type);
                project.getSignalList().append(signal);
            }
        });
        signals.each(function () {
            var name = $(this).find('input[type=text]').val();
            var type = $(this).find('select').val();
            if (name !== "" && type === Signal.DIRECTION_OUTPUT) {
                var signal = new Signal();
                signal.setName(name);
                signal.setDirection(type);
                project.getSignalList().append(signal);
            }
        });

        Dialog.prototype.onConfirm.call(this);
    };

    return ProjectDialog;

});