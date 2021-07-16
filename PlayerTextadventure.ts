import { ConcretePlayerTextadventure } from "./ConcretePlayerTextadventure";
import { GeneralPlayerModel } from "./Model/Interface/GeneralPlayerModel";
import { PlayerFactory } from "./PlayerFactory";

export class PlayerTextadventure extends PlayerFactory {

    public createPlayer(): GeneralPlayerModel {
        return new ConcretePlayerTextadventure();
    }
}