import * as React from 'react';
import { shallow } from 'enzyme';
import * as sinon from 'sinon';
import { Home } from './home';
import * as assert from 'assert';

describe('Home', () => {
    const homeProps = {
        goToExchange: sinon.stub(),
        getWallets: sinon.stub().returns([{
            currency: 'USD',
            balance: 50
        }, {
            currency: 'EUR',
            balance: 140
        }, {
            currency: 'GBP',
            balance: 150
        }]),
        showExchange: false
    };

    it('renders Logo', () => {
        const tree = shallow(<Home {...homeProps}/>);

        assert.equal(tree.find('[data-id="revolut-logo"]').length, 1);
    });

    it('renders `Wallets` when showExchange is false', () => {
        const tree = shallow(<Home {...homeProps}/>);

        assert.equal(tree.find('.Revolut_app-main').length, 1);
    });

    it('renders `Exchange` when showExchange is true', () => {
        const tree = shallow(<Home {...{...homeProps, showExchange: true}}/>);

        assert.equal(tree.find('Exchange').length, 1);
    });
});
