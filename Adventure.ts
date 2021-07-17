import { FieldModel } from "./Model/Interface/FieldModel";
import fs from "fs";
import fsBack from "fs/promises";
import { AdventureModel } from "./Model/Interface/AdventureModel";

export class Adventure {

    public adventureId: string;
    public title: string;
    public author: string;
    public startpointX: number;
    public startpointY: number;
    public amountPlayers: number;
    public amountTurns: number;
    public mapSizeX: number;
    public mapSizeY: number;
    public field: FieldModel[];

    constructor(_adventure: AdventureModel) {
        this.adventureId = _adventure.adventureId;
        this.title = _adventure.title;
        this.author = _adventure.author;
        this.startpointX = _adventure.startpointX;
        this.startpointY = _adventure.startpointY;
        this.amountPlayers = _adventure.amountPlayers;
        this.amountTurns = _adventure.amountTurns;
        this.mapSizeX = _adventure.mapSizeX;
        this.mapSizeY = _adventure.mapSizeY;
        this.field = _adventure.field;
    }

    public async saveToJSON() {
        let rawdata: any = fs.readFileSync('adventure.json');
        let adventures: AdventureModel[] = JSON.parse(rawdata);

        adventures.push(this);

        // save to JSON
        let jsonData = JSON.stringify(adventures);
        await fsBack.writeFile('adventure.json', jsonData);
    }
}