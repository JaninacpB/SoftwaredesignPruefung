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
        let start: Field = this.getcurrentField(_adventure.startpointX, _adventure.startpointY, _adventure.field);
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
                    { title: 'Norden', value: 0 },
                    { title: 'Osten', value: 1 },
                    { title: 'Süden', value: 2 },
                    { title: 'Westen', value: 3},
                    { title: 'Spiel beenden', value: -1}
                ],
                initial: 0
            }
        ]);
        if (this.checkIfEnd(_adventure, _x, _y, userChoiceMove.value)) {
            // todo: nicht value sondern richtige Richtung
            console.log('Du kannst nicht nach ' + userChoiceMove.value + ' gehen. Wähle einen anderen Weg.');
            this.goOverMap(_x, _y, _adventure);
        } else if (userChoiceMove.value !== -1) {
            _x = this.changeX(_x, userChoiceMove.value);
            _y = this.changeY(_y, userChoiceMove.value);
            this.amountTurns = + 1;
            let field = this.getcurrentField(_x, _y, _adventure.field);
            //todo: Went North...
            console.log('Du bist nacht ____ gegangen und jetzt hier: ' + field.place);
            this.goOverMap(_x, _y, _adventure);
        }
        // turns speichern
    }

    // only change if W or O
    private changeX(_x: number, _nextMoveOrientation: number): number {
        switch (_nextMoveOrientation) {
            case 1: {
                return _x + 1;
            }
            case 3: {
                return _x - 1;
            }
        }
        return _x;
    }

    private changeY(_y: number, _nextMoveOrientation: number): number {
        switch (_nextMoveOrientation) {
            case 0: {
                return _y - 1;
            }
            case 2: {
                return _y + 1;
            }
        }
        return _y;
    }

    private checkIfEnd(_adventure: Adventure, _x: number, _y: number, _nextMoveOrientation: number): boolean {
        let isNotOnTheMap = false;
        switch (_nextMoveOrientation) {
            case 0: {
                if (0 >= _y - 1) {
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
                if (0 <= _x - 1) {
                    isNotOnTheMap = true;
                }
                break;
            }
        }
        return isNotOnTheMap;
    }

    private getcurrentField(_x: number, _y: number, _allFields: Field[]): Field {
        let currentField: Field = _allFields.filter(field => field.xPosition === _x && field.yPosition === _y)[0];
        return currentField;
    }
}