"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ressource = void 0;
var Ressource = /** @class */ (function () {
    function Ressource() {
        this.prompts = require('prompts');
        this.chalk = require('chalk');
        this.fs = require('fs');
        this.fsBack = require('fs').promises;
    }
    return Ressource;
}());
exports.Ressource = Ressource;
