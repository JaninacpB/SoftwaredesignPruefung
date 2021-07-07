export class UnregisteredUser {
        constructor() {
        }
        public getUserData(): void {
            console.log('Hello World');
            const prompts = require('prompts');
            (async () => {
                const logIn = await prompts([
                    {
                        type: 'text',
                        name: 'name',
                        message: '"Unter welchen Namen kennt man deine Gestalt?"'
                    },
                    {
                        type: 'password',
                        name: 'password',
                        message: '"Schön dich kennenzulernen. Doch sei vorsichtig, Gestaltwandler treiben ihr unwesen. Lass uns ein Codewort vereinbaren, num um sicher zu sein (Password eingeben)"'
                    }
                ]);
                console.log(logIn);
            })();
        }
    }