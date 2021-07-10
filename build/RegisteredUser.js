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
exports.RegisteredUser = void 0;
var Field_1 = require("./Field");
var RegisteredUser = /** @class */ (function () {
    //todo: wenn hier mehr dazu kommt auf Reihenfolge achten, sonst regestieren falsch
    function RegisteredUser(username, password, id) {
        this.prompts = require('prompts');
        this.chalk = require('chalk');
        this.fs = require('fs');
        this.fsBack = require('fs').promises;
        this.id = id;
        this.username = username;
        this.password = password;
    }
    RegisteredUser.prototype.navigateMenu = function () {
        var _this = this;
        (function () { return __awaiter(_this, void 0, void 0, function () {
            var startScreen;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.prompts([
                            {
                                type: 'select',
                                name: 'value',
                                message: '"Wie kann ich dir helfen "' + this.username + '"?"',
                                choices: [
                                    { title: '"Diese Bücher, die du bei dir trägst, welche Geschichten enthalten sie... (Übersicht aller Abendteuer anzeigen)"', value: '0' },
                                    { title: '"Ich bin auf der Suche nach einer ganz bestimmten Geschichte... (Nach Abendteuer suchen)"', value: '1' },
                                    { title: '"Ich möchte eine eigene Geschichte erschaffen... (Erstelle ein Textadventure)"', value: '2' },
                                    { title: '"Hast du anderen bereits meine Geschichten gegeben? Was sagten sie... (Statistik ansehen)"', value: '3' },
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
                                break;
                            case '2':
                                this.createMap();
                                break;
                            case '3':
                                break;
                        }
                        return [2 /*return*/];
                }
            });
        }); })();
    };
    RegisteredUser.prototype.createMap = function () {
        var _this = this;
        console.log(this.chalk.bgBlue('\nArbeitszimmer (Erstelle ein Textadventure)\n'));
        console.log('"So, nichts ist wichter als ein guter Titel. Etwas fabulöses, etwas magisches mit einem Hauch von Abendteuer. Etwas wie: \n Maximus Reise ins Zauberland.\n Maximus 2: Tag der Abrechnung \n Maximus: Der Tollkühneheld \n Maximus: Casino Royal \n Also ich denke du hast ja jetzt schon ein paar gute Ideen"');
        (function () { return __awaiter(_this, void 0, void 0, function () {
            var mapData, maximusRegrex, mapSize;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.prompts([
                            {
                                type: 'text',
                                name: 'title',
                                message: 'Nun was ist dein Titel..." (Adventuretitle angeben)"',
                            },
                            {
                                type: 'number',
                                name: 'mapSizeX',
                                min: 1,
                                max: 10,
                                message: '"Also, wie groß darf es denn sein? Fangen wir mit der Anzahl der Felder zwischen West und Ost an... (Kartengöße in X Richtung →)"',
                                initial: 1
                            },
                            {
                                type: 'number',
                                name: 'mapSizeY',
                                min: 1,
                                max: 10,
                                message: '"Jetzt die Anzahl der Felder zwischen Nord und Süd an... (Kartengöße in Y Richtung ↓)"',
                                initial: 1
                            }
                        ])];
                    case 1:
                        mapData = _a.sent();
                        maximusRegrex = /Maximus/gi;
                        if (maximusRegrex.test(mapData.title)) {
                            console.log('"Welch wunderbarer Title!');
                        }
                        else {
                            console.log('"Am Titel könnte man Arbeiten, aber sonst in Ordnung...');
                        }
                        mapSize = mapData.mapSizeX * mapData.mapSizeY;
                        console.log('Deine Karte ist übrigens: ' + mapSize + ' Felder groß. Fantastisch!"');
                        this.giveStartpoint(mapData);
                        return [2 /*return*/];
                }
            });
        }); })();
    };
    RegisteredUser.prototype.giveStartpoint = function (_mapData) {
        return __awaiter(this, void 0, void 0, function () {
            var StartConfig, field, allFields;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log(_mapData.xPosistion);
                        return [4 /*yield*/, this.prompts([
                                {
                                    type: 'number',
                                    name: 'startpointX',
                                    min: '1',
                                    max: _mapData.mapSizeX,
                                    initial: 1,
                                    message: 'Nun, wo genau soll die Reise den starten? Gib den X Startpunkt an... (X Startpunkt auf der Karteangeben)"',
                                },
                                {
                                    type: 'number',
                                    name: 'startpointY',
                                    min: '1',
                                    max: _mapData.mapSizeY,
                                    initial: 1,
                                    message: 'Und wo ist der Y Startpunkt... (Y Startpunkt auf der Karteangeben)"',
                                },
                            ])];
                    case 1:
                        StartConfig = _a.sent();
                        field = [];
                        allFields = this.giveFieldDescription(_mapData, 1, 1, field);
                        return [2 /*return*/];
                }
            });
        });
    };
    RegisteredUser.prototype.giveFieldDescription = function (_mapData, _currentX, _currentY, _fieldValues) {
        return __awaiter(this, void 0, void 0, function () {
            var fieldDescription, currentField;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.prompts([
                            {
                                type: 'text',
                                name: 'discription',
                                message: '"Und was ist am Punkt ' + _currentX + '/' + _currentY + ' ... (Beschreibung eingeben)"'
                            }
                        ])];
                    case 1:
                        fieldDescription = _a.sent();
                        currentField = new Field_1.Field(_currentX, _currentY, fieldDescription.discription);
                        _fieldValues.push(currentField);
                        // Loop untill all fields have a description. Go Vertical over x Fields untill end of row, than add +1 to y and start over.
                        if (_currentX === _mapData.mapSizeX && _currentY !== _mapData.mapSizeY) {
                            this.giveFieldDescription(_mapData, 1, _currentY + 1, _fieldValues);
                            return [2 /*return*/, _fieldValues];
                        }
                        else if (_currentX < _mapData.mapSizeX) {
                            this.giveFieldDescription(_mapData, _currentX + 1, _currentY, _fieldValues);
                            return [2 /*return*/, _fieldValues];
                        }
                        // todo: Save to file
                        return [2 /*return*/, _fieldValues];
                }
            });
        });
    };
    // todo: in Adventure einfügen? Lauffähig machen
    RegisteredUser.prototype.saveAdventureToJSON = function (_newAdventure) {
        return __awaiter(this, void 0, void 0, function () {
            var rawdata, adventures, jsonData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        rawdata = this.fs.readFileSync('adventure.json');
                        adventures = JSON.parse(rawdata);
                        adventures.push(_newAdventure);
                        jsonData = JSON.stringify(adventures);
                        return [4 /*yield*/, this.fsBack.writeFile('adventure.json', jsonData)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    RegisteredUser.prototype.saveUserToJSON = function () {
        return __awaiter(this, void 0, void 0, function () {
            var rawdata, users, jsonData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        rawdata = this.fs.readFileSync('users.json');
                        users = JSON.parse(rawdata);
                        this.id = this.generateId(users[users.length - 1].id);
                        users.push(this);
                        jsonData = JSON.stringify(users);
                        return [4 /*yield*/, this.fsBack.writeFile('users.json', jsonData)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    // todo: useless?
    RegisteredUser.prototype.generateId = function (_lastID) {
        return _lastID + 1;
    };
    return RegisteredUser;
}());
exports.RegisteredUser = RegisteredUser;
