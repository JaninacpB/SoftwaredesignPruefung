// Note: Factory exist so that you could in theory add more games/modes to the textadventure later one
// for example an textadventure with inventory or graphic interface

import { GeneralPlayer } from "./GeneralPlayer";

export abstract class PlayerFactory {

    public abstract createPlayer(): GeneralPlayer;

}