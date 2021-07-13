import { Adventure } from "./Adventure";
import { PromptChoice } from "./PromptChoice";

export class User {
    public fs = require('fs');
    public prompts = require('prompts');
    public chalk = require('chalk');
    public fsBack = require('fs').promises;

    public searchAdventure() {
        console.log(this.chalk.bgBlue('\nTurmzimmer mit großer Aussicht (Suche)\n'));
        // für Prompt vorbereiten
        let allAdventures: PromptChoice[] = this.parseForPrompt(this.getAdventures());

        (async () => {
            const userChoiceAdventure = await this.prompts([
                {
                    type: 'autocomplete',
                    limit: 3,
                    name: 'value',
                    fallback: '"Es tut mir Leid, diese Geschichte ist mir nicht bekannt."',
                    message: '"Gebe ein, was du erleben willst..."',
                    choices: allAdventures,
                    initial: 0
                }
            ]); 
            // todo: New Player
        })();
    }

    public async firstFiveAdventures() {
        console.log(this.chalk.bgBlue('\nBalkon mit überschaubarer Aussicht (Übersicht)\n'));
        let allAdventures: PromptChoice[] = this.parseForPrompt(this.getAdventures());
        this.navigateThroughList(allAdventures, 1);
    }

    // i counts the loop/rekussion 
    private async navigateThroughList(_allAdventures: PromptChoice[], i: number) {
        let currentAdventure = _allAdventures;
        if (i === 1) {
            console.log('HIER');
            currentAdventure = currentAdventure.slice(0, 5);
        } else {
            currentAdventure = _allAdventures.slice(5 * i - 5, 5 * i)
        }

        let showMore: PromptChoice = { value: -1, title: '"Zeig mir mehr!"' };
        currentAdventure.push(showMore);

        const userChoiceAdventure = await this.prompts([
            {
                type: 'select',
                name: 'value',
                message: '"Hier eine Auswahl meiner feinsten Geschichte: "',
                choices: currentAdventure,
                initial: 0
            }
        ]);
        i = i + 1;
        if (userChoiceAdventure.value === -1 && _allAdventures.length >= i * 5 - 5) {
            this.navigateThroughList(_allAdventures, i);
        } else if (userChoiceAdventure.value === -1) {
            console.log(this.chalk.red('"Tut mir Leid, mehr gibt es hier nicht zu sehen, suche bitte eines aus der Liste aus..."'));
            this.navigateThroughList(_allAdventures, 1);
        }
        // todo: new Player 
    }

    private parseForPrompt(_allAdventures: Adventure[]): PromptChoice[] {
        let promptAdventureTitles: PromptChoice[] = [];

        for (let i = 0; i < _allAdventures.length; i++) {
            // with Size of Map
            let adventureTitle: string = _allAdventures[i].title + '(' + (_allAdventures[i].mapSizeX * _allAdventures[i].mapSizeY) + ' Felder groß)';
            let choice: PromptChoice = { value: _allAdventures[i].adventureId, title: adventureTitle };
            promptAdventureTitles.push(choice);
        }
        return promptAdventureTitles;
    }

    private getAdventures(): Adventure[] {
        let rawdata = this.fs.readFileSync('adventure.json');
        let adventures: Adventure[] = JSON.parse(rawdata);
        return adventures;
    }
}