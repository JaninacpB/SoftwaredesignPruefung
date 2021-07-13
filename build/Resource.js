"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Resource = void 0;
var Resource = /** @class */ (function () {
    function Resource() {
        this.prompts = require('prompts');
        this.chalk = require('chalk');
        this.fs = require('fs');
        this.fsBack = require('fs').promises;
    }
    return Resource;
}());
exports.Resource = Resource;
