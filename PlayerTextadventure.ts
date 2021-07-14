import { ConcretePlayerTextadventure } from "./ConcretePlayerTextadventure";
import { GeneralPlayer } from "./GeneralPlayer";
import { PlayerFactory } from "./PlayerFactory";

export class PlayerTextadventure extends PlayerFactory {

    public createPlayer(): GeneralPlayer {
        return new ConcretePlayerTextadventure();
    }

}