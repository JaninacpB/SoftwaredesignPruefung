import { Adventure } from "./Adventure";
import { Field } from "./Field";
import { User } from "./User";
import { PromptChoice } from "./PromptChoice";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import fsBack from "fs/promises";
import chalk from "chalk";
import prompts from "prompts";
import { AdventureModel } from "./Model/Interface/AdventureModel";

export class RegisteredUser extends User {
    private static instance: RegisteredUser;

    public username: string;
    public password: string;
    public id: string;

    private constructor(username: string, password: string, id: string) {
        super();
        this.id = id;
        this.username = username;
        this.password = password;
    }

    // Singleton Method Code from: https://refactoring.guru/design-patterns/singleton/typescript/example
    public static getInstance(_username: string, _password: string, _id: string): RegisteredUser {
        if (!RegisteredUser.instance) {
            RegisteredUser.instance = new RegisteredUser(_username, _password, _id);
        }
        return RegisteredUser.instance;
    }

    public async navigateMenu() {
        const startScreen = await prompts([
            {
                type: 'select',
                name: 'value',
                message: '"Wie kann ich dir helfen "' + this.username + '"?"',
                choices: [
                    { title: '"Diese Bücher, die du bei dir trägst, welche Geschichten enthalten sie... (Übersicht aller Abendteuer anzeigen)"', value: 0 },
                    { title: '"Ich bin auf der Suche nach einer ganz bestimmten Geschichte... (Nach Abendteuer suchen)"', value: 1 },
                    { title: '"Ich möchte eine eigene Geschichte erschaffen... (Erstelle ein Textadventure)"', value: 2 },
                    { title: '"Hast du anderen bereits meine Geschichten gegeben? Was sagten sie... (Statistik ansehen)"', value: 3 },
                    { title: chalk.red('"Es wird Zeit, dass unsere Wege sich wieder trenne... (Programm beenden)"'), value: 4 }
                ],
                initial: 0
            }
        ]);
        switch (startScreen.value) {
            case 0:
                this.firstFiveAdventures(this.id);
                break;
            case 1:
                this.searchAdventure(this.id);
                break;
            case 2:
                this.createMap();
                break
            case 3:
                this.showStatistic();
                break
        }
    }

    private async showStatistic() {
        console.log(chalk.bgBlue('\nArchiv (Siehe dir die Statistik deiner Abendteuer an)\n'));
        let promptAdventureTitles: PromptChoice[] = [];
        let userAdventures: Adventure[] = this.checkUserAdventures();

        if (userAdventures.length === 0) {
            console.log(chalk.red('"Noch hast du keine Geschichten geschrieben. Kehre zurück sobald du es getan hast."'));
            this.navigateMenu();
        } else {
            // format for Prompt
            for (let i = 0; i < userAdventures.length; i++) {
                let choice: PromptChoice = { value: userAdventures[i].adventureId, title: userAdventures[i].title };
                promptAdventureTitles.push(choice);
            }
            const userAdventuresChoice = await prompts([
                {
                    type: 'select',
                    name: 'value',
                    message: '"Welche Geschichte möchtest du dir genauer ansehen?"',
                    choices: promptAdventureTitles,
                    initial: 0
                },
            ]);
            // Get current Adventure from this (Prompt return does not have all needed values)
            let adventureCurrentIndex = userAdventures.findIndex(i => i.adventureId === userAdventuresChoice.value);
            let adventureCurrent = userAdventures[adventureCurrentIndex];

            console.log('"Nun gut schauen wir einmal, was ich so über die Geschichte "' + chalk.green(adventureCurrent.title) + '" weiß..."');
            console.log('"Interessant, diese Geschichte wurde schon von: ' + chalk.green(adventureCurrent.amountPlayers + ' Spieleren gespielt.') + '"');
            let avgTurns = adventureCurrent.amountTurns / adventureCurrent.amountPlayers;
            if (adventureCurrent.amountPlayers !== 0) {
                console.log('"Und auch gut zu wissen, insgesamt verbrachen Spieler'
                    + chalk.green(' durschnittlich ' + avgTurns.toFixed(2) + ' Züge ') + 'auf deiner Karte."');
            } else {
                console.log('"Mehr kann ich dir im Moment leider nicht sagen."');
            }
            this.navigateMenu();
        }
    }

    private checkUserAdventures(): Adventure[] {
        // Get Adventure from JSON
        let rawdata: any = fs.readFileSync('adventure.json');
        let adventures: Adventure[] = JSON.parse(rawdata);

        let userAdventures: Adventure[] = [];
        for (let i = 0; i < adventures.length; i++) {
            if (adventures[i].author === this.id) {
                userAdventures.push(adventures[i]);
            }
        }
        return userAdventures;
    }

    private async createMap() {
        // fill empty object during creation prozess
        let adventure: AdventureModel = {} as any;
        adventure.amountPlayers = 0;
        adventure.amountTurns = 0;
        adventure.author = this.id;

        console.log(chalk.bgBlue('\nArbeitszimmer (Erstelle ein Textadventure)\n'));
        console.log('"So, nichts ist wichter als ein guter Titel. Etwas fabulöses, etwas magisches mit einem Hauch von Abendteuer. Etwas wie: \n Maximus Reise ins Zauberland.\n Maximus 2: Tag der Abrechnung \n Maximus: Der Tollkühneheld \n Maximus: Casino Royal \n Also ich denke du hast ja jetzt schon ein paar gute Ideen"');

        const mapData = await prompts([
            {
                type: 'text',
                name: 'title',
                message: 'Nun was ist dein Titel..." (Abenteuertitle angeben)"',
                validate: title => title == '' ? chalk.red('Du musst einen Title angeben um fortzufahren') : true
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
        adventure.title = mapData.title;
        adventure.mapSizeX = mapData.mapSizeX;
        adventure.mapSizeY = mapData.mapSizeY;
        this.giveStartpoint(adventure);
    }

    private async giveStartpoint(_adventure: AdventureModel) {
        const startConfig = await prompts([
            {
                type: 'number',
                name: 'startpointX',
                min: 1,
                max: _adventure.mapSizeX,
                initial: 1,
                message: 'Nun, wo genau soll die Reise den starten? Gib den X Startpunkt an... (X Startpunkt auf der Karteangeben)"',
            },
            {
                type: 'number',
                name: 'startpointY',
                min: 1,
                max: _adventure.mapSizeY,
                initial: 1,
                message: 'Und wo ist der Y Startpunkt... (Y Startpunkt auf der Karteangeben)"',
            },
        ]);
        _adventure.startpointX = startConfig.startpointX;
        _adventure.startpointY = startConfig.startpointY;
        let field: Field[] = [];
        console.log('"Jetzt lass uns die Felder füllen. Wir fangen an Punkt 1/1 welcher links oben auf der Karte liegt und arbeiten uns zum Punkt rechts Unten durch."')
        this.giveFieldPlaceName(_adventure, 1, 1, field);
    }

    private async giveFieldPlaceName(_adventure: AdventureModel, _currentX: number, _currentY: number, _fieldValues: Field[]){
        const fieldName = await prompts([
            {
                type: 'text',
                name: 'place',
                message: '"Und was ist am Punkt ' + _currentX + '/' + _currentY + ' ... (Ort eingeben)"',
                validate: (value: string) => value === '' ? 'Bitte trage einen Ort ein' : true
            }
        ]);
        let currentField: Field = { xPosition: _currentX, yPosition: _currentY, place: fieldName.place };
        _fieldValues.push(currentField);

        // Loop untill all fields have a description. Go Vertical over x Fields untill end of row, than add +1 to y and start over.
        if (_currentX === _adventure.mapSizeX && _currentY !== _adventure.mapSizeY) {
            this.giveFieldPlaceName(_adventure, 1, _currentY + 1, _fieldValues);
            return _fieldValues;
        } else if (_currentX < _adventure.mapSizeX) {
            this.giveFieldPlaceName(_adventure, _currentX + 1, _currentY, _fieldValues);
            return _fieldValues;
        }
        _adventure.field = _fieldValues;
        this.confirmAction(_adventure);
    }

    private async confirmAction(_adventure: AdventureModel) {
        const confirm = await prompts({
            type: 'toggle',
            name: 'value',
            message: chalk.red('Willst du dieses Textadventure wirklich erstellen?'),
            initial: true,
            active: 'Ja',
            inactive: 'Nein'
        });
        if (confirm.value) {
            let newAdventure: AdventureModel =
            {
                adventureId: this.generateId(), title: _adventure.title, author: _adventure.author, startpointX: _adventure.startpointX,
                startpointY: _adventure.startpointY, amountTurns: _adventure.amountTurns, amountPlayers: _adventure.amountPlayers,
                mapSizeX: _adventure.mapSizeX, mapSizeY: _adventure.mapSizeY, field: _adventure.field
            };

            let adventure = new Adventure(newAdventure);
            adventure.saveToJSON();
        } else {
            console.log(chalk.red('Textadventure wurde verworfen'));
        }
        this.navigateMenu();
    }

    public async saveUserToJSON() {
        // get complete Users Data and add new entry
        let rawdata: any = fs.readFileSync('users.json');
        let users: RegisteredUser[] = JSON.parse(rawdata);

        users.push(this);

        // save to JSON file
        let jsonData = JSON.stringify(users);
        await fsBack.writeFile('users.json', jsonData);
    }

    private generateId(): string {
        return uuidv4();
    }
}