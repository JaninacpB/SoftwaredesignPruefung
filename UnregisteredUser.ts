import { RegisteredUser } from "./RegisteredUser";

export class UnregisteredUser {
    constructor() {
    }
    public getUserData(): void {
        const chalk = require('chalk');
        console.log(chalk.bgBlue('\n Türschwelle (Sign Up) \n'));
        const prompts = require('prompts');
        (async () => {
            const logIn = await prompts([
                {
                    type: 'text',
                    name: 'username',
                    message: '"Unter welchen Namen kennt man deine Gestalt?"',
                    // todo: Username exist and is not valid different message
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
            // todo: User speichern und weiternavigieren
            // id will be changed in saveToJSON
            let registeredUser: RegisteredUser = new RegisteredUser(logIn.username, logIn.password, 0);
            registeredUser.saveToJSON();
            registeredUser.navigateMenu();
        })();
    }

    public checkUsername(_username: string): boolean {
        let valid = false;
        // Alphanumeric check
        if (_username.match('^[a-zA-Z0-9]*$') != null) {
            valid = true;
        } else {
            return valid;
        }
        // check if Username already exists 
        const fs = require('fs');
        let rawdata = fs.readFileSync('users.json');
        let users: RegisteredUser[] = JSON.parse(rawdata);

        for (let i = 0; i < users.length; i++) {
            if (users[i].username === _username) {
                return false;
            }
        }
        return valid;
    }
}