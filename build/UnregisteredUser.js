"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnregisteredUser = void 0;
var RegisteredUser_1 = require("./RegisteredUser");
var UnregisteredUser = /** @class */ (function () {
    function UnregisteredUser() {
        this.prompts = require('prompts');
        this.chalk = require('chalk');
        this.fs = require('fs');
    }
    UnregisteredUser.prototype.getUserData = function () {
        var _this = this;
        console.log(this.chalk.bgBlue('\n Türschwelle (Sign Up) \n'));
        (function () { return __awaiter(_this, void 0, void 0, function () {
            var signUp, registeredUser;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.prompts([
                            {
                                type: 'text',
                                name: 'username',
                                message: '"Unter welchen Namen kennt man deine Gestalt?"',
                                // todo: Username exist and is not valid different message
                                // note: no \n in error message or bug
                                validate: function (value) { return _this.checkUsername(value) ? true :
                                    "Oh verzeih mir, aber ich kann leider nur Alphanumerische Werte mit dieser Feder schreiben, bitte versuch es noch einmal (Korrigiere Eingabe so, dass nur a-z und Zahlen im Nutzernmane stehen, keine doppelten Usernames erlaubt)"; }
                            },
                            {
                                type: 'password',
                                name: 'password',
                                message: '"Schön dich kennenzulernen. Doch sei vorsichtig, Gestaltwandler treiben ihr unwesen. \n Lass uns ein Codewort vereinbaren, nur um sicher zu sein (Password eingeben)"'
                            }
                        ])];
                    case 1:
                        signUp = _a.sent();
                        registeredUser = new RegisteredUser_1.RegisteredUser(signUp.username, signUp.password, 0);
                        registeredUser.saveToJSON();
                        registeredUser.navigateMenu();
                        return [2 /*return*/];
                }
            });
        }); })();
    };
    UnregisteredUser.prototype.login = function () {
        var _this = this;
        console.log(this.chalk.bgBlue('\n Türschwelle (Login) \n'));
        // todo: Implementieren
        console.log(this.chalk.red('**Drücke crt+c um zum Menü zurückzukehren**'));
        (function () { return __awaiter(_this, void 0, void 0, function () {
            var userNameExist, login, registeredUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userNameExist = false;
                        return [4 /*yield*/, this.prompts([
                                {
                                    type: 'text',
                                    name: 'username',
                                    message: '"Und wie lautet dein Name noch einmal... (Username eingeben)"',
                                },
                                {
                                    type: 'password',
                                    name: 'password',
                                    message: '"Um sicher zu sein, kennst du noch unser geheimes Codewort... \n  (Password eingeben)"'
                                }
                            ])];
                    case 1:
                        login = _a.sent();
                        if (this.usernameAndPasswordCheck(login)) {
                            registeredUser = new RegisteredUser_1.RegisteredUser(login.username, login.password, 0);
                            registeredUser.navigateMenu();
                        }
                        else {
                            console.log(this.chalk.red('"Diese Kombination steht nicht in meinem Buch. Nun gut eine Chance gebe ich dir noch...(Username oder Password falsch)"'));
                            this.login();
                        }
                        return [2 /*return*/];
                }
            });
        }); })();
    };
    UnregisteredUser.prototype.checkUsername = function (_username) {
        var valid = false;
        // Alphanumeric check
        if (_username.match('^[a-zA-Z0-9]*$') != null) {
            valid = true;
        }
        else {
            return valid;
        }
        // check if Username already exists 
        var users = this.getJSONData();
        for (var i = 0; i < users.length; i++) {
            if (users[i].username === _username) {
                return false;
            }
        }
        return valid;
    };
    UnregisteredUser.prototype.usernameAndPasswordCheck = function (_userInput) {
        var users = this.getJSONData();
        for (var i = 0; i < users.length; i++) {
            if (users[i].username === _userInput.username && users[i].password == _userInput.password) {
                return true;
            }
        }
        return false;
    };
    UnregisteredUser.prototype.getJSONData = function () {
        var rawdata = this.fs.readFileSync('users.json');
        var users = JSON.parse(rawdata);
        return users;
    };
    return UnregisteredUser;
}());
exports.UnregisteredUser = UnregisteredUser;
