"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnregisteredUser = void 0;
var RegisteredUser_1 = require("./RegisteredUser");
var User_1 = require("./User");
var uuid_1 = require("uuid");
var chalk_1 = __importDefault(require("chalk"));
var prompts_1 = __importDefault(require("prompts"));
var fs_1 = __importDefault(require("fs"));
var UnregisteredUser = /** @class */ (function (_super) {
    __extends(UnregisteredUser, _super);
    function UnregisteredUser() {
        return _super.call(this) || this;
    }
    UnregisteredUser.prototype.menu = function () {
        return __awaiter(this, void 0, void 0, function () {
            var startScreen;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, prompts_1.default([
                            {
                                type: 'select',
                                name: 'value',
                                message: '"Wie kann ich dir weiterhelfen?"',
                                choices: [
                                    { title: '"Unsere Wege trafen sich bereits... ' + chalk_1.default.grey('(Log In)"'), value: 0 },
                                    { title: '"Lass mich kurz vorstellen... ' + chalk_1.default.grey('(Sign Up)"'), value: 1 },
                                    { title: '"Diese B??cher, die du bei dir tr??gst, welche Geschichten enthalten sie... ' + chalk_1.default.grey('(??bersicht von Abenteuern anzeigen)"'), value: 2 },
                                    { title: '"Ich bin auf der Suche nach einer ganz bestimmten Geschichte... ' + chalk_1.default.grey('(Nach Abenteuer suchen)"'), value: 3 },
                                    { title: chalk_1.default.red('"Es wird Zeit, dass unsere Wege sich wieder trenne... (Programm beenden)"'), value: 4 }
                                ],
                                initial: 0
                            }
                        ])];
                    case 1:
                        startScreen = _a.sent();
                        switch (startScreen.value) {
                            case 0:
                                this.login();
                                break;
                            case 1:
                                this.signUp();
                                break;
                            case 2:
                                this.showFiveAdventures('');
                                break;
                            case 3:
                                this.searchAdventure('');
                                break;
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    UnregisteredUser.prototype.signUp = function () {
        return __awaiter(this, void 0, void 0, function () {
            var signUp, registeredUser;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log(chalk_1.default.bgBlue('\nT??rschwelle (Sign Up)\n'));
                        return [4 /*yield*/, prompts_1.default([
                                {
                                    type: 'text',
                                    name: 'username',
                                    message: '"Unter welchen Namen kennt man deine Gestalt? ' + chalk_1.default.grey('(keine Doppeltenusernames erlaubt, nur Alphanumerische Werte)"'),
                                    // note: no \n in error message or bug
                                    validate: function (value) { return _this.checkUsername(value) ? true : '"Verzeihung, aber ich kann nur Alphanumerische Werte schreiben, bitte versuch es noch einmal ' + chalk_1.default.grey('(Korrigiere Eingabe so, dass nur a-z und Zahlen im Nutzernmane stehen, keine doppelten Usernames erlaubt)"'); }
                                },
                                {
                                    type: 'password',
                                    name: 'password',
                                    message: '"Sch??n dich kennenzulernen. Doch sei vorsichtig, Gestaltwandler treiben ihr unwesen. \n Lass uns ein Codewort vereinbaren, nur um sicher zu sein ' + chalk_1.default.grey('(Password eingeben)"')
                                }
                            ])];
                    case 1:
                        signUp = _a.sent();
                        // check if esc was pressed
                        if (signUp.username === undefined || signUp.password === undefined) {
                            this.menu();
                        }
                        else {
                            registeredUser = RegisteredUser_1.RegisteredUser.getInstance(signUp.username, signUp.password, this.generateId());
                            registeredUser.saveUserToJSON();
                            registeredUser.menu();
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    UnregisteredUser.prototype.login = function () {
        return __awaiter(this, void 0, void 0, function () {
            var loginData, user, registeredUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log(chalk_1.default.bgBlue('\nT??rschwelle (Login)\n'));
                        console.log(chalk_1.default.red('+++ Dr??ck ecs um zur??ck zum Men?? zukommen +++'));
                        return [4 /*yield*/, prompts_1.default([
                                {
                                    type: 'text',
                                    name: 'username',
                                    message: '"Und wie lautet dein Name noch einmal... ' + chalk_1.default.grey('(Username eingeben)"'),
                                    validate: function (value) { return value === '' ? 'Gib einen Namen an!' : true; }
                                },
                                {
                                    type: 'password',
                                    name: 'password',
                                    message: '"Um sicher zu sein, kennst du noch unser geheimes Codewort... \n' + chalk_1.default.grey('(Password eingeben)"'),
                                    validate: function (value) { return value === '' ? 'Gib ein Passwort an!' : true; }
                                }
                            ])];
                    case 1:
                        loginData = _a.sent();
                        user = this.getUserIfExist(loginData);
                        // return to Menu then esc press
                        if (loginData.username === undefined || loginData.password === undefined) {
                            this.menu();
                        }
                        else {
                            if (user !== null) {
                                registeredUser = RegisteredUser_1.RegisteredUser.getInstance(user.username, user.password, user.id);
                                registeredUser.menu();
                            }
                            else {
                                console.log(chalk_1.default.red('"Diese Kombination steht nicht in meinem Buch. Nun gut eine Chance gebe ich dir noch... ') + chalk_1.default.grey('(Username oder Password falsch)"'));
                                this.login();
                            }
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    // for unittest public 
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
    // return null if not exist, return user if exist 
    UnregisteredUser.prototype.getUserIfExist = function (_userInput) {
        var users = this.getJSONData();
        for (var i = 0; i < users.length; i++) {
            if (users[i].username === _userInput.username && users[i].password == _userInput.password) {
                return users[i];
            }
        }
        return null;
    };
    UnregisteredUser.prototype.getJSONData = function () {
        var rawdata = fs_1.default.readFileSync('users.json');
        var users = JSON.parse(rawdata);
        return users;
    };
    UnregisteredUser.prototype.generateId = function () {
        return uuid_1.v4();
    };
    return UnregisteredUser;
}(User_1.User));
exports.UnregisteredUser = UnregisteredUser;
