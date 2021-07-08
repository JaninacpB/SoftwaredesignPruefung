import { stringify } from "querystring";

export class RegisteredUser {

    public username: string;
    public password: string;
    public id: number;

    //todo: wenn hier mehr dazu kommt auf Reihenfolge achten, sonst regestieren falsch
    constructor(username: string, password: string, id: number) {
        this.id = id;
        this.username = username;
        this.password = password;
    }

    public navigateMenu() {
    }

    public async saveToJSON() {
        // get complete Users Data and add new entry
        const fs = require('fs');
        let rawdata = fs.readFileSync('users.json');
        let users: RegisteredUser[] = JSON.parse(rawdata);

        this.id = this.generateId(users[users.length - 1].id);
        users.push(this);

        const fsBack = require('fs').promises;

        // save to JSON file
        let jsonData = JSON.stringify(users);
        await fsBack.writeFile('users.json', jsonData);
        // send back
    }

    // todo: useless?
    private generateId(_lastID: number): number {
        return _lastID + 1;
    }
}