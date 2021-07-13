import { RegisteredUser } from "./RegisteredUser";
import { User } from "./User";

export class UnregisteredUser extends User {

    constructor() {
        super();
    }

    public getUserData(): void {
        console.log(this.chalk.bgBlue('\nTürschwelle (Sign Up)\n'));
        (async () => {
            const signUp = await this.prompts([
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
            // id will be changed in saveToJSON
            let registeredUser: RegisteredUser = RegisteredUser.getInstance(signUp.username, signUp.password, 0);
            registeredUser.saveUserToJSON();
            registeredUser.navigateMenu();
        })();
    }

    public login(): void {
        console.log(this.chalk.bgBlue('\nTürschwelle (Login)\n'));
        // todo: Implementieren oder weg machen weil komplex? bzw. gleiches Problem wie beim Abendteuer
        console.log(this.chalk.red('**Drücke crt+c um zum Menü zurückzukehren**'));
        (async () => {
            const loginData = await this.prompts([
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
                console.log(this.chalk.red('"Diese Kombination steht nicht in meinem Buch. Nun gut eine Chance gebe ich dir noch...(Username oder Password falsch)"'));
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
        let rawdata = this.fs.readFileSync('users.json');
        let users: RegisteredUser[] = JSON.parse(rawdata);
        return users;
    }

}