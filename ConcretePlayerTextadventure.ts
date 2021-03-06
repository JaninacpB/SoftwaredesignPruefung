import { GeneralPlayerModel } from "./Model/Interface/GeneralPlayerModel";
import { RegisteredUser } from "./RegisteredUser";
import { UnregisteredUser } from "./UnregisteredUser";
import { AdventureModel } from "./Model/Interface/AdventureModel";
import { FieldModel } from "./Model/Interface/FieldModel";
import { Direction } from "./Model/Interface/Direction";
import chalk from "chalk";
import prompts from "prompts";
import fs from "fs";
import fsBack from "fs/promises";
import figlet from "figlet";

export class ConcretePlayerTextadventure implements GeneralPlayerModel {

    public amountTurns = 0;
    public id = '';

    public async playAdventure(_adventure: AdventureModel) {
        console.log('\n' + chalk.bgBlue(_adventure.title) + '\n');

        figlet(_adventure.title, (err, data) => {
            if (err) {
                console.log(chalk.bgBlue(_adventure.title));
            }
            console.log(chalk.cyan(data));
            // first Field
            let start: FieldModel = this.getcurrentField(_adventure.startpointX, _adventure.startpointY, _adventure.field);
            console.log('Du startest deine Reise hier: ' + chalk.green(start.place));
            this.goOverMap(start.xPosition, start.yPosition, _adventure);
        });
    }

    private async goOverMap(_x: number, _y: number, _adventure: AdventureModel) {
        const userChoiceMove = await prompts([
            {
                type: 'select',
                name: 'value',
                message: 'Gehe nach: ',
                choices: [
                    { title: 'Norden', value: Direction.North },
                    { title: 'Osten', value: Direction.East },
                    { title: 'Süden', value: Direction.South },
                    { title: 'Westen', value: Direction.West },
                    { title: chalk.red('Spiel beenden'), value: Direction.Cancel }
                ],
                initial: 0
            }
        ]);
        if (this.checkIfEnd(_adventure, _x, _y, userChoiceMove.value)) {
            console.log(chalk.redBright('Du kannst nicht nach ' + chalk.underline(this.userDirectionChoice(userChoiceMove.value)) + ' gehen. Wähle einen anderen Weg.'));
            this.goOverMap(_x, _y, _adventure);
        } else if (userChoiceMove.value !== Direction.Cancel) {
            this.amountTurns += 1;

            _x = this.changeX(_x, userChoiceMove.value);
            _y = this.changeY(_y, userChoiceMove.value);

            let field = this.getcurrentField(_x, _y, _adventure.field);

            console.log('Du bist nach ' + chalk.green(this.userDirectionChoice(userChoiceMove.value)) + ' gegangen und bist jetzt hier: ' + chalk.green(field.place));
            this.goOverMap(_x, _y, _adventure);
        } else {
            this.saveToAdventureStatisticJSON(_adventure.adventureId);

            if (this.id !== '') {
                let user: RegisteredUser = this.getUserFromId();
                user.menu();
            } else {
                let unregisteredUser = new UnregisteredUser();
                unregisteredUser.menu();
            }
        }
    }

    // registered and unregsitered User can play with this methode, but after playing need way to go back to own menu
    private getUserFromId(): RegisteredUser {
        let rawdata: any = fs.readFileSync('users.json');
        let users: RegisteredUser[] = JSON.parse(rawdata);
        let currentUser: RegisteredUser = RegisteredUser.getInstance('', '', '');
        for (let i = 0; i < users.length; i++) {
            if (users[i].id === this.id) {
                currentUser.id = users[i].id
                currentUser.password = users[i].password;
                currentUser.username = users[i].username;
            }
        }
        return currentUser;
    }

    private async saveToAdventureStatisticJSON(_id: string) {
        let rawdata: any = fs.readFileSync('adventure.json');
        let adventures: AdventureModel[] = JSON.parse(rawdata);

        for (let i = 0; i < adventures.length; i++) {
            if (adventures[i].adventureId === _id) {
                adventures[i].amountPlayers += 1;
                adventures[i].amountTurns += this.amountTurns;
            }
        }
        let jsonData = JSON.stringify(adventures);
        await fsBack.writeFile('adventure.json', jsonData);
    }

    private userDirectionChoice(_direction: Direction): string {
        switch (_direction) {
            case Direction.North:
                return 'Norden';
            case Direction.East:
                return 'Osten';
            case Direction.South:
                return 'Süden'
        }
        return 'Westen';
    }

    // only change if W or O Orientation 
    private changeX(_x: number, _nextMoveDirection: Direction): number {
        switch (_nextMoveDirection) {
            case Direction.East:
                return _x + 1;
            case Direction.West:
                return _x - 1;
        }
        return _x;
    }

    private changeY(_y: number, _nextMoveDirection: Direction): number {
        switch (_nextMoveDirection) {
            case Direction.North:
                return _y - 1;
            case Direction.South:
                return _y + 1;
        }
        return _y;
    }

    private checkIfEnd(_adventure: AdventureModel, _x: number, _y: number, _nextMoveDirection: Direction): boolean {
        let isNotOnTheMap = false;
        switch (_nextMoveDirection) {
            case Direction.North:
                if (0 >= _y - 1) {
                    isNotOnTheMap = true;
                }
                break;
            case Direction.East:
                if (_adventure.mapSizeX < _x + 1) {
                    isNotOnTheMap = true;
                }
                break;
            case Direction.South:
                if (_adventure.mapSizeY < _y + 1) {
                    isNotOnTheMap = true;
                }
                break;
            case Direction.West:
                if (0 >= _x - 1) {
                    isNotOnTheMap = true;
                }
                break;
        }
        return isNotOnTheMap;
    }

    private getcurrentField(_x: number, _y: number, _allFields: FieldModel[]): FieldModel {
        let currentField: FieldModel = _allFields.filter(field => field.xPosition === _x && field.yPosition === _y)[0];
        return currentField;
    }
}