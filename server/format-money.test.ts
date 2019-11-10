import 'mocha';
import { expect } from 'chai';
import { FormatMoney } from './format-money';

describe('Format Money', () => {
    it('formats the money to the given currency', () => {
        const formattedMoney = FormatMoney({
            amount: 50,
            currency: 'USD'
        });

        expect(formattedMoney).to.eql('$50.00');
    });
});
