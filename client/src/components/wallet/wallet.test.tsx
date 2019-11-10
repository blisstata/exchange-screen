import * as React from 'react';
import { shallow } from 'enzyme';
import { Wallet } from './wallet';
import * as assert from 'assert';

const props = {
    baseCurrency: 'USD',
    formattedMoney: '50$'
};

describe('Wallet', () => {
    it('renders a card', () => {
        const tree = shallow(<Wallet {...props}/>);

        assert.equal(tree.find('.Revolut__wallets-card').length, 1);
    });

    it('renders a balance', () => {
        const tree = shallow(<Wallet {...props}/>);

        assert.equal(tree.find('.Revolut__wallets-balance').length, 1);
    });

    it('renders 2 `Text` components inside balance', () => {
        const tree = shallow(<Wallet {...props}/>);

        assert.equal(tree.find('.Revolut__wallets-balance [data-id="balance"]').length, 1);
        assert.equal(tree.find('.Revolut__wallets-balance [data-id="formattedMoney"]').length, 1);
    });
});
