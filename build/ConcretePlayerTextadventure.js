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
var ConcretePlayerTextadventure = /** @class */ (function () {
    function ConcretePlayerTextadventure() {
        this.amountTurns = 0;
    }
    ConcretePlayerTextadventure.prototype.playAdventure = function (_adventure) {
        return __awaiter(this, void 0, void 0, function () {
            var start;
            return __generator(this, function (_a) {
                console.log('\n' + chalk_1.default.bgBlue(_adventure.title) + '\n');
                start = this.getStartField(_adventure.startpointX, _adventure.startpointY, _adventure.field);
                console.log('Du startest deine Reise hier: ' + start.place);
                this.goOverMap(start.xPosition, start.yPosition, _adventure);
                return [2 /*return*/];
            });
        });
    };
    ConcretePlayerTextadventure.prototype.goOverMap = function (_x, _y, _adventure) {
        return __awaiter(this, void 0, void 0, function () {
            var userChoiceMove;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, prompts_1.default([
                            {
                                type: 'select',
                                name: 'value',
                                message: 'Gehe nach: ',
                                choices: [
                                    { title: 'Norden', value: '0' },
                                    { title: 'Osten', value: '1', },
                                    { title: 'Süden', value: '2' },
                                    { title: 'Westen', value: '3' },
                                    { title: 'Spiel beenden', value: '-1' }
                                ],
                                initial: 0
                            }
                        ])];
                    case 1:
                        userChoiceMove = _a.sent();
                        if (this.checkIfEnd(_adventure, _x, _y, userChoiceMove.value)) {
                            console.log('Du kannst nicht nach ' + userChoiceMove + ' gehen');
                        }
                        else if (userChoiceMove.value !== -1) {
                            //todo: change x or y
                            this.amountTurns = +1;
                            //todo: Ort ausgeben
                            this.goOverMap(_x, _y, _adventure);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    ConcretePlayerTextadventure.prototype.checkIfEnd = function (_adventure, _x, _y, _nextMoveOrientation) {
        var isNotOnTheMap = false;
        switch (_nextMoveOrientation) {
            case 0: {
                if (0 > _y - 1) {
                    isNotOnTheMap = true;
                }
                break;
            }
            case 1: {
                if (_adventure.mapSizeX < _x + 1) {
                    isNotOnTheMap = true;
                }
                break;
            }
            case 2: {
                if (_adventure.mapSizeY < _y + 1) {
                    isNotOnTheMap = true;
                }
                break;
            }
            case 3: {
                if (0 < _x - 1) {
                    isNotOnTheMap = true;
                }
                break;
            }
        }
        return isNotOnTheMap;
    };
    ConcretePlayerTextadventure.prototype.getStartField = function (_x, _y, _allFields) {
        var currentField = _allFields.filter(function (field) { return field.xPosition === _x && field.yPosition === _y; })[0];
        return currentField;
    };
    return ConcretePlayerTextadventure;
}());
exports.ConcretePlayerTextadventure = ConcretePlayerTextadventure;
