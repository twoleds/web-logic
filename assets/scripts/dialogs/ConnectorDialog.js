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
    "project/Connector",
    "project/Value",
    "project/Signal",
    "project/ValueList"
], function (Dialog, Connector, Value, Signal, ValueList) {

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

        var html = $('\
            <div>\
                <div class="panel panel-default">\
                    <div class="panel-heading">\
                        &nbsp;\
                        <button class="btn btn-danger btn-xs pull-right">\
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

        var tbody = html.find('tbody').html('');
        console.log(tbody);

        var signalList = this._project.getSignalList();
        for (var i = 0, c = signalList.length(); i < c; i++) {
            var signal = signalList.get(i);
            if (signal.getDirection() == Signal.DIRECTION_INPUT) {
                $('\
                    <tr>\
                        <td><input class="form-control" type="text" readonly value="' + signal.getName() + '"/></td>\
                        <td><input class="form-control" type="text" value=""/></td>\
                    </tr>\
                ').appendTo(tbody);
            }
        }

        if (this._project.getType() == 'mealy') {
            for (var i = 0, c = signalList.length(); i < c; i++) {
                var signal = signalList.get(i);
                if (signal.getDirection() == Signal.DIRECTION_OUTPUT) {
                    $('\
                        <tr class="danger">\
                            <td><input class="form-control" type="text" readonly value="' + signal.getName() + '"/></td>\
                            <td><input class="form-control" type="text" value=""/></td>\
                        </tr>\
                    ').appendTo(tbody);
                }
            }
        }

    };

    ConnectorDialog.prototype.onBeforeShow = function () {

        $('#dialog-' + this._id + '-source').val(this._connector.getSource());
        $('#dialog-' + this._id + '-target').val(this._connector.getTarget());

        var signalList = this._project.getSignalList();
        var output = $('#dialog-' + this._id + '-conds');
        var tbody = output.find('tbody').html('');
        var valueList = this._connector.getConditionList().length() > 0 ? this._connector.getConditionList().get(0) : null;
        for (var i = 0, c = signalList.length(); i < c; i++) {
            var signal = signalList.get(i);
            var stateSignal = (valueList !== null) ? valueList.getByName(signal.getName()) : null;
            if (signal.getDirection() == Signal.DIRECTION_INPUT) {
                $('\
                    <tr>\
                        <td>\
                            <input type="text" name="name" value="' + signal.getName() + '" class="form-control" readonly>\
                        </td>\
                        <td>\
                            <input type="text" name="value" value="' + (stateSignal !== null ? stateSignal.getValue() : '') + '" class="form-control">\
                        </td>\
                    </tr>\
                ').appendTo(tbody);
            }
        }

    };

    ConnectorDialog.prototype.onConfirm = function () {
        var self = this;
        var signalList = new ValueList();
        $('#dialog-' + this._id + '-conds tbody tr').each(function () {
            var name = $(this).find('input[name="name"]').val();
            var value = $(this).find('input[name="value"]').val();
            var signal = new Value();
            signal.setName(name);
            signal.setValue(value);
            signalList.append(signal);
        });
        this._connector.getConditionList().clear();
        this._connector.getConditionList().append(signalList);
        Dialog.prototype.onConfirm.call(this);
    };

    return ConnectorDialog;

});