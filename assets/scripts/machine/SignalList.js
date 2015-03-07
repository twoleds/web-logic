// An editor and simulator for final state machine.
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

define(["machine/Signal"], function (Signal) {

    function SignalList() {
        this._signals = [];
    }

    SignalList.prototype = Object.create(Object.prototype);
    SignalList.prototype.constructor = SignalList;

    SignalList.prototype.append = function (signal) {
        if (signal instanceof Signal === false) {
            throw new Error("Invalid argument.");
        }
        this._signals.push(signal);
    };

    SignalList.prototype.clear = function () {
        this._signals = [];
    };

    SignalList.prototype.get = function (index) {
        var signal = null;
        if (typeof index === "number") {
            if (index >= 0 && index < this._signals.length) {
                signal = this._signals[index];
            }
        }
        return signal;
    };

    SignalList.prototype.getByName = function (name) {
        var signal = null;
        for (var i = 0; i < this._signals.length; i++) {
            if (this._signals[i].getName() == name) {
                signal = this._signals[i];
                break;
            }
        }
        return signal;
    };

    SignalList.prototype.length = function () {
        return this._signals.length;
    };

    SignalList.prototype.remove = function (signal) {
        if (signal instanceof Signal === false) {
            throw new Error("Invalid argument.");
        }
        var index = this._signals.indexOf(signal);
        if (index >= 0) {
            this._signals.splice(index, 1);
        }
    };

    return SignalList;

});