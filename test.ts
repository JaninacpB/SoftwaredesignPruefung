import { resolve } from "path/posix";
import prompts from "prompts";

// Alternative -> Player optinale variable geben mit id etc. und einfach wieder aufrufen wenn exestiert sonst was anderes

class Test {

    constructor() {
        this.aufruf();
    }

    aufruf(): void {
        console.log('Test');
        const test = new Promise((resolve, reject) => {
           // resolve()
        })
        this.zweiteFunction().then(value => {
            console.log('Meth 1');
            console.log(value);
            resolve('TEST');
        })
    }

    // async ersteFunktion(): Promise<boolean> {
    //     this.zweiteFunction().then(value => {
    //         if(value) {
    //             return true;
    //         }
    //     })
    //     return false;
    // }

    async zweiteFunction(): Promise<boolean> {
        await this.dritteFunction().then(value => {
                console.log('Meth 2');
                console.log(value);
                resolve('TEST');
                return true;      
        })
        return false;
    }

    async dritteFunction(): Promise<boolean> {
        const response = await prompts({
            type: 'confirm',
            name: 'value',
            message: 'How old are you?',
            initial: true
        });
        return response.value;
    }
}
new Test();