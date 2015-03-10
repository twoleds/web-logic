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

define(["dialogs/Dialog", "machine/Signal", "machine/SignalList"], function (Dialog, Signal, SignalList) {

    function SignalDialog(signalList) {
        Dialog.call(this);
        this._signalList = signalList || new SignalList();
    }

    SignalDialog.prototype = Object.create(Dialog.prototype);
    SignalDialog.prototype.constructor = SignalDialog;

    SignalDialog.prototype.getSignalList = function () {
        return this._signalList;
    };

    SignalDialog.prototype._init = function (root) {

        var dialogContent = document.createElement("div");
        dialogContent.classList.add("modal-content");
        root.appendChild(dialogContent);

        var dialogHeader = document.createElement("div");
        dialogHeader.classList.add("modal-header");
        dialogContent.appendChild(dialogHeader);

        var dialogClose = document.createElement("button");
        dialogClose.type = "button";
        dialogClose.classList.add("close");
        dialogClose.dataset.dismiss = "modal";
        dialogClose.innerHTML = '<i class="fa fa-close fa-fw"></i>';
        dialogHeader.appendChild(dialogClose);

        var dialogTitle = document.createElement("h4");
        dialogTitle.classList.add("modal-title");
        dialogTitle.innerHTML = 'Editor signálov';
        dialogHeader.appendChild(dialogTitle);

        var dialogBody = document.createElement("div");
        dialogBody.classList.add("modal-body");
        dialogContent.appendChild(dialogBody);

        this._initSignalList(dialogBody);

        var buttonAdd = document.createElement("button");
        buttonAdd.classList.add("btn");
        buttonAdd.classList.add("btn-success");
        buttonAdd.innerHTML = '<i class="fa fa-plus fa-fw"></i> Pridať signal'
        dialogBody.appendChild(buttonAdd);

        var dialogFooter = document.createElement("div");
        dialogFooter.classList.add("modal-footer");
        dialogContent.appendChild(dialogFooter);

        var buttonCancel = document.createElement("button");
        buttonCancel.classList.add("btn");
        buttonCancel.classList.add("btn-default");
        buttonCancel.dataset.dismiss = "modal";
        buttonCancel.innerHTML = '<i class="fa fa-close fa-fw"></i> Zrušiť';
        dialogFooter.appendChild(buttonCancel);

        var buttonConfirm = document.createElement("button");
        buttonConfirm.classList.add("btn");
        buttonConfirm.classList.add("btn-primary");
        buttonConfirm.innerHTML = '<i class="fa fa-check fa-fw"></i> Aplikovať zmeny';
        dialogFooter.appendChild(buttonConfirm);

    };

    SignalDialog.prototype._initSignalList = function (root) {

        var table = document.createElement("table");
        table.classList.add("table");
        table.classList.add("table-hovered");
        table.classList.add("table-striped");
        root.appendChild(table);

        var head = document.createElement("thead");
        head.innerHTML = '<tr><th>Názov</th><th>Smer</th><th>Hodnota</th><th></th></tr>';
        table.appendChild(head);

        var body = document.createElement("tbody");
        table.appendChild(body);

        for (var i = 0, c = this._signalList.length(); i < c; i++) {
            var signal = this._signalList.get(i);

            var row = document.createElement("tr");
            body.appendChild(row);

            var cellName = document.createElement("td");
            cellName.style.width = "30%";
            cellName.innerHTML = '<input type="text" class="form-control" value="' + signal.getName() + '"/>';
            row.appendChild(cellName);

            var cellDirection = document.createElement("td");
            cellDirection.style.width = "30%";
            cellDirection.innerHTML = '<select class="form-control"><option>IN</option><option>OUT</option></select>';
            row.appendChild(cellDirection);

            var cellValue = document.createElement("td");
            cellValue.style.width = "30%";
            cellValue.innerHTML = '<input class="form-control" type="text" value="' + signal.getValue() + '"/>';
            row.appendChild(cellValue);

            var cellRemove = document.createElement("td");
            cellRemove.innerHTML = '<button type="button" class="btn btn-danger"><i class="fa fa-close fa-fw"></i></button>';
            row.appendChild(cellRemove);

        }

    };

    return SignalDialog;

});