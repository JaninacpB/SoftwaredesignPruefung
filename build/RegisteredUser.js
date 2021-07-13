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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisteredUser = void 0;
var Adventure_1 = require("./Adventure");
var User_1 = require("./User");
var RegisteredUser = /** @class */ (function (_super) {
    __extends(RegisteredUser, _super);
    function RegisteredUser(username, password, id) {
        var _this = _super.call(this) || this;
        _this.id = id;
        _this.username = username;
        _this.password = password;
        _this.userAdventure = _this.checkUserAdventures();
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
                        switch (startScreen.value) {
                            case '0':
                                this.firstFiveAdventures();
                                break;
                            case '1':
                                this.searchAdventure();
                                break;
                            case '2':
                                this.createMap();
                                break;
                            case '3':
                                this.showStatistic();
                                break;
                        }
                        return [2 /*return*/];
                }
            });
        }); })();
    };
    RegisteredUser.prototype.showStatistic = function () {
        return __awaiter(this, void 0, void 0, function () {
            var promptAdventureTitles, i, choice;
            var _this = this;
            return __generator(this, function (_a) {
                console.log(this.chalk.bgBlue('\nArchiv (Siehe dir die Statistik deiner Abendteuer an)\n'));
                promptAdventureTitles = [];
                // Für prompt vorbereiten
                for (i = 0; i < this.userAdventure.length; i++) {
                    choice = { value: this.userAdventure[i].adventureId, title: this.userAdventure[i].title };
                    promptAdventureTitles.push(choice);
                }
                (function () { return __awaiter(_this, void 0, void 0, function () {
                    var userAdventuresChoice, adventureCurrentIndex, adventureCurrent;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, this.prompts([
                                    {
                                        type: 'select',
                                        name: 'value',
                                        message: '"Welche Geschichte möchtest du dir genauer ansehen?"',
                                        choices: promptAdventureTitles,
                                        initial: 1
                                    },
                                ])];
                            case 1:
                                userAdventuresChoice = _a.sent();
                                adventureCurrentIndex = this.userAdventure.findIndex(function (i) { return i.adventureId === userAdventuresChoice.value; });
                                adventureCurrent = this.userAdventure[adventureCurrentIndex];
                                // Get Choice from User in 
                                console.log('"Nun gut schauen wir einmal, was ich so über die Geschichte "' + adventureCurrent.title + '" weiß..."');
                                console.log('"Interessant, diese Geschichte wurde schon von: ' + this.chalk.green(adventureCurrent.amountPlayers + ' Spieleren gespielt.') + '"');
                                if (adventureCurrent.amountPlayers !== 0) {
                                    console.log('"Und auch gut zu wissen, insgesamt verbrachen Spieler'
                                        + this.chalk.green(' durschnittlich ' + (adventureCurrent.amountTurns / adventureCurrent.amountPlayers) + ' Züge ') + 'auf deiner Karte."');
                                }
                                else {
                                    console.log('"Mehr kann ich dir im Moment leider nicht sagen."');
                                }
                                this.navigateMenu();
                                return [2 /*return*/];
                        }
                    });
                }); })();
                return [2 /*return*/];
            });
        });
    };
    RegisteredUser.prototype.checkUserAdventures = function () {
        // Get Adventure from JSON
        var rawdata = this.fs.readFileSync('adventure.json');
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
        var _this = this;
        // fill empty object during creation prozess
        var adventure = {};
        adventure.amountPlayers = 0;
        adventure.amountTurns = 0;
        adventure.author = this.id;
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
                        adventure.title = mapData.title;
                        adventure.mapSizeX = mapData.mapSizeX;
                        adventure.mapSizeY = mapData.mapSizeY;
                        this.giveStartpoint(adventure);
                        return [2 /*return*/];
                }
            });
        }); })();
    };
    RegisteredUser.prototype.giveStartpoint = function (_adventure) {
        return __awaiter(this, void 0, void 0, function () {
            var startConfig, field, allFields;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.prompts([
                            {
                                type: 'number',
                                name: 'startpointX',
                                min: '1',
                                max: _adventure.mapSizeX,
                                initial: 1,
                                message: 'Nun, wo genau soll die Reise den starten? Gib den X Startpunkt an... (X Startpunkt auf der Karteangeben)"',
                            },
                            {
                                type: 'number',
                                name: 'startpointY',
                                min: '1',
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
                        allFields = this.giveFieldInput(_adventure, 1, 1, field);
                        return [2 /*return*/];
                }
            });
        });
    };
    RegisteredUser.prototype.giveFieldInput = function (_adventure, _currentX, _currentY, _fieldValues) {
        return __awaiter(this, void 0, void 0, function () {
            var fieldName, currentField;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.prompts([
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
                            this.giveFieldInput(_adventure, 1, _currentY + 1, _fieldValues);
                            return [2 /*return*/, _fieldValues];
                        }
                        else if (_currentX < _adventure.mapSizeX) {
                            this.giveFieldInput(_adventure, _currentX + 1, _currentY, _fieldValues);
                            return [2 /*return*/, _fieldValues];
                        }
                        _adventure.field = _fieldValues;
                        this.confirmAction(_adventure);
                        return [2 /*return*/, _fieldValues];
                }
            });
        });
    };
    RegisteredUser.prototype.confirmAction = function (_adventure) {
        return __awaiter(this, void 0, void 0, function () {
            var confirm, adventure;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.prompts({
                            type: 'toggle',
                            name: 'value',
                            message: 'Willst du dieses Textadventure wirklich erstellen?',
                            initial: true,
                            active: 'Ja',
                            inactive: 'Nein'
                        })];
                    case 1:
                        confirm = _a.sent();
                        if (confirm.value) {
                            adventure = new Adventure_1.Adventure(0, _adventure.title, _adventure.author, _adventure.startpointX, _adventure.startpointY, _adventure.amountPlayers, _adventure.mapSizeX, _adventure.mapSizeX, _adventure.mapSizeY, _adventure.field);
                            adventure.saveToJSON();
                        }
                        else {
                            console.log(this.chalk.red('Adventure wurde verworfen'));
                            // todo: stattdessen von vorne anfangen? 
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
}(User_1.User));
exports.RegisteredUser = RegisteredUser;
