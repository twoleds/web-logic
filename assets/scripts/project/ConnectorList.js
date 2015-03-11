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
    "project/List",
    "project/Connector"
], function (List, Connector) {

    function ConnectorList() {
        List.call(this);
    }

    ConnectorList.prototype = Object.create(List.prototype);
    ConnectorList.prototype.constructor = ConnectorList;

    ConnectorList.prototype.append = function (connector) {
        if (connector instanceof Connector === false) {
            throw new Error("Invalid argument.");
        }
        List.prototype.append.call(this, connector);
    };

    ConnectorList.prototype.remove = function (connector) {
        if (connector instanceof Connector === false) {
            throw new Error("Invalid argument.");
        }
        List.prototype.remove.call(this, connector);
    };

    return ConnectorList;

});