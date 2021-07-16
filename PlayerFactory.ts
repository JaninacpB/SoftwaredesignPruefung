// Note: Factory exist so that you could in theory add more games/modes to the textadventure later one
// for example an textadventure with inventory or graphic interface

import { GeneralPlayerModel } from "./Model/Interface/GeneralPlayerModel";

export abstract class PlayerFactory {

    public abstract createPlayer(): GeneralPlayerModel;

}