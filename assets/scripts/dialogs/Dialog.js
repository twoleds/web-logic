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

define(function () {

    function Dialog() {
        this._dialog = null;
    }

    Dialog.prototype = Object.create(Dialog.prototype);
    Dialog.prototype.constructor = Dialog;

    Dialog.prototype._init = function (root) {
    };

    Dialog.prototype.hide = function () {
        this._dialog.modal('hide');
    };

    Dialog.prototype.onAfterHide = function () {
    };

    Dialog.prototype.onAfterShow = function () {
    };

    Dialog.prototype.onBeforeHide = function () {
    };

    Dialog.prototype.onBeforeShow = function () {
    };

    Dialog.prototype.show = function () {
        var self = this;

        var container = document.createElement("div");
        container.classList.add("modal");
        document.body.appendChild(container);

        var dialog = document.createElement("div");
        dialog.classList.add("modal-dialog");
        container.appendChild(dialog);

        this._init(dialog);

        this._dialog = jQuery(container);
        this._dialog .bind('show.bs.modal', function () {
            self.onBeforeShow();
        });
        this._dialog .bind('shown.bs.modal', function () {
            self.onAfterShow();
        });
        this._dialog .bind('hide.bs.modal', function () {
            self.onBeforeHide();
        });
        this._dialog .bind('hidden.bs.modal', function () {
            self.onAfterHide();
        });
        this._dialog .modal({
            backdrop: 'static',
            keyboard: true,
            show: true
        });

    };

    return Dialog;

});