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
exports.RegisteredUser = void 0;
var Adventure_1 = require("./Adventure");
var User_1 = require("./User");
var uuid_1 = require("uuid");
var fs_1 = __importDefault(require("fs"));
var promises_1 = __importDefault(require("fs/promises"));
var chalk_1 = __importDefault(require("chalk"));
var prompts_1 = __importDefault(require("prompts"));
var RegisteredUser = /** @class */ (function (_super) {
    __extends(RegisteredUser, _super);
    function RegisteredUser(username, password, id) {
        var _this = _super.call(this) || this;
        _this.id = id;
        _this.username = username;
        _this.password = password;
        return _this;
    }
    // Singleton Method Code from: https://refactoring.guru/design-patterns/singleton/typescript/example
    RegisteredUser.getInstance = function (_username, _password, _id) {
        if (!RegisteredUser.instance) {
            RegisteredUser.instance = new RegisteredUser(_username, _password, _id);
        }
        return RegisteredUser.instance;
    };
    RegisteredUser.prototype.navigateMenu = function () {
        return __awaiter(this, void 0, void 0, function () {
            var startScreen;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, prompts_1.default([
                            {
                                type: 'select',
                                name: 'value',
                                message: '"Wie kann ich dir helfen "' + this.username + '"?"',
                                choices: [
                                    { title: '"Diese Bücher, die du bei dir trägst, welche Geschichten enthalten sie... (Übersicht aller Abendteuer anzeigen)"', value: 0 },
                                    { title: '"Ich bin auf der Suche nach einer ganz bestimmten Geschichte... (Nach Abendteuer suchen)"', value: 1 },
                                    { title: '"Ich möchte eine eigene Geschichte erschaffen... (Erstelle ein Textadventure)"', value: 2 },
                                    { title: '"Hast du anderen bereits meine Geschichten gegeben? Was sagten sie... (Statistik ansehen)"', value: 3 },
                                    { title: chalk_1.default.red('"Es wird Zeit, dass unsere Wege sich wieder trenne... (Programm beenden)"'), value: 4 }
                                ],
                                initial: 0
                            }
                        ])];
                    case 1:
                        startScreen = _a.sent();
                        switch (startScreen.value) {
                            case 0:
                                this.firstFiveAdventures(this.id);
                                break;
                            case 1:
                                this.searchAdventure(this.id);
                                break;
                            case 2:
                                this.createMap();
                                break;
                            case 3:
                                this.showStatistic();
                                break;
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    RegisteredUser.prototype.showStatistic = function () {
        return __awaiter(this, void 0, void 0, function () {
            var promptAdventureTitles, userAdventures, i, choice, userAdventuresChoice_1, adventureCurrentIndex, adventureCurrent, avgTurns;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log(chalk_1.default.bgBlue('\nArchiv (Siehe dir die Statistik deiner Abendteuer an)\n'));
                        promptAdventureTitles = [];
                        userAdventures = this.checkUserAdventures();
                        if (!(userAdventures.length === 0)) return [3 /*break*/, 1];
                        console.log(chalk_1.default.red('"Noch hast du keine Geschichten geschrieben. Kehre zurück sobald du es getan hast."'));
                        this.navigateMenu();
                        return [3 /*break*/, 3];
                    case 1:
                        // format for Prompt
                        for (i = 0; i < userAdventures.length; i++) {
                            choice = { value: userAdventures[i].adventureId, title: userAdventures[i].title };
                            promptAdventureTitles.push(choice);
                        }
                        return [4 /*yield*/, prompts_1.default([
                                {
                                    type: 'select',
                                    name: 'value',
                                    message: '"Welche Geschichte möchtest du dir genauer ansehen?"',
                                    choices: promptAdventureTitles,
                                    initial: 0
                                },
                            ])];
                    case 2:
                        userAdventuresChoice_1 = _a.sent();
                        adventureCurrentIndex = userAdventures.findIndex(function (i) { return i.adventureId === userAdventuresChoice_1.value; });
                        adventureCurrent = userAdventures[adventureCurrentIndex];
                        console.log('"Nun gut schauen wir einmal, was ich so über die Geschichte "' + chalk_1.default.green(adventureCurrent.title) + '" weiß..."');
                        console.log('"Interessant, diese Geschichte wurde schon von: ' + chalk_1.default.green(adventureCurrent.amountPlayers + ' Spieleren gespielt.') + '"');
                        avgTurns = adventureCurrent.amountTurns / adventureCurrent.amountPlayers;
                        if (adventureCurrent.amountPlayers !== 0) {
                            console.log('"Und auch gut zu wissen, insgesamt verbrachen Spieler'
                                + chalk_1.default.green(' durschnittlich ' + avgTurns.toFixed(2) + ' Züge ') + 'auf deiner Karte."');
                        }
                        else {
                            console.log('"Mehr kann ich dir im Moment leider nicht sagen."');
                        }
                        this.navigateMenu();
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    RegisteredUser.prototype.checkUserAdventures = function () {
        // Get Adventure from JSON
        var rawdata = fs_1.default.readFileSync('adventure.json');
        var adventures = JSON.parse(rawdata);
        var userAdventures = [];
        for (var i = 0; i < adventures.length; i++) {
            if (adventures[i].author === this.id) {
                userAdventures.push(adventures[i]);
            }
        }
        return userAdventures;
    };
    RegisteredUser.prototype.createMap = function () {
        return __awaiter(this, void 0, void 0, function () {
            var adventure, mapData, maximusRegrex, mapSize;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        adventure = {};
                        adventure.amountPlayers = 0;
                        adventure.amountTurns = 0;
                        adventure.author = this.id;
                        console.log(chalk_1.default.bgBlue('\nArbeitszimmer (Erstelle ein Textadventure)\n'));
                        console.log('"So, nichts ist wichter als ein guter Titel. Etwas fabulöses, etwas magisches mit einem Hauch von Abendteuer. Etwas wie: \n Maximus Reise ins Zauberland.\n Maximus 2: Tag der Abrechnung \n Maximus: Der Tollkühneheld \n Maximus: Casino Royal \n Also ich denke du hast ja jetzt schon ein paar gute Ideen"');
                        return [4 /*yield*/, prompts_1.default([
                                {
                                    type: 'text',
                                    name: 'title',
                                    message: 'Nun was ist dein Titel..." (Abenteuertitle angeben)"',
                                    validate: function (title) { return title == '' ? chalk_1.default.red('Du musst einen Title angeben um fortzufahren') : true; }
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
                        adventure.title = mapData.title;
                        adventure.mapSizeX = mapData.mapSizeX;
                        adventure.mapSizeY = mapData.mapSizeY;
                        this.giveStartpoint(adventure);
                        return [2 /*return*/];
                }
            });
        });
    };
    RegisteredUser.prototype.giveStartpoint = function (_adventure) {
        return __awaiter(this, void 0, void 0, function () {
            var startConfig, field;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, prompts_1.default([
                            {
                                type: 'number',
                                name: 'startpointX',
                                min: 1,
                                max: _adventure.mapSizeX,
                                initial: 1,
                                message: 'Nun, wo genau soll die Reise den starten? Gib den X Startpunkt an... (X Startpunkt auf der Karteangeben)"',
                            },
                            {
                                type: 'number',
                                name: 'startpointY',
                                min: 1,
                                max: _adventure.mapSizeY,
                                initial: 1,
                                message: 'Und wo ist der Y Startpunkt... (Y Startpunkt auf der Karteangeben)"',
                            },
                        ])];
                    case 1:
                        startConfig = _a.sent();
                        _adventure.startpointX = startConfig.startpointX;
                        _adventure.startpointY = startConfig.startpointY;
                        field = [];
                        console.log('"Jetzt lass uns die Felder füllen. Wir fangen an Punkt 1/1 welcher links oben auf der Karte liegt und arbeiten uns zum Punkt rechts Unten durch."');
                        this.giveFieldPlaceName(_adventure, 1, 1, field);
                        return [2 /*return*/];
                }
            });
        });
    };
    RegisteredUser.prototype.giveFieldPlaceName = function (_adventure, _currentX, _currentY, _fieldValues) {
        return __awaiter(this, void 0, void 0, function () {
            var fieldName, currentField;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, prompts_1.default([
                            {
                                type: 'text',
                                name: 'place',
                                message: '"Und was ist am Punkt ' + _currentX + '/' + _currentY + ' ... (Ort eingeben)"',
                                validate: function (value) { return value === '' ? 'Bitte trage einen Ort ein' : true; }
                            }
                        ])];
                    case 1:
                        fieldName = _a.sent();
                        currentField = { xPosition: _currentX, yPosition: _currentY, place: fieldName.place };
                        _fieldValues.push(currentField);
                        // Loop untill all fields have a description. Go Vertical over x Fields untill end of row, than add +1 to y and start over.
                        if (_currentX === _adventure.mapSizeX && _currentY !== _adventure.mapSizeY) {
                            this.giveFieldPlaceName(_adventure, 1, _currentY + 1, _fieldValues);
                            return [2 /*return*/, _fieldValues];
                        }
                        else if (_currentX < _adventure.mapSizeX) {
                            this.giveFieldPlaceName(_adventure, _currentX + 1, _currentY, _fieldValues);
                            return [2 /*return*/, _fieldValues];
                        }
                        _adventure.field = _fieldValues;
                        this.confirmAction(_adventure);
                        return [2 /*return*/];
                }
            });
        });
    };
    RegisteredUser.prototype.confirmAction = function (_adventure) {
        return __awaiter(this, void 0, void 0, function () {
            var confirm, newAdventure, adventure;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, prompts_1.default({
                            type: 'toggle',
                            name: 'value',
                            message: chalk_1.default.red('Willst du dieses Textadventure wirklich erstellen?'),
                            initial: true,
                            active: 'Ja',
                            inactive: 'Nein'
                        })];
                    case 1:
                        confirm = _a.sent();
                        if (confirm.value) {
                            newAdventure = {
                                adventureId: this.generateId(), title: _adventure.title, author: _adventure.author, startpointX: _adventure.startpointX,
                                startpointY: _adventure.startpointY, amountTurns: _adventure.amountTurns, amountPlayers: _adventure.amountPlayers,
                                mapSizeX: _adventure.mapSizeX, mapSizeY: _adventure.mapSizeY, field: _adventure.field
                            };
                            adventure = new Adventure_1.Adventure(newAdventure);
                            adventure.saveToJSON();
                        }
                        else {
                            console.log(chalk_1.default.red('Textadventure wurde verworfen'));
                        }
                        this.navigateMenu();
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
                        rawdata = fs_1.default.readFileSync('users.json');
                        users = JSON.parse(rawdata);
                        users.push(this);
                        jsonData = JSON.stringify(users);
                        return [4 /*yield*/, promises_1.default.writeFile('users.json', jsonData)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    RegisteredUser.prototype.generateId = function () {
        return uuid_1.v4();
    };
    return RegisteredUser;
}(User_1.User));
exports.RegisteredUser = RegisteredUser;
