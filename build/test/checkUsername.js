"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mocha_1 = require("mocha");
var chai_1 = require("chai");
var UnregisteredUser_1 = require("../UnregisteredUser");
var unregisteredUser = new UnregisteredUser_1.UnregisteredUser();
mocha_1.describe('Test "CheckUsername"', function () {
    it('Return true for "Anna"', function () {
        var result = unregisteredUser.checkUsername('Anna');
        chai_1.expect(result).to.be.true;
    });
    it('Return false for "$Money"', function () {
        var result = unregisteredUser.checkUsername('$Money');
        chai_1.expect(result).to.be.false;
    });
    it('Return true for "Anna1234"', function () {
        var res = unregisteredUser.checkUsername('Anna1234');
        chai_1.expect(res).to.be.true;
    });
    it('Return true for "1234"', function () {
        var res = unregisteredUser.checkUsername('1234');
        chai_1.expect(res).to.be.true;
    });
});
