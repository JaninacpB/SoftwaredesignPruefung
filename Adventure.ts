import { Field } from "./Field";

export class Adventure{
    // todo: File mir verweisen machen? statt doppelt
    private fs = require('fs');
    private fsBack = require('fs').promises;

    public adventureId: string;
    public title: string;
    public author: string;
    public startpointX: number;
    public startpointY: number;
    public amountPlayers: number;
    public amountTurns: number;
    public mapSizeX: number;
    public mapSizeY: number;
    public field: Field[];

    constructor(_id:string, _title: string, _author: string, _startpointX: number, _startpointY: number,
         _amountPlayers: number, _amountTurns: number, _mapSizeX: number, _mapSizeY: number,
          _field: Field[]) {
        this.adventureId = _id;
        this.title = _title;
        this.author = _author;
        this.startpointX = _startpointX;
        this.startpointY = _startpointY;
        this.amountPlayers = _amountPlayers;
        this.amountTurns = _amountTurns;
        this.mapSizeX = _mapSizeX;
        this.mapSizeY = _mapSizeY;
        this.field = _field;
    }

    // todo: prüfen ob noch läuft (einmal verändert jetzt aber eigentlich wieder normal)
    public async saveToJSON() {
        let rawdata = this.fs.readFileSync('adventure.json');
        let adventures: Adventure[] = JSON.parse(rawdata);

        this.adventureId = adventures[adventures.length - 1].adventureId + 1;
        adventures.push(this);

        // save to JSON
        let jsonData = JSON.stringify(adventures);
        await this.fsBack.writeFile('adventure.json', jsonData);
    }
}