import { Adventure } from "./Adventure";
import { PlayerTextadventure } from "./PlayerTextadventure";
import { PromptChoiceModel } from "./Model/Interface/PromptChoiceModel";
import { AdventureModel } from "./Model/Interface/AdventureModel";
import prompts from "prompts";
import fs from "fs";
import chalk from "chalk";

export class User {

    // _id for identify in ConcretePlayerTextadventure later if registered or not -> used to navigate back to right menu
    public async searchAdventure(_id: string) {
        console.log(chalk.bgBlue('\nTurmzimmer mit großer Aussicht (Suche)\n'));

        let allAdventures: Adventure[] = this.getAdventures();
        let allAdventuresPrompt: PromptChoiceModel[] = this.parseForPrompt(allAdventures);

        // "Fallback" doesnt workt in prompt without require here
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
    }

    public async firstFiveAdventures(_id: string) {
        console.log(chalk.bgBlue('\nBalkon mit überschaubarer Aussicht (Übersicht)\n'));
        let allAdventures: PromptChoiceModel[] = this.parseForPrompt(this.getAdventures());
        this.navigateThroughListOfFive(allAdventures, 1, _id);
    }

    // i counts the loop/rekussion 
    private async navigateThroughListOfFive(_allAdventures: PromptChoiceModel[], i: number, _id: string) {
        let currentAdventure = _allAdventures;
        // if wanted later changed -> also rename Name Methode then
        let amountEntriesShow = 5;
        if (i === 1) {
            currentAdventure = currentAdventure.slice(0, amountEntriesShow);
        } else {
            currentAdventure = _allAdventures.slice(amountEntriesShow * i - amountEntriesShow, amountEntriesShow * i)
        }

        let showMore: PromptChoiceModel = { value: '-1', title: '"Zeig mir mehr!"' };

        if (_allAdventures.length > amountEntriesShow) {
            currentAdventure.push(showMore);
        }

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
        if (userChoiceAdventurePrompt.value === '-1' && _allAdventures.length >= i * amountEntriesShow - amountEntriesShow) {
            console.log('Es gibt mehr Adventure als gerade sichtbar');
            console.log('Länge Anzahl Abentuer: ' + _allAdventures.length);

            this.navigateThroughListOfFive(_allAdventures, i, _id);
        }
        else if (userChoiceAdventurePrompt.value === '-1') {
            console.log(chalk.red('"Tut mir Leid, mehr gibt es hier nicht zu sehen, suche bitte eines aus der Liste aus..."'));
            this.navigateThroughListOfFive(_allAdventures, 1, _id);
        } else {
            // get Adventures not prompt Interface & use Factory 
            let adventures = this.getAdventures();
            let userChoiceAdventure: AdventureModel | undefined = adventures.find(adventure => adventure.adventureId === userChoiceAdventurePrompt.value);
            let playerFactroy: PlayerTextadventure = new PlayerTextadventure();
            let player = playerFactroy.createPlayer();
            player.id = _id;
            player.playAdventure(userChoiceAdventure);
        }
    }

    private parseForPrompt(_allAdventures: Adventure[]): PromptChoiceModel[] {
        let promptAdventureTitles: PromptChoiceModel[] = [];

        for (let i = 0; i < _allAdventures.length; i++) {
            // with Size of Map
            let adventureTitle: string = _allAdventures[i].title + '(' + (_allAdventures[i].mapSizeX * _allAdventures[i].mapSizeY) + ' Felder groß)';
            let choice: PromptChoiceModel = { value: _allAdventures[i].adventureId, title: adventureTitle };
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