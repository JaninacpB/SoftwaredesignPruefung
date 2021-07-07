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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var wait_1 = __importDefault(require("wait"));
var UnregisteredUser_1 = require("./UnregisteredUser");
var Main = /** @class */ (function () {
    function Main() {
        this.startMenu();
        this.getJsonFile();
    }
    Main.prototype.getJsonFile = function () {
        var fs = require('fs');
        var rawdata = fs.readFileSync('users.json');
        var users = JSON.parse(rawdata);
        console.log(users);
    };
    Main.prototype.startMenu = function () {
        return __awaiter(this, void 0, void 0, function () {
            var adventuriaArt, maximusArt, timeToWait, prompts;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        adventuriaArt = [
                            "_____   _             _           _               ____      _        _____        _      _____   _             _               ",
                            "|  _  |_| |_ _ ___ ___| |_ _ _ ___|_|___    ___   |    \\ ___|_|___   |_   ____ _ _| |_   |  _  |_| |_ _ ___ ___| |_ _ _ ___ ___ ",
                            "|     | . | | | -_|   |  _| | |  _| | .'|  |___|  |  |  | -_| |   |    | || -_|_'_|  _|  |     | . | | | -_|   |  _| | |  _| -_|",
                            "|__|__|___|\\_/|___|_|_|_| |___|_| |_|__,|         |____/|___|_|_|_|    |_||___|_,_|_|    |__|__|___|\\_/|___|_|_|_| |___|_| |___|"
                        ];
                        maximusArt = [
                            "                    ____ ",
                            "                  .'* *.'",
                            "               __/_*_*(_",
                            "              / _______ \\",
                            "             _\\_)/___\\(_/_ ",
                            "            / _((\\- -/))_ \\",
                            "            \\ \\())(-)(()/ /",
                            "             ' \\(((()))/ '",
                            "            / ' \\)).))/ ' \\",
                            "           / _ \\ - | - /_  \\",
                            "          (   ( .;''';. .'  )",
                            "          _\\ __ /    )\\ __ /_",
                            "            \\/  \   ' /  \\/",
                            "             .'  '...' ' )",
                            "              / /  |  \\ \\",
                            "             / .   .   . \\",
                            "            /   .     .   \\"
                        ];
                        timeToWait = 200;
                        this.loadAsciiArtRed(timeToWait, adventuriaArt);
                        return [4 /*yield*/, wait_1.default(timeToWait * (adventuriaArt.length + 1))];
                    case 1:
                        _a.sent();
                        this.loadAsciiArt(timeToWait, maximusArt);
                        prompts = require('prompts');
                        return [4 /*yield*/, wait_1.default(timeToWait * (maximusArt.length + 1))];
                    case 2:
                        _a.sent();
                        (function () { return __awaiter(_this, void 0, void 0, function () {
                            var startScreen, unregisteredUser;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, prompts([
                                            {
                                                type: 'select',
                                                name: 'value',
                                                message: '"Willkommen Reisender, ich bin Maximus, der großartige Illusionist und Magier. Der Retter der sieben Drachen, bezwinger der grausamen Könige und- Sag mal, du kommst mir bekannt vor oder etwa nicht?"',
                                                choices: [
                                                    { title: '"Ja, unsere Wege trafen sich bereits..." (Log In)', value: '0' },
                                                    { title: '"Nein, du musst mich verwechseln, aber lass mich kurz vorstellen..." (Sign Up)', value: '1' },
                                                    { title: '"Diese Bücher, die du bei dir trägst, welche Geschichten enthalten sie... (Übersicht aller Abendteuer anzeigen)"', value: '2' },
                                                    { title: '"Gut ein anderes Gesicht zu sehen. Ich bin auf der Suche nach einer ganz bestimmten Geschichte... (Nach Abendteuer suchen)"', value: '3' }
                                                ],
                                                initial: 0
                                            }
                                        ])];
                                    case 1:
                                        startScreen = _a.sent();
                                        console.log(startScreen);
                                        switch (startScreen.value) {
                                            case '0':
                                                break;
                                            case '1':
                                                console.log('Case1');
                                                unregisteredUser = new UnregisteredUser_1.UnregisteredUser();
                                                unregisteredUser.getUserData();
                                                break;
                                            case '2':
                                                break;
                                        }
                                        return [2 /*return*/];
                                }
                            });
                        }); })();
                        return [2 /*return*/];
                }
            });
        });
    };
    Main.prototype.loadAsciiArt = function (timeToWaitInMs, asciiArt) {
        return __awaiter(this, void 0, void 0, function () {
            var i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < asciiArt.length)) return [3 /*break*/, 4];
                        console.log(asciiArt[i]);
                        return [4 /*yield*/, wait_1.default(timeToWaitInMs)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Main.prototype.loadAsciiArtRed = function (timeToWaitInMs, asciiArt) {
        return __awaiter(this, void 0, void 0, function () {
            var chalk, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        chalk = require('chalk');
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < asciiArt.length)) return [3 /*break*/, 4];
                        console.log(chalk.bgRed(asciiArt[i]));
                        return [4 /*yield*/, wait_1.default(timeToWaitInMs)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return Main;
}());
new Main();
