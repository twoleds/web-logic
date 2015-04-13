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
    "simulator/Task"
], function (Task) {

    function CarPark(simulator) {
        Task.call(this, simulator);

        var self = this;

        this._imgBackground = new Image();
        this._imgBackground.src = "/assets/images/carpark/bg-simple.png";
        this._imgBackground.onload = function () {
            self.update();
        };

        this._imgCar = new Image();
        this._imgCar.src = "/assets/images/carpark/car.png";
        this._imgCar.onload = function () {
            self.update();
        };

        this._currentX = 0;
        this._currentY = 0;
        this._currentSlot = null;
        this._currentState = 'none';
        this._slots = [false, false, false];

    }

    CarPark.prototype = Object.create(Task.prototype);
    CarPark.prototype.constructor = CarPark;

    CarPark.prototype.paint = function (ctx) {

        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        ctx.drawImage(this._imgBackground, 0, 0, 300, 100);

        // paint semaphore colors
        var output = this.getOutput();
        if (output.length() >= 1) {
            var isCarParkFree = output.get(0).getValue() == 0;

            ctx.beginPath();
            ctx.moveTo(87.5, 8);
            ctx.arcTo(93, 8, 93, 13.5, 5.5);
            ctx.arcTo(93, 19, 87.5, 19, 5.5);
            ctx.arcTo(82, 19, 82, 13.5, 5.5);
            ctx.arcTo(82, 8, 87.5, 8, 5.5);
            ctx.closePath();

            ctx.fillStyle = isCarParkFree ? "#330000" : "#cc0000";
            ctx.fill();

            ctx.beginPath();
            ctx.moveTo(87.5, 22);
            ctx.arcTo(93, 22, 93, 27.5, 5.5);
            ctx.arcTo(93, 33, 87.5, 33, 5.5);
            ctx.arcTo(82, 33, 82, 27.5, 5.5);
            ctx.arcTo(82, 22, 87.5, 22, 5.5);
            ctx.closePath();

            ctx.fillStyle = isCarParkFree ? "#00cc00" : "#003300";
            ctx.fill();
        }

        // paint sensors
        var input = this.getInput();
        if (input.length() >= 2) {
            var isSensorOneDown = input.get(0).getValue() == 0;
            var isSensorTwoDown = input.get(1).getValue() == 0;
            ctx.fillStyle = isSensorOneDown ? "#333333" : "#33cc33";
            ctx.fillRect(21, 48, 5, 5);
            ctx.fillStyle = isSensorTwoDown ? "#333333" : "#33cc33";
            ctx.fillRect(45, 48, 5, 5);
        }

        // paint cars in slots
        for (var i = 0; i < this._slots.length; i++) {
            if (this._slots[i]) {
                ctx.drawImage(this._imgCar, 37, 0, 25, 37, 114 + (i * 37), 16, 25, 37);
            }
        }

        // paint car on road
        if (this._currentState == 'entering') {
            ctx.drawImage(this._imgCar, 0, 0, 37, 25, this._currentX, this._currentY, 37, 25);
        } else if (this._currentState == 'leaving') {
            ctx.drawImage(this._imgCar, 0, 25, 37, 25, this._currentX, this._currentY, 37, 25);
        }

    };

    CarPark.prototype.step = function () {
        switch (this._currentState) {
            case 'none':
                this._stepNone();
                break;
            case 'entering':
                this._stepEntering();
                this._stepSensor();
                break;
            case 'leaving':
                this._stepLeaving();
                this._stepSensor();
                break;
        }
        this.update();
    };

    CarPark.prototype._stepEntering = function () {
        if (this._currentX < (100 + (this._currentSlot * 37))) {
            this._currentX += 10;
        } else {
            this._slots[this._currentSlot] = true;
            this._currentState = 'none';
        }
        this.update();
    };

    CarPark.prototype._stepLeaving = function () {
        if (this._currentX > -40) {
            this._currentX -= 10;
        } else {
            this._currentState = 'none';
        }
        this.update();
    };

    CarPark.prototype._stepNone = function () {
        if (Math.random() < 0.5) {
            var slot = -1;
            for (var i = 0; i < this._slots.length; i++) {
                if (this._slots[i] == false) {
                    slot = i;
                    break;
                }
            }
            if (slot >= 0) {
                this._currentSlot = slot;
                this._currentState = 'entering';
                this._currentX = -40;
                this._currentY = 62;
                this.update();
            }
        } else {
            var slot = Math.floor(Math.random() * this._slots.length);
            if (this._slots[slot]) {
                this._currentSlot = slot;
                this._currentState = 'leaving';
                this._currentX = 100 + (slot * 37);
                this._currentY = 62;
                this._slots[slot] = false;
                this.update();
            }
        }
    };

    CarPark.prototype._stepSensor = function () {
        if (this._currentState !== 'entering' && this._currentState !== 'leaving') {
            this.getInput().get(0).setValue("0");
            this.getInput().get(1).setValue("0");
        } else {
            if (this._currentX >= -18 && this._currentX <= 27) {
                this.getInput().get(0).setValue("1");
            } else {
                this.getInput().get(0).setValue("0");
            }
            if (this._currentX >= 7 && this._currentX <= 51) {
                this.getInput().get(1).setValue("1");
            } else {
                this.getInput().get(1).setValue("0");
            }
        }

    };

    return CarPark;

});
