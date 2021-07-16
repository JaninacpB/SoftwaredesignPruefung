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
    unregisteredUser.menu();
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