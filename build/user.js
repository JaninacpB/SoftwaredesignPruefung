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
exports.User = void 0;
var PlayerTextadventure_1 = require("./PlayerTextadventure");
var prompts_1 = __importDefault(require("prompts"));
var fs_1 = __importDefault(require("fs"));
var chalk_1 = __importDefault(require("chalk"));
var User = /** @class */ (function () {
    function User() {
    }
    // _id for identify in ConcretePlayerTextadventure later if registered or not -> used to navigate back to right menu
    User.prototype.searchAdventure = function (_id) {
        return __awaiter(this, void 0, void 0, function () {
            var allAdventures, allAdventuresPrompt, prompts, userChoiceId, userChoiceAdventure, playerFactroy, player;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log(chalk_1.default.bgBlue('\nTurmzimmer mit gro??er Aussicht (Suche)\n'));
                        allAdventures = this.getAdventures();
                        allAdventuresPrompt = this.parseForPrompt(allAdventures);
                        prompts = require('prompts');
                        return [4 /*yield*/, prompts([
                                {
                                    type: 'autocomplete',
                                    limit: 3,
                                    name: 'value',
                                    message: '"Gebe ein, was du erleben willst..."',
                                    choices: allAdventuresPrompt,
                                    fallback: '"Es tut mir Leid, diese Geschichte ist mir nicht bekannt."',
                                    initial: 0
                                }
                            ])];
                    case 1:
                        userChoiceId = _a.sent();
                        userChoiceAdventure = allAdventures.find(function (adventure) { return adventure.adventureId === userChoiceId.value; });
                        playerFactroy = new PlayerTextadventure_1.PlayerTextadventure();
                        player = playerFactroy.createPlayer();
                        player.id = _id;
                        player.playAdventure(userChoiceAdventure);
                        return [2 /*return*/];
                }
            });
        });
    };
    User.prototype.showFiveAdventures = function (_id) {
        return __awaiter(this, void 0, void 0, function () {
            var allAdventures;
            return __generator(this, function (_a) {
                console.log(chalk_1.default.bgBlue('\nBalkon mit ??berschaubarer Aussicht (??bersicht)\n'));
                allAdventures = this.parseForPrompt(this.getAdventures());
                this.navigateThroughListOfFive(allAdventures, 1, _id);
                return [2 /*return*/];
            });
        });
    };
    // i counts the loop/rekussion 
    User.prototype.navigateThroughListOfFive = function (_allAdventures, i, _id) {
        return __awaiter(this, void 0, void 0, function () {
            var currentAdventure, amountEntriesShow, showMore, userChoiceAdventurePrompt, adventures, userChoiceAdventure, playerFactroy, player;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        currentAdventure = _allAdventures;
                        amountEntriesShow = 5;
                        if (i === 1) {
                            currentAdventure = currentAdventure.slice(0, amountEntriesShow);
                        }
                        else {
                            currentAdventure = _allAdventures.slice(amountEntriesShow * i - amountEntriesShow, amountEntriesShow * i);
                        }
                        showMore = { value: '-1', title: '"Zeig mir mehr!"' };
                        if (_allAdventures.length > amountEntriesShow) {
                            currentAdventure.push(showMore);
                        }
                        return [4 /*yield*/, prompts_1.default([
                                {
                                    type: 'select',
                                    name: 'value',
                                    message: '"Hier eine Auswahl meiner feinsten Geschichte: "',
                                    choices: currentAdventure,
                                    initial: 0
                                }
                            ])];
                    case 1:
                        userChoiceAdventurePrompt = _a.sent();
                        i = i + 1;
                        if (userChoiceAdventurePrompt.value === '-1' && _allAdventures.length >= i * amountEntriesShow - amountEntriesShow) {
                            console.log('Es gibt mehr Adventure als gerade sichtbar');
                            console.log('L??nge Anzahl Abentuer: ' + _allAdventures.length);
                            this.navigateThroughListOfFive(_allAdventures, i, _id);
                        }
                        else if (userChoiceAdventurePrompt.value === '-1') {
                            console.log(chalk_1.default.red('"Tut mir Leid, mehr gibt es hier nicht zu sehen, suche bitte eines aus der Liste aus..."'));
                            this.navigateThroughListOfFive(_allAdventures, 1, _id);
                        }
                        else {
                            adventures = this.getAdventures();
                            userChoiceAdventure = adventures.find(function (adventure) { return adventure.adventureId === userChoiceAdventurePrompt.value; });
                            playerFactroy = new PlayerTextadventure_1.PlayerTextadventure();
                            player = playerFactroy.createPlayer();
                            player.id = _id;
                            player.playAdventure(userChoiceAdventure);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    User.prototype.parseForPrompt = function (_allAdventures) {
        var promptAdventureTitles = [];
        for (var i = 0; i < _allAdventures.length; i++) {
            // with Size of Map
            var adventureTitle = _allAdventures[i].title + '(' + (_allAdventures[i].mapSizeX * _allAdventures[i].mapSizeY) + ' Felder gro??)';
            var choice = { value: _allAdventures[i].adventureId, title: adventureTitle };
            promptAdventureTitles.push(choice);
        }
        return promptAdventureTitles;
    };
    User.prototype.getAdventures = function () {
        var rawdata = fs_1.default.readFileSync('adventure.json');
        var adventures = JSON.parse(rawdata);
        return adventures;
    };
    return User;
}());
exports.User = User;
