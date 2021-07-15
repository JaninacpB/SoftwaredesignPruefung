import { RegisteredUser } from "./RegisteredUser";
import { User } from "./User";
import { v4 as uuidv4 } from "uuid";
import chalk from "chalk";
import prompts from "prompts";
import fs from "fs";

export class UnregisteredUser extends User {

    constructor() {
        super();
    }

    public menu() {
        (async () => {
          const startScreen = await prompts([
            {
              type: 'select',
              name: 'value',
              message: '"Willkommen Reisender, ich bin Maximus, der großartige Illusionist und Magier. \n Der Retter der sieben Drachen, bezwinger der grausamen Könige und- Sag mal, du kommst mir bekannt vor oder etwa nicht?"',
              choices: [
                { title: '"Ja, unsere Wege trafen sich bereits..." (Log In)', value: 0 },
                { title: '"Nein, du musst mich verwechseln, aber lass mich kurz vorstellen..." (Sign Up)', value: 1 },
                { title: '"Diese Bücher, die du bei dir trägst, welche Geschichten enthalten sie... (Übersicht von Abenteuern anzeigen)"', value: 2 },
                { title: '"Gut ein anderes Gesicht zu sehen. Ich bin auf der Suche nach einer ganz bestimmten Geschichte... (Nach Abenteuer suchen)"', value: 3 },
                { title: chalk.red('"Es wird Zeit, dass unsere Wege sich wieder trenne... (Programm beenden)"'), value: 4 }
              ],
              initial: 0
            }
          ]);
          switch (startScreen.value) {
            case 0:
              this.login();
              break;
            case 1:
              this.getUserData();
              break;
            case 2:
              this.firstFiveAdventures();
              break
            case 3:
              this.searchAdventure('');
              break;
          }
        })();
      }

    public getUserData(): void {
        console.log(chalk.bgBlue('\nTürschwelle (Sign Up)\n'));
        (async () => {
            const signUp = await prompts([
                {
                    type: 'text',
                    name: 'username',
                    message: '"Unter welchen Namen kennt man deine Gestalt?"',
                    // note: no \n in error message or bug
                    validate: (value: string) => this.checkUsername(value) ? true :
                        "Oh verzeih mir, aber ich kann leider nur Alphanumerische Werte mit dieser Feder schreiben, bitte versuch es noch einmal (Korrigiere Eingabe so, dass nur a-z und Zahlen im Nutzernmane stehen, keine doppelten Usernames erlaubt)"
                },
                {
                    type: 'password',
                    name: 'password',
                    message: '"Schön dich kennenzulernen. Doch sei vorsichtig, Gestaltwandler treiben ihr unwesen. \n Lass uns ein Codewort vereinbaren, nur um sicher zu sein (Password eingeben)"'
                }
            ]);
            // todo: weiternavigieren
            let registeredUser: RegisteredUser = RegisteredUser.getInstance(signUp.username, signUp.password, this.generateId());
            registeredUser.saveUserToJSON();
            registeredUser.navigateMenu();
        })();
    }

    public login(): void {
        console.log(chalk.bgBlue('\nTürschwelle (Login)\n'));
        // todo: Implementieren oder weg machen weil komplex? bzw. gleiches Problem wie beim Abendteuer
        console.log(chalk.red('**Drücke crt+c um zum Menü zurückzukehren**'));
        (async () => {
            const loginData = await prompts([
                {
                    type: 'text',
                    name: 'username',
                    message: '"Und wie lautet dein Name noch einmal... (Username eingeben)"'
                },
                {
                    type: 'password',
                    name: 'password',
                    message: '"Um sicher zu sein, kennst du noch unser geheimes Codewort... \n  (Password eingeben)"'
                }
            ]);
            let user = this.getUserIfExist(loginData)
            if (user!== null) {
                let registeredUser: RegisteredUser = RegisteredUser.getInstance(user.username, user.password, user.id);
                registeredUser.navigateMenu();
            } else {
                console.log(chalk.red('"Diese Kombination steht nicht in meinem Buch. Nun gut eine Chance gebe ich dir noch...(Username oder Password falsch)"'));
                this.login();
            }
        })();
    }

    // const onCancel = prompt => {
    //     console.log('Test');
    //     return true; };
    // const response = await prompt(this.prompts, {onCancel});

    // for unittest public 
    public checkUsername(_username: string): boolean {
        let valid = false;
        // Alphanumeric check
        if (_username.match('^[a-zA-Z0-9]*$') != null) {
            valid = true;
        } else {
            return valid;
        }
        // check if Username already exists 
        let users = this.getJSONData();

        for (let i = 0; i < users.length; i++) {
            if (users[i].username === _username) {
                return false;
            }
        }
        return valid;
    }

    // return null if not exist, return user if exist 
    private getUserIfExist(_userInput: any): any {
        let users = this.getJSONData();
        for (let i = 0; i < users.length; i++) {
            if (users[i].username === _userInput.username && users[i].password == _userInput.password) {
                return users[i];
            }
        }
        return null;
    }

    private getJSONData(): RegisteredUser[] {
        let rawdata: any = fs.readFileSync('users.json');
        let users: RegisteredUser[] = JSON.parse(rawdata);
        return users;
    }

    private generateId(): string {
        return uuidv4();
    }
}