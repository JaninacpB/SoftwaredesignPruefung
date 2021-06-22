import fetch from 'node-fetch';
import wait from 'wait';
//import fetch from 'node-fetch';

namespace Adventuria {

  class Main {
    constructor() {
      this.startMenu();
      this.getJsonFile();
    }

    getJsonFile() {

      let ja = fetch('Adventure.json')
      .then(function(response){
        console.log(response);
        return response.json;
      })

      console.log(ja);

    }

    async startMenu() {
      let adventuriaArt = ["_____   _             _           _               ____      _        _____        _      _____   _             _               ",
        "|  _  |_| |_ _ ___ ___| |_ _ _ ___|_|___    ___   |    \\ ___|_|___   |_   ____ _ _| |_   |  _  |_| |_ _ ___ ___| |_ _ _ ___ ___ ",
        "|     | . | | | -_|   |  _| | |  _| | .'|  |___|  |  |  | -_| |   |    | || -_|_'_|  _|  |     | . | | | -_|   |  _| | |  _| -_|",
        "|__|__|___|\\_/|___|_|_|_| |___|_| |_|__,|         |____/|___|_|_|_|    |_||___|_,_|_|    |__|__|___|\\_/|___|_|_|_| |___|_| |___|"]

      let maximusArt = ["                    ____ ",
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
        "            /   .     .   \\"];
      let timeToWait = 200;
      this.loadAsciiArt(timeToWait, adventuriaArt);
      await wait(timeToWait * (adventuriaArt.length + 1));
      this.loadAsciiArt(timeToWait, maximusArt);

      const prompts = require('prompts');
      await wait(timeToWait * (maximusArt.length + 1));
      (async () => {
        const startScreen = await prompts([
          {
            type: 'select',
            name: 'value',
            message: '"Willkommen Reisender, ich bin Maximus, der großartige Illusionist und Magier. Der Retter der sieben Drachen, bezwinger der grausamen Könige und- Sag mal, du kommst mir bekannt vor oder etwa nicht?"',
            choices: [
              { title: '"Ja, unsere Wege trafen sich bereits..." (Log In)', value: '0' },
              { title: '"Nein, du musst mich verwechseln, aber lass mich kurz vorstellen..." (Sign Up)', value: '1' },
              { title: '"Nein."(Ohne Anmeldung weitergehen)', value: '2' }
            ],
            initial: 0
          }

        ]);

        console.log(startScreen);
        // if()/switchcase  //Abfrage, was ausgewählt wurde
      })();
    }

    async loadAsciiArt(timeToWaitInMs: number, asciiArt: string[]) {
      for (let i = 0; i < asciiArt.length; i++) {
        console.log(asciiArt[i]);
        await wait(timeToWaitInMs);
      }
    }

  }
  new Main();
}