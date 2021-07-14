import { GeneralPlayer } from "./GeneralPlayer";
import { Adventure } from "./Adventure";
import chalk from "chalk";
import prompts from "prompts";
import { Field } from "./Field";

export class ConcretePlayerTextadventure implements GeneralPlayer {

    public amountTurns = 0;

    public async playAdventure(_adventure: Adventure) {
        console.log('\n' + chalk.bgBlue(_adventure.title) + '\n');
        // Erster Feld 
        let start: Field = this.getStartField(_adventure.startpointX, _adventure.startpointY, _adventure.field);
        console.log('Du startest deine Reise hier: ' + start.place);
        this.goOverMap(start.xPosition, start.yPosition, _adventure);
        // Schließen + Eintragen Turns!
    }

    private async goOverMap(_x: number, _y: number, _adventure: Adventure) {
        const userChoiceMove = await prompts([
            {
                type: 'select',
                name: 'value',
                message: 'Gehe nach: ',
                choices: [
                    { title: 'Norden', value: '0' },
                    { title: 'Osten', value: '1', },
                    { title: 'Süden', value: '2' },
                    { title: 'Westen', value: '3' },
                    { title: 'Spiel beenden', value: '-1' }
                ],
                initial: 0
            }
        ]);
        if (this.checkIfEnd(_adventure, _x, _y, userChoiceMove.value)) {
            console.log('Du kannst nicht nach ' + userChoiceMove + ' gehen');
        } else if(userChoiceMove.value !== -1) {
            //todo: change x or y
            this.amountTurns =+ 1;
            //todo: Ort ausgeben
            this.goOverMap(_x, _y, _adventure);
        }
        // turns speichern
    }

    private checkIfEnd(_adventure: Adventure, _x: number, _y: number, _nextMoveOrientation: number): boolean {
        let isNotOnTheMap = false;
        switch (_nextMoveOrientation) {
            case 0: {
                if (0 > _y - 1) {
                    isNotOnTheMap = true;
                }
                break;
            }
            case 1: {
                if (_adventure.mapSizeX < _x + 1) {
                    isNotOnTheMap = true;
                }
                break;
            }
            case 2: {
                if (_adventure.mapSizeY < _y + 1) {
                    isNotOnTheMap = true;
                }
                break;
            }
            case 3: {
                if (0 < _x - 1) {
                    isNotOnTheMap = true;
                }
                break;
            }
        }
        return isNotOnTheMap;
    }

    private getStartField(_x: number, _y: number, _allFields: Field[]): Field {
        let currentField: Field = _allFields.filter(field => field.xPosition === _x && field.yPosition === _y)[0];
        return currentField;
    }
}