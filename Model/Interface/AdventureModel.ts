import { Field } from "./Field";

export interface AdventureModel {

    adventureId: string;
    title: string;
    author: string;
    startpointX: number;
    startpointY: number;
    amountPlayers: number;
    amountTurns: number;
    mapSizeX: number;
    mapSizeY: number;
    field: Field[];

}