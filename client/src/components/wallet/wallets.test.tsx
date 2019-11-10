import * as React from 'react';
import { shallow } from 'enzyme';
import * as sinon from 'sinon';
import { Wallets } from './wallets';
import * as assert from 'assert';

const props = {
    wallets: [{
        currency: 'USD',
        balance: 50
    }, {
        currency: 'EUR',
        balance: 140
    }, {
        currency: 'GBP',
        balance: 150
    }]
};

describe('Wallets', () => {
    it('renders as many wallet components as there are', () => {
        const tree = shallow(<Wallets {...props}/>);

        assert.equal(tree.find('[data-id="wallet"]').length, 3);
    });
});
