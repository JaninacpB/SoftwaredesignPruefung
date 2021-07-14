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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerTextadventure = void 0;
var ConcretePlayerTextadventure_1 = require("./ConcretePlayerTextadventure");
var PlayerFactory_1 = require("./PlayerFactory");
var PlayerTextadventure = /** @class */ (function (_super) {
    __extends(PlayerTextadventure, _super);
    function PlayerTextadventure() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PlayerTextadventure.prototype.createPlayer = function () {
        return new ConcretePlayerTextadventure_1.ConcretePlayerTextadventure();
    };
    return PlayerTextadventure;
}(PlayerFactory_1.PlayerFactory));
exports.PlayerTextadventure = PlayerTextadventure;
