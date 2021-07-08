import { stringify } from "querystring";

export class RegisteredUser {
    private prompts = require('prompts');
    private chalk = require('chalk');

    public username: string;
    public password: string;
    public id: number;

    //todo: wenn hier mehr dazu kommt auf Reihenfolge achten, sonst regestieren falsch
    constructor(username: string, password: string, id: number) {
        this.id = id;
        this.username = username;
        this.password = password;
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
                        message: '"Also, wie groß darf es denn sein? Fangen wir mit der Anzahl der Felder zwischen West und Ost an... (Kartengöße in horizotaler Richtung)"',
                        initial: 1
                    },
                    {
                        type: 'number',
                        name: 'mapSizeY',
                        min: 1,
                        max: 10,
                        message: '"Jetzt die Anzahl der Felder zwischen Nord und Süd an... (Kartengöße in vertikaler Richtung)"',
                        initial: 1
                    }
                ]);
                let mapSize = mapData.mapSizeX * mapData.mapSizeY;
                console.log('"Perfekt. Deine Karte ist also: ' + mapSize + ' Felder groß. Fantastisch!')
                // console.log(mapData.title);
                // console.log(mapData.title.match('/Maximus/'));
                // if(mapData.title.match('/Maximus/') !== -1){
                //     console.log('"Welch wunderbarer Title!"');
                // }
            })();
    }

    public async saveToJSON() {
        // get complete Users Data and add new entry
        const fs = require('fs');
        let rawdata = fs.readFileSync('users.json');
        let users: RegisteredUser[] = JSON.parse(rawdata);

        this.id = this.generateId(users[users.length - 1].id);
        users.push(this);

        const fsBack = require('fs').promises;

        // save to JSON file
        let jsonData = JSON.stringify(users);
        await fsBack.writeFile('users.json', jsonData);
    }

    // todo: useless?
    private generateId(_lastID: number): number {
        return _lastID + 1;
    }
}