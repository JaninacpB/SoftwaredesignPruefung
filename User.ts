import { Adventure } from "./Adventure";
import { PlayerTextadventure } from "./PlayerTextadventure";
import { PromptChoice } from "./PromptChoice";
import prompts from "prompts";
import fs from "fs";
import chalk from "chalk";

export class User {

    // id to identify in ConcretePlayerTextadventure later if registered or not
    public async searchAdventure(_id: string){
        console.log(chalk.bgBlue('\nTurmzimmer mit großer Aussicht (Suche)\n'));
        // für Prompt vorbereiten
        let allAdventures: Adventure[] = this.getAdventures();
        let allAdventuresPrompt: PromptChoice[] = this.parseForPrompt(allAdventures);

        // Fallback doesnt workt without require here
        const prompts = require('prompts');

        const userChoiceId = await prompts([
            {
                type: 'autocomplete',
                limit: 3,
                name: 'value',
                message: '"Gebe ein, was du erleben willst..."',
                choices: allAdventuresPrompt,
                fallback: '"Es tut mir Leid, diese Geschichte ist mir nicht bekannt."',
                initial: 0
            }
        ]);

        // get Adventure Type
        let userChoiceAdventure: Adventure | undefined = allAdventures.find(adventure => adventure.adventureId === userChoiceId.value);
        let playerFactroy: PlayerTextadventure = new PlayerTextadventure();
        let player = playerFactroy.createPlayer();
        player.id = _id;
        player.playAdventure(userChoiceAdventure);
        // todo: Jetzt? irgendwie zurück
    }

    public async firstFiveAdventures() {
        console.log(chalk.bgBlue('\nBalkon mit überschaubarer Aussicht (Übersicht)\n'));
        let allAdventures: PromptChoice[] = this.parseForPrompt(this.getAdventures());
        this.navigateThroughList(allAdventures, 1);
    }

    // i counts the loop/rekussion 
    private async navigateThroughList(_allAdventures: PromptChoice[], i: number) {
        let currentAdventure = _allAdventures;
        if (i === 1) {
            currentAdventure = currentAdventure.slice(0, 5);
        } else {
            currentAdventure = _allAdventures.slice(5 * i - 5, 5 * i)
        }

        let showMore: PromptChoice = { value: '-1', title: '"Zeig mir mehr!"' };
        currentAdventure.push(showMore);

        const userChoiceAdventurePrompt = await prompts([
            {
                type: 'select',
                name: 'value',
                message: '"Hier eine Auswahl meiner feinsten Geschichte: "',
                choices: currentAdventure,
                initial: 0
            }
        ]);
        i = i + 1;
        if (userChoiceAdventurePrompt.value === '-1' && _allAdventures.length >= i * 5 - 5) {
            this.navigateThroughList(_allAdventures, i);
        } else if (userChoiceAdventurePrompt.value === '-1') {
            console.log(chalk.red('"Tut mir Leid, mehr gibt es hier nicht zu sehen, suche bitte eines aus der Liste aus..."'));
            this.navigateThroughList(_allAdventures, 1);
        } else {
            // get Adventures not prompt Interface & use Factory 
            let adventures = this.getAdventures();
            let userChoiceAdventure: Adventure | undefined = adventures.find(adventure => adventure.adventureId === userChoiceAdventurePrompt.value);
            let playerFactroy: PlayerTextadventure = new PlayerTextadventure();
            let player = playerFactroy.createPlayer();
            player.playAdventure(userChoiceAdventure);
            //todo: irgendwie zurück
        }
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
        let rawdata: any = fs.readFileSync('adventure.json');
        let adventures: Adventure[] = JSON.parse(rawdata);
        return adventures;
    }
}