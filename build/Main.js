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
exports.Main = void 0;
var wait_1 = __importDefault(require("wait"));
var UnregisteredUser_1 = require("./UnregisteredUser");
var Main = /** @class */ (function () {
    function Main() {
        this.unregisteredUser = new UnregisteredUser_1.UnregisteredUser();
        this.startTitle();
    }
    Main.prototype.startTitle = function () {
        return __awaiter(this, void 0, void 0, function () {
            var adventuriaArt, maximusArt, timeToWait, unregisteredUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        adventuriaArt = [
                            " _____   _             _           _               ____      _        _____        _      _____   _             _               ",
                            "|  _  |_| |_ _ ___ ___| |_ _ _ ___|_|___    ___   |    \\ ___|_|___   |_   ____ _ _| |_   |  _  |_| |_ _ ___ ___| |_ _ _ ___ ___ ",
                            "|     | . | | | -_|   |  _| | |  _| | .'|  |___|  |  |  | -_| |   |    | || -_|_'_|  _|  |     | . | | | -_|   |  _| | |  _| -_|",
                            "|__|__|___|\\_/|___|_|_|_| |___|_| |_|__,|         |____/|___|_|_|_|    |_||___|_,_|_|    |__|__|___|\\_/|___|_|_|_| |___|_| |___|",
                            "                                                                                                                                "
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
                        return [4 /*yield*/, wait_1.default(timeToWait * (maximusArt.length + 1))];
                    case 2:
                        _a.sent();
                        unregisteredUser = new UnregisteredUser_1.UnregisteredUser();
                        console.log('Willkommen Reisender, ich bin Maximus, der großartige Illusionist und Magier. \n Der Retter der sieben Drachen, bezwinger der grausamen Könige und- Sag mal, du kommst mir bekannt vor oder etwa nicht?');
                        unregisteredUser.menu();
                        return [2 /*return*/];
                }
            });
        });
    };
    Main.prototype.loadAsciiArt = function (_timeToWaitInMs, _asciiArt) {
        return __awaiter(this, void 0, void 0, function () {
            var i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < _asciiArt.length)) return [3 /*break*/, 4];
                        console.log(_asciiArt[i]);
                        return [4 /*yield*/, wait_1.default(_timeToWaitInMs)];
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
    Main.prototype.loadAsciiArtRed = function (_timeToWaitInMs, _asciiArt) {
        return __awaiter(this, void 0, void 0, function () {
            var chalk, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        chalk = require('chalk');
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < _asciiArt.length)) return [3 /*break*/, 4];
                        console.log(chalk.bgRed(_asciiArt[i]));
                        return [4 /*yield*/, wait_1.default(_timeToWaitInMs)];
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
exports.Main = Main;
new Main();
