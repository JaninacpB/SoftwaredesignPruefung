import { GeneralPlayer } from "./GeneralPlayer";
import { Adventure } from "./Adventure";
import chalk from "chalk";
import prompts from "prompts";
import { Field } from "./Field";
import { Direction } from "./Direction";
import fs from "fs";
import fsBack from "fs/promises";

export class ConcretePlayerTextadventure implements GeneralPlayer {

    public amountTurns = 0;

    public async playAdventure(_adventure: Adventure) {
        console.log('\n' + chalk.bgBlue(_adventure.title) + '\n');
        // Erstes Feld 
        let start: Field = this.getcurrentField(_adventure.startpointX, _adventure.startpointY, _adventure.field);
        console.log('Du startest deine Reise hier: ' + chalk.green(start.place));
        this.goOverMap(start.xPosition, start.yPosition, _adventure);
    }

    private async goOverMap(_x: number, _y: number, _adventure: Adventure) {
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
            this.saveToAdventureStatistikJSON(_adventure.adventureId);
            //todo: back To Menü pedending that 
        }
    }

    private async saveToAdventureStatistikJSON(_id: number) {
        // Get Advenutre
        let rawdata: any = fs.readFileSync('adventure.json');
        let adventures: Adventure[] = JSON.parse(rawdata);

        for (let i = 0; i < adventures.length; i++) {
            if(adventures[i].adventureId === _id) {
                adventures[i].amountPlayers += 1;
                adventures[i].amountTurns += this.amountTurns;
            }
        } 
        let jsonData = JSON.stringify(adventures);
        await fsBack.writeFile('adventure.json', jsonData);
    }

    private userDirectionChoice(direction: Direction): string {
        switch (direction) {
            case Direction.North:
                return 'Norden';
            case Direction.East:
                return 'Osten';
            case Direction.South:
                return 'Süden'
        }
        return 'Westen';
    }

    // only change if W or O Oritention 
    private changeX(_x: number, _nextMoveOrientation: Direction): number {
        switch (_nextMoveOrientation) {
            case Direction.East:
                return _x + 1;
            case Direction.West: 
                return _x - 1;
        }
        return _x;
    }

    private changeY(_y: number, _nextMoveOrientation: Direction): number {
        switch (_nextMoveOrientation) {
            case Direction.North:
                return _y - 1;
            case Direction.South:
                return _y + 1;
        }
        return _y;
    }

    private checkIfEnd(_adventure: Adventure, _x: number, _y: number, _nextMoveOrientation: Direction): boolean {
        let isNotOnTheMap = false;
        switch (_nextMoveOrientation) {
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
                if (0 <= _x - 1) {
                    isNotOnTheMap = true;
                }
                break;
        }
        return isNotOnTheMap;
    }

    private getcurrentField(_x: number, _y: number, _allFields: Field[]): Field {
        let currentField: Field = _allFields.filter(field => field.xPosition === _x && field.yPosition === _y)[0];
        return currentField;
    }
}