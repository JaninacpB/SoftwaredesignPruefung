import wait from 'wait';
import { UnregisteredUser } from './UnregisteredUser';

class Main {
  public unregisteredUser: UnregisteredUser = new UnregisteredUser();

  constructor() {
    this.startMenu();
  }

  private async startMenu() {
    let adventuriaArt = [
      " _____   _             _           _               ____      _        _____        _      _____   _             _               ",
      "|  _  |_| |_ _ ___ ___| |_ _ _ ___|_|___    ___   |    \\ ___|_|___   |_   ____ _ _| |_   |  _  |_| |_ _ ___ ___| |_ _ _ ___ ___ ",
      "|     | . | | | -_|   |  _| | |  _| | .'|  |___|  |  |  | -_| |   |    | || -_|_'_|  _|  |     | . | | | -_|   |  _| | |  _| -_|",
      "|__|__|___|\\_/|___|_|_|_| |___|_| |_|__,|         |____/|___|_|_|_|    |_||___|_,_|_|    |__|__|___|\\_/|___|_|_|_| |___|_| |___|",
      "                                                                                                                                "
    ]

    let maximusArt = [
      "                    ____ ",
      "                  .'* *.'",
      "               __/_*_*(_",
      "              / _______ \\",
      "             _\\_)/___\\(_/_ ",
      "            / _((\\- -/))_ \\",
      "            \\ \\())(-)(()/ /",
      "             ' \\(((()))/ '",
      "            / ' \\)).))/ ' \\",
      "           / _ \\ - | - /_  \\",
      "          (   ( .;''';. .'  )",
      "          _\\ __ /    )\\ __ /_",
      "            \\/  \   ' /  \\/",
      "             .'  '...' ' )",
      "              / /  |  \\ \\",
      "             / .   .   . \\",
      "            /   .     .   \\"
    ];
    let timeToWait = 200;
    this.loadAsciiArtRed(timeToWait, adventuriaArt);
    await wait(timeToWait * (adventuriaArt.length + 1));
    this.loadAsciiArt(timeToWait, maximusArt);

    const prompts = require('prompts');
    await wait(timeToWait * (maximusArt.length + 1));
    (async () => {
      const startScreen = await prompts([
        {
          type: 'select',
          name: 'value',
          message: '"Willkommen Reisender, ich bin Maximus, der großartige Illusionist und Magier. \n Der Retter der sieben Drachen, bezwinger der grausamen Könige und- Sag mal, du kommst mir bekannt vor oder etwa nicht?"',
          choices: [
            { title: '"Ja, unsere Wege trafen sich bereits..." (Log In)', value: '0' },
            { title: '"Nein, du musst mich verwechseln, aber lass mich kurz vorstellen..." (Sign Up)', value: '1' },
            { title: '"Diese Bücher, die du bei dir trägst, welche Geschichten enthalten sie... (Übersicht aller Abendteuer anzeigen)"', value: '2' },
            { title: '"Gut ein anderes Gesicht zu sehen. Ich bin auf der Suche nach einer ganz bestimmten Geschichte... (Nach Abendteuer suchen)"', value: '3' }
          ],
          initial: 0
        }
      ]);
      switch (startScreen.value) {
        case '0':
          this.unregisteredUser.login();
          break;
        case '1':
          this.unregisteredUser.getUserData();
          break;
        case '2':
          break
      }
    })();
  }
  async loadAsciiArt(timeToWaitInMs: number, asciiArt: string[]) {
    for (let i = 0; i < asciiArt.length; i++) {
      console.log(asciiArt[i]);
      await wait(timeToWaitInMs);
    }
  }

  async loadAsciiArtRed(timeToWaitInMs: number, asciiArt: string[]) {
    const chalk = require('chalk');
    for (let i = 0; i < asciiArt.length; i++) {
      console.log(chalk.bgRed(asciiArt[i]));
      await wait(timeToWaitInMs);
    }
  }
}
new Main();