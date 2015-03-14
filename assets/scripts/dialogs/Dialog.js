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
        this._icon = null;
        this._id = ++Dialog._lastId;
        this._title = 'Dialog';
        this._cancelIcon = 'fa fa-close fa-fw';
        this._cancelTitle = 'Zrušiť';
        this._confirmIcon = 'fa fa-check fa-fw';
        this._confirmTitle = 'Potvrdiť';
    }

    Dialog.prototype = Object.create(Dialog.prototype);
    Dialog.prototype.constructor = Dialog;

    Dialog._lastId = 0;

    Dialog.prototype._init = function () {
        var self = this;

        this._dialog = document.createElement("div");
        this._dialog.classList.add("modal");
        document.body.appendChild(this._dialog);

        var dialog = document.createElement("div");
        dialog.classList.add("modal-dialog");
        this._dialog.appendChild(dialog);

        var content = document.createElement("div");
        content.classList.add("modal-content");
        dialog.appendChild(content);

        var header = document.createElement("div");
        header.classList.add("modal-header");
        content.appendChild(header);
        this._initHeader(header);

        var body = document.createElement("div");
        body.classList.add("modal-body");
        content.appendChild(body);
        this._initBody(body);

        var footer = document.createElement("div");
        footer.classList.add("modal-footer");
        content.appendChild(footer);
        this._initFooter(footer);

        var $dialog = $(this._dialog);
        $dialog.bind('show.bs.modal', function () {
            self.onBeforeShow();
        });
        $dialog.bind('shown.bs.modal', function () {
            self.onAfterShow();
        });
        $dialog.bind('hide.bs.modal', function () {
            self.onBeforeHide();
        });
        $dialog.bind('hidden.bs.modal', function () {
            self.onAfterHide();
        });

    };

    Dialog.prototype._initBody = function (root) {
    };

    Dialog.prototype._initHeader = function (root) {
        var self = this;
        $(root).html('\
            <button class="close">\
                <i class="fa fa-close fa-fw"></i>\
            </button>\
            <h4 class="modal-title"></h4>\
        ');
        $(root).find('button.close').bind('click', function () {
            self.onCancel();
        });
        this._updateTitle();
    };

    Dialog.prototype._initFooter = function (root) {
        var self = this;
        $(root).html('\
            <button class="btn btn-default"></button>\
            <button class="btn btn-primary"></button>\
        ');
        $(root).find('.btn.btn-default').bind('click', function () {
            self.onCancel();
        });
        $(root).find('.btn.btn-primary').bind('click', function () {
            self.onConfirm();
        });
        this._updateCancel();
        this._updateConfirm();
    };

    Dialog.prototype.destroy = function () {
        if (this._dialog !== null) {
            $(this._dialog).remove();
            this._dialog = null;
        }
    };

    Dialog.prototype.hide = function () {
        if (this._dialog !== null) {
            $(this._dialog).modal('hide');
        }
    };

    Dialog.prototype.getIcon = function () {
        return this._icon;
    };

    Dialog.prototype.setIcon = function (icon) {
        this._icon = icon;
        this._updateTitle();
    };

    Dialog.prototype.setCancelIcon = function (icon) {
        this._cancelIcon = icon;
        this._updateCancel();
    };

    Dialog.prototype.setCancelTitle = function (title) {
        this._cancelTitle = title;
        this._updateCancel();
    };

    Dialog.prototype.setConfirmIcon = function (icon) {
        this._confirmIcon = icon;
        this._updateConfirm();
    };

    Dialog.prototype.setConfirmTitle = function (title) {
        this._confirmTitle = title;
        this._updateConfirm();
    };

    Dialog.prototype.getTitle = function () {
        return this._title;
    };

    Dialog.prototype.setTitle = function (title) {
        this._title = title;
        this._updateTitle();
    };

    Dialog.prototype._updateCancel = function () {
        if (this._dialog !== null) {
            var $btn = $(this._dialog).find(".modal-footer .btn.btn-default");
            $btn.text(this._cancelTitle);
            if (this._cancelIcon !== null && this._cancelIcon !== "") {
                $btn.prepend('<i class="' + this._cancelIcon + '"></i> ');
            }
        }
    };

    Dialog.prototype._updateConfirm = function () {
        if (this._dialog !== null) {
            var $btn = $(this._dialog).find(".modal-footer .btn.btn-primary");
            $btn.text(this._confirmTitle);
            if (this._confirmIcon !== null && this._confirmIcon !== "") {
                $btn.prepend('<i class="' + this._confirmIcon + '"></i> ');
            }
        }
    };

    Dialog.prototype._updateTitle = function () {
        if (this._dialog !== null) {
            var $title = $(this._dialog).find(".modal-title");
            $title.text(this._title);
            if (this._icon !== null && this._icon !== "") {
                $title.prepend('<i class="' + this._icon + '"></i> ');
            }
        }
    };

    Dialog.prototype.onAfterHide = function () {
    };

    Dialog.prototype.onAfterShow = function () {
    };

    Dialog.prototype.onBeforeHide = function () {
    };

    Dialog.prototype.onBeforeShow = function () {
    };

    Dialog.prototype.onCancel = function () {
        this.hide();
    };

    Dialog.prototype.onConfirm = function () {
        this.hide();
    };

    Dialog.prototype.show = function () {
        var self = this;

        if (this._dialog === null) {
            this._init();
        }

        $(this._dialog).modal({
            backdrop: 'static',
            keyboard: false,
            show: true
        });

    };

    return Dialog;

});