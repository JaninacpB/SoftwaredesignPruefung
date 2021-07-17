import wait from 'wait';
import { UnregisteredUser } from './UnregisteredUser';

export class Main {
  public unregisteredUser: UnregisteredUser = new UnregisteredUser();

  constructor() {
    this.startTitle();
  }

  private async startTitle() {
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

    await wait(timeToWait * (maximusArt.length + 1));
    let unregisteredUser = new UnregisteredUser();

    console.log('Willkommen Reisender, ich bin Maximus, der großartige Illusionist und Magier. \n Der Retter der sieben Drachen, Bezwinger der grausamen Könige und- Sag mal, du kommst mir bekannt vor oder etwa nicht?');

    unregisteredUser.menu();
  }

  private async loadAsciiArt(_timeToWaitInMs: number, _asciiArt: string[]) {
    for (let i = 0; i < _asciiArt.length; i++) {
      console.log(_asciiArt[i]);
      await wait(_timeToWaitInMs);
    }
  }

  private async loadAsciiArtRed(_timeToWaitInMs: number, _asciiArt: string[]) {
    const chalk = require('chalk');
    for (let i = 0; i < _asciiArt.length; i++) {
      console.log(chalk.bgRed(_asciiArt[i]));
      await wait(_timeToWaitInMs);
    }
  }
}
new Main();