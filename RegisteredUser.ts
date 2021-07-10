import { Adventure } from "./Adventure";
import { Field } from "./Field";

export class RegisteredUser {
    private prompts = require('prompts');
    private chalk = require('chalk');
    private fs = require('fs');
    private fsBack = require('fs').promises;

    private static instance: RegisteredUser;

    public username: string;
    public password: string;
    public id: number;

    //todo: wenn hier mehr dazu kommt auf Reihenfolge achten, sonst regestieren falsch
    private constructor(username: string, password: string, id: number) {
        this.id = id;
        this.username = username;
        this.password = password;
    }

    // Singleton Method Code from: https://refactoring.guru/design-patterns/singleton/typescript/example
    public static getInstance(_username: string, _password: string, _id: number): RegisteredUser {
        if (!RegisteredUser.instance) {
            RegisteredUser.instance = new RegisteredUser(_username, _password, _id);
        }
        return RegisteredUser.instance;
    }

    public navigateMenu() {
        (async () => {
            const startScreen = await this.prompts([
                {
                    type: 'select',
                    name: 'value',
                    message: '"Wie kann ich dir helfen "' + this.username + '"?"',
                    choices: [
                        { title: '"Diese Bücher, die du bei dir trägst, welche Geschichten enthalten sie... (Übersicht aller Abendteuer anzeigen)"', value: '0' },
                        { title: '"Ich bin auf der Suche nach einer ganz bestimmten Geschichte... (Nach Abendteuer suchen)"', value: '1' },
                        { title: '"Ich möchte eine eigene Geschichte erschaffen... (Erstelle ein Textadventure)"', value: '2' },
                        { title: '"Hast du anderen bereits meine Geschichten gegeben? Was sagten sie... (Statistik ansehen)"', value: '3' },
                    ],
                    initial: 0
                }
            ]);
            console.log(startScreen);
            switch (startScreen.value) {
                case '0':

                    break;
                case '1':

                    break;
                case '2':
                    this.createMap();
                    break
                case '3':
                    break
            }
        })();
    }

    private createMap() {

        console.log(this.chalk.bgBlue('\nArbeitszimmer (Erstelle ein Textadventure)\n'));
        console.log('"So, nichts ist wichter als ein guter Titel. Etwas fabulöses, etwas magisches mit einem Hauch von Abendteuer. Etwas wie: \n Maximus Reise ins Zauberland.\n Maximus 2: Tag der Abrechnung \n Maximus: Der Tollkühneheld \n Maximus: Casino Royal \n Also ich denke du hast ja jetzt schon ein paar gute Ideen"');

        (async () => {
            const mapData = await this.prompts([
                {
                    type: 'text',
                    name: 'title',
                    message: 'Nun was ist dein Titel..." (Adventuretitle angeben)"',
                },
                {
                    type: 'number',
                    name: 'mapSizeX',
                    min: 1,
                    max: 10,
                    message: '"Also, wie groß darf es denn sein? Fangen wir mit der Anzahl der Felder zwischen West und Ost an... (Kartengöße in X Richtung →)"',
                    initial: 1
                },
                {
                    type: 'number',
                    name: 'mapSizeY',
                    min: 1,
                    max: 10,
                    message: '"Jetzt die Anzahl der Felder zwischen Nord und Süd an... (Kartengöße in Y Richtung ↓)"',
                    initial: 1
                }
            ]);
            let maximusRegrex = /Maximus/gi;
            if (maximusRegrex.test(mapData.title)) {
                console.log('"Welch wunderbarer Title!');
            } else {
                console.log('"Am Titel könnte man Arbeiten, aber sonst in Ordnung...')
            }
            let mapSize = mapData.mapSizeX * mapData.mapSizeY;
            console.log('Deine Karte ist übrigens: ' + mapSize + ' Felder groß. Fantastisch!"');
            this.giveStartpoint(mapData);
            // todo: weder x,y einschränkung funktioniert noch schleife (nicht synchron)!
        })();
    }

    private async giveStartpoint(_mapData: any) {
        console.log(_mapData.xPosistion);
        const StartConfig = await this.prompts([
            {
                type: 'number',
                name: 'startpointX',
                min: '1',
                max: _mapData.mapSizeX,
                initial: 1,
                message: 'Nun, wo genau soll die Reise den starten? Gib den X Startpunkt an... (X Startpunkt auf der Karteangeben)"',
            },
            {
                type: 'number',
                name: 'startpointY',
                min: '1',
                max: _mapData.mapSizeY,
                initial: 1,
                message: 'Und wo ist der Y Startpunkt... (Y Startpunkt auf der Karteangeben)"',
            },
        ]);
        let field: Field[] = [];
        //todo: asncy bekomme Ergebniss erst später! wie weiter machen?
        let allFields = this.giveFieldNameAndSave(_mapData, 1, 1, field);
    }

    private async giveFieldNameAndSave(_mapData: any, _currentX: number, _currentY: number, _fieldValues: Field[]): Promise<Field[]> {
        const fieldName = await this.prompts([
            {
                type: 'text',
                name: 'place',
                message: '"Und was ist am Punkt ' + _currentX + '/' + _currentY + ' ... (Ort eingeben)"',
                validate: (value: string) => value === '' ? 'Bitte trage einen Ort ein' : true
            }
        ]);
        let currentField: Field = { xPosistion: _currentX, yPosistion: _currentY, place: fieldName.place };
        _fieldValues.push(currentField);

        // Loop untill all fields have a description. Go Vertical over x Fields untill end of row, than add +1 to y and start over.
        if (_currentX === _mapData.mapSizeX && _currentY !== _mapData.mapSizeY) {
            this.giveFieldNameAndSave(_mapData, 1, _currentY + 1, _fieldValues);
            return _fieldValues;
        } else if (_currentX < _mapData.mapSizeX) {
            this.giveFieldNameAndSave(_mapData, _currentX + 1, _currentY, _fieldValues);
            return _fieldValues;
        }
        // todo: Save to file
        console.log(_mapData);
        // this.saveAdventureToJSON()
        // User confirms 

        //console.log(this.confirmAction());
        // TODO: IREGENWIE HIER USER INPUT AKZEPTIEREN!
        (async() => this.confirmAction() );
        return _fieldValues;
    }

    private confirmAction(): boolean {
        const confirm = this.prompts({
                type: 'toggle',
                name: 'value',
                message: 'Willst du dieses Textadventure wirklich erstellen?',
                initial: true,
                active: 'Ja',
                inactive: 'Nein'
            });
        return confirm.value;
    }

    // todo: in Adventure einfügen? Lauffähig machen
    public async saveAdventureToJSON(_newAdventure: Adventure) {
        let rawdata = this.fs.readFileSync('adventure.json');
        let adventures: Adventure[] = JSON.parse(rawdata);

        adventures.push(_newAdventure);

        // save to JSON
        let jsonData = JSON.stringify(adventures);
        await this.fsBack.writeFile('adventure.json', jsonData);
    }

    public async saveUserToJSON() {
        // get complete Users Data and add new entry
        let rawdata = this.fs.readFileSync('users.json');
        let users: RegisteredUser[] = JSON.parse(rawdata);

        this.id = this.generateId(users[users.length - 1].id);
        users.push(this);

        // save to JSON file
        let jsonData = JSON.stringify(users);
        await this.fsBack.writeFile('users.json', jsonData);
    }

    // todo: useless?
    private generateId(_lastID: number): number {
        return _lastID + 1;
    }
}