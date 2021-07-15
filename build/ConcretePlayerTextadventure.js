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
exports.ConcretePlayerTextadventure = void 0;
var chalk_1 = __importDefault(require("chalk"));
var prompts_1 = __importDefault(require("prompts"));
var Direction_1 = require("./Direction");
var fs_1 = __importDefault(require("fs"));
var promises_1 = __importDefault(require("fs/promises"));
var ConcretePlayerTextadventure = /** @class */ (function () {
    function ConcretePlayerTextadventure() {
        this.amountTurns = 0;
    }
    ConcretePlayerTextadventure.prototype.playAdventure = function (_adventure) {
        return __awaiter(this, void 0, void 0, function () {
            var start;
            return __generator(this, function (_a) {
                console.log('\n' + chalk_1.default.bgBlue(_adventure.title) + '\n');
                start = this.getcurrentField(_adventure.startpointX, _adventure.startpointY, _adventure.field);
                console.log('Du startest deine Reise hier: ' + chalk_1.default.green(start.place));
                this.goOverMap(start.xPosition, start.yPosition, _adventure);
                return [2 /*return*/];
            });
        });
    };
    ConcretePlayerTextadventure.prototype.goOverMap = function (_x, _y, _adventure) {
        return __awaiter(this, void 0, void 0, function () {
            var userChoiceMove, field;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, prompts_1.default([
                            {
                                type: 'select',
                                name: 'value',
                                message: 'Gehe nach: ',
                                choices: [
                                    { title: 'Norden', value: Direction_1.Direction.North },
                                    { title: 'Osten', value: Direction_1.Direction.East },
                                    { title: 'Süden', value: Direction_1.Direction.South },
                                    { title: 'Westen', value: Direction_1.Direction.West },
                                    { title: chalk_1.default.red('Spiel beenden'), value: Direction_1.Direction.Cancel }
                                ],
                                initial: 0
                            }
                        ])];
                    case 1:
                        userChoiceMove = _a.sent();
                        if (this.checkIfEnd(_adventure, _x, _y, userChoiceMove.value)) {
                            console.log(chalk_1.default.redBright('Du kannst nicht nach ' + chalk_1.default.underline(this.userDirectionChoice(userChoiceMove.value)) + ' gehen. Wähle einen anderen Weg.'));
                            this.goOverMap(_x, _y, _adventure);
                        }
                        else if (userChoiceMove.value !== Direction_1.Direction.Cancel) {
                            this.amountTurns += 1;
                            _x = this.changeX(_x, userChoiceMove.value);
                            _y = this.changeY(_y, userChoiceMove.value);
                            field = this.getcurrentField(_x, _y, _adventure.field);
                            console.log('Du bist nach ' + chalk_1.default.green(this.userDirectionChoice(userChoiceMove.value)) + ' gegangen und bist jetzt hier: ' + chalk_1.default.green(field.place));
                            this.goOverMap(_x, _y, _adventure);
                        }
                        else {
                            this.saveToAdventureStatistikJSON(_adventure.adventureId);
                            //todo: back To Menü pedending that 
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    ConcretePlayerTextadventure.prototype.saveToAdventureStatistikJSON = function (_id) {
        return __awaiter(this, void 0, void 0, function () {
            var rawdata, adventures, i, jsonData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        rawdata = fs_1.default.readFileSync('adventure.json');
                        adventures = JSON.parse(rawdata);
                        for (i = 0; i < adventures.length; i++) {
                            if (adventures[i].adventureId === _id) {
                                adventures[i].amountPlayers += 1;
                                adventures[i].amountTurns += this.amountTurns;
                            }
                        }
                        jsonData = JSON.stringify(adventures);
                        return [4 /*yield*/, promises_1.default.writeFile('adventure.json', jsonData)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ConcretePlayerTextadventure.prototype.userDirectionChoice = function (direction) {
        switch (direction) {
            case Direction_1.Direction.North:
                return 'Norden';
            case Direction_1.Direction.East:
                return 'Osten';
            case Direction_1.Direction.South:
                return 'Süden';
        }
        return 'Westen';
    };
    // only change if W or O Oritention 
    ConcretePlayerTextadventure.prototype.changeX = function (_x, _nextMoveOrientation) {
        switch (_nextMoveOrientation) {
            case Direction_1.Direction.East:
                return _x + 1;
            case Direction_1.Direction.West:
                return _x - 1;
        }
        return _x;
    };
    ConcretePlayerTextadventure.prototype.changeY = function (_y, _nextMoveOrientation) {
        switch (_nextMoveOrientation) {
            case Direction_1.Direction.North:
                return _y - 1;
            case Direction_1.Direction.South:
                return _y + 1;
        }
        return _y;
    };
    ConcretePlayerTextadventure.prototype.checkIfEnd = function (_adventure, _x, _y, _nextMoveOrientation) {
        var isNotOnTheMap = false;
        switch (_nextMoveOrientation) {
            case Direction_1.Direction.North:
                if (0 >= _y - 1) {
                    isNotOnTheMap = true;
                }
                break;
            case Direction_1.Direction.East:
                if (_adventure.mapSizeX < _x + 1) {
                    isNotOnTheMap = true;
                }
                break;
            case Direction_1.Direction.South:
                if (_adventure.mapSizeY < _y + 1) {
                    isNotOnTheMap = true;
                }
                break;
            case Direction_1.Direction.West:
                if (0 >= _x - 1) {
                    isNotOnTheMap = true;
                }
                break;
        }
        return isNotOnTheMap;
    };
    ConcretePlayerTextadventure.prototype.getcurrentField = function (_x, _y, _allFields) {
        var currentField = _allFields.filter(function (field) { return field.xPosition === _x && field.yPosition === _y; })[0];
        return currentField;
    };
    return ConcretePlayerTextadventure;
}());
exports.ConcretePlayerTextadventure = ConcretePlayerTextadventure;
