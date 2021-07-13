import { describe } from 'mocha';
import { expect } from 'chai';
import { UnregisteredUser } from '../UnregisteredUser';

let unregisteredUser = new UnregisteredUser();
describe('Test "CheckUsername"', () => {
    it('Return true for "Anna"', () => {
        const result = unregisteredUser.checkUsername('Anna');
        expect(result).to.be.true;
    });

    it('Return false for "$Money"', () => {
        const result = unregisteredUser.checkUsername('$Money');
        expect(result).to.be.false;
    });

    it('Return true for "Anna1234"', () => {
        const res = unregisteredUser.checkUsername('Anna1234'); 
        expect(res).to.be.true;
    });
    it('Return true for "1234"', () => {
        const res = unregisteredUser.checkUsername('1234');
        expect(res).to.be.true;
    });
});