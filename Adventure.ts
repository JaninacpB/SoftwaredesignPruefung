import { Field } from "./Field";

export class Adventure{
    private adventureId: number;
    public title: string;
    public author: string;
    public startpoint: number;
    public amountPlayers: number;
    public amountTurns: number;
    public field: Field[];

    constructor(_title: string, _author: string, _startpoint: number, _amountPlayers: number, _amountTurns: number, _field: Field[]) {
        //todo: generate Id
        this.adventureId = this.createID();
        this.title = _title;
        this.author = _author;
        this.startpoint = _startpoint;
        this.amountPlayers = _amountPlayers;
        this.amountTurns = _amountTurns;
        this.field = _field;
    }

    // todo:
    private createID(): number {
        return 1;
    }

}