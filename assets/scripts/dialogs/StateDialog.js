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
    "project/MealyState",
    "project/MooreState",
    "project/Signal",
    "project/Value"
], function (Dialog, MealyState, MooreState, Signal, Value) {

    function StateDialog(project, state) {
        Dialog.call(this);
        this._project = project;
        this._state = state;
    }

    StateDialog.prototype = Object.create(Dialog.prototype);
    StateDialog.prototype.constructor = StateDialog;

    StateDialog.prototype._initBody = function (root) {
        var self = this;

        root.innerHTML = '\
            <div class="form-group">\
                <label>Názov stavu</label>\
                <input type="text" value="" id="dialog-' + this._id + '-name" class="form-control" />\
            </div>\
            <div class="panel panel-default" id="dialog-' + this._id + '-output">\
                <div class="panel-heading">\
                    <strong>Výstup</strong>\
                </div>\
                <div class="panel-body">\
                    <table class="table table-striped">\
                        <thead>\
                            <tr>\
                                <th>Názov</th>\
                                <th>Hodnota</th>\
                            </tr>\
                        </thead>\
                        <tbody></tbody>\
                    </table>\
                </div>\
            </div>\
        ';


    };

    StateDialog.prototype.onBeforeShow = function () {

        var output = $('#dialog-' + this._id + '-output');
        var signalList = this._project.getSignalList();

        $('#dialog-' + this._id + '-name').val(this._state.getName());

        if (this._state instanceof MealyState) {
            output.find('tbody').html('');
        }

        if (this._state instanceof MooreState) {
            var tbody = output.find('tbody').html('');
            for (var i = 0, c = signalList.length(); i < c; i++) {
                var signal = signalList.get(i);
                var stateSignal = this._state.getValueList().getByName(signal.getName());
                if (signal.getDirection() == Signal.DIRECTION_OUTPUT) {
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
        }

    };

    StateDialog.prototype.onConfirm = function () {
        var self = this;
        this._state.setName($('#dialog-' + this._id + '-name').val());
        $('#dialog-' + this._id + '-output tbody tr').each(function () {
            var name = $(this).find('input[name="name"]').val();
            var value = $(this).find('input[name="value"]').val();
            var signal = self._state.getValueList().getByName(name);
            if (signal == null) {
                signal = new Value();
                self._state.getValueList().append(signal);
            }
            signal.setName(name);
            signal.setValue(value);
        });
        Dialog.prototype.onConfirm.call(this);
    };

    return StateDialog;

});