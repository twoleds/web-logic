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
    "project/Condition",
    "project/Connector",
    "project/Value",
    "project/Signal"
], function (Dialog, Condition, Connector, Value, Signal) {

    function ConnectorDialog(project, connector) {
        Dialog.call(this);
        this._project = project;
        this._connector = connector;
    }

    ConnectorDialog.prototype = Object.create(Dialog.prototype);
    ConnectorDialog.prototype.constructor = ConnectorDialog;

    ConnectorDialog.prototype._initBody = function (root) {
        var self = this;

        root.innerHTML = '\
            <div class="row">\
                <div class="col-xs-6">\
                    <div class="form-group">\
                        <label>Zdrojový stav</label>\
                        <input type="text" value="" id="dialog-' + this._id + '-source" class="form-control" readonly />\
                    </div>\
                </div>\
                <div class="col-xs-6">\
                    <div class="form-group">\
                        <label>Cielový stav</label>\
                        <input type="text" value="" id="dialog-' + this._id + '-target" class="form-control" readonly />\
                    </div>\
                </div>\
            </div>\
            <div class="panel panel-default">\
                <div class="panel-heading">\
                    <strong>Podmienky</strong>\
                </div>\
                <div class="panel-body">\
                    <div id="dialog-' + this._id + '-conds"></div>\
                    <button class="btn btn-success pull-right" id="dialog-' + this._id + '-cond-add">\
                        <span class="fa fa-fw fa-plus"></span>\
                        Pridať podmienku\
                    </button>\
                </div>\
            </div>\
        ';

        $('#dialog-' + this._id + '-cond-add').click(function () {
            self._newCondition();
        });

    };

    ConnectorDialog.prototype._newCondition = function (condition) {
        var condition = condition || null;

        var html = $('\
            <div>\
                <div class="panel panel-default">\
                    <div class="panel-heading">\
                        &nbsp;\
                        <button class="btn btn-danger btn-xs pull-right" name="condition-remove">\
                            <span class="fa fa-fw fa-close"></span>\
                        </button>\
                    </div>\
                    <div class="panel-body">\
                        <table class="table table-striped">\
                            <thead>\
                                <tr>\
                                    <th>Signál</th>\
                                    <th>Hodnota</th>\
                                </tr>\
                            </thead>\
                            <tbody></tbody>\
                        </table>\
                    </div>\
                </div>\
        ');
        html.appendTo('#dialog-' + this._id + '-conds');

        html.find('button[name="condition-remove"]').click(function () {
            html.remove();
        });

        var tbody = html.find('tbody').html('');
        var signalList = this._project.getSignalList();
        var input = (condition !== null) ? condition.getInput() : null;
        for (var i = 0, c = signalList.length(); i < c; i++) {
            var signal = signalList.get(i);
            var value = (input !== null) ? input.getByName(signal.getName()) : null;
            var signalValue = (value !== null) ? value.getValue() : "";
            if (signal.getDirection() == Signal.DIRECTION_INPUT) {
                $('\
                    <tr data-dir="input">\
                        <td><input name="name" class="form-control" type="text" readonly value="' + signal.getName() + '"/></td>\
                        <td><input name="value" class="form-control" type="text" value="' + signalValue + '"/></td>\
                    </tr>\
                ').appendTo(tbody);
            }
        }

        var output = (condition !== null) ? condition.getOutput() : null;
        if (this._project.getType() == 'mealy') {
            for (var i = 0, c = signalList.length(); i < c; i++) {
                var signal = signalList.get(i);
                var value = (output !== null) ? output.getByName(signal.getName()) : null;
                var signalValue = (value !== null) ? value.getValue() : "";
                if (signal.getDirection() == Signal.DIRECTION_OUTPUT) {
                    $('\
                        <tr class="danger" data-dir="output">\
                            <td><input name="name" class="form-control" type="text" readonly value="' + signal.getName() + '"/></td>\
                            <td><input name="value" class="form-control" type="text" value="' + signalValue + '"/></td>\
                        </tr>\
                    ').appendTo(tbody);
                }
            }
        }

    };

    ConnectorDialog.prototype.onBeforeShow = function () {
        $('#dialog-' + this._id + '-source').val(this._connector.getSource());
        $('#dialog-' + this._id + '-target').val(this._connector.getTarget());
        $('#dialog-' + this._id + '-conds').html('');
        for (var i = 0, c = this._connector.getConditionList().length(); i < c; i++) {
            this._newCondition(this._connector.getConditionList().get(i));
        }
    };

    ConnectorDialog.prototype.onConfirm = function () {
        var self = this;

        this._connector.getConditionList().clear();
        $('#dialog-' + this._id + '-conds table').each(function () {
            var condition = new Condition();
            $(this).find('tbody tr[data-dir="input"]').each(function () {
                var value = new Value();
                value.setName($(this).find('input[name="name"]').val());
                value.setValue($(this).find('input[name="value"]').val());
                condition.getInput().append(value);
            });
            if (self._project.getType() == 'mealy') {
                $(this).find('tbody tr[data-dir="output"]').each(function () {
                    var value = new Value();
                    value.setName($(this).find('input[name="name"]').val());
                    value.setValue($(this).find('input[name="value"]').val());
                    condition.getOutput().append(value);
                });
            }
            self._connector.getConditionList().append(condition);
        });

        Dialog.prototype.onConfirm.call(this);
    };

    return ConnectorDialog;

});