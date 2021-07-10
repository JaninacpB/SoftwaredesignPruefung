"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Adventure = void 0;
var Adventure = /** @class */ (function () {
    function Adventure(_title, _author, _startpoint, _amountPlayers, _amountTurns, _field) {
        //todo: generate Id
        this.adventureId = this.createID();
        this.title = _title;
        this.author = _author;
        this.startpoint = _startpoint;
        this.amountPlayers = _amountPlayers;
        this.amountTurns = _amountTurns;
        this.field = _field;
    }
    // todo:
    Adventure.prototype.createID = function () {
        return 1;
    };
    return Adventure;
}());
exports.Adventure = Adventure;
