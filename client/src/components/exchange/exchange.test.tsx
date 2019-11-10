import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import * as sinon from 'sinon';
import { Exchange } from './exchange';
import * as assert from 'assert';

const props = {
    wallets: [
        {currency: "USD", balance: 50, formattedMoney: "$50.00"},
        {currency: "EUR", balance: 140, formattedMoney: "€140.00"},
        {currency: "GBP", balance: 150, formattedMoney: "£150.00"}
    ],
    exchangeCurrency: 'USD',
    baseCurrency: 'EUR',
    initiateTransfer: sinon.spy(),
    toggleBaseCurrencyOptions: sinon.spy(),
    selectBaseCurrency: sinon.stub().returns({}),
    selectExchangeCurrency: sinon.stub().returns({}),
    getExchangeRates: sinon.stub().returns({}),
    setExchangeAmount: sinon.stub().returns({}),
    handleTransfer: sinon.stub().returns({}),
    baseAmount: 10,
    exchangedAmount: 12
};
describe('Exchange', () => {
    const tree = shallow(<Exchange {...props}/>);

    it('renders base currency SelectBox', () => {
        assert.strictEqual(tree.find('[data-id="base-currency-select-box"]').length, 1);
    });

    it('renders exchange currency SelectBox', () => {
        assert.strictEqual(tree.find('[data-id="exchange-currency-select-box"]').length, 1);
    });

    it('renders base currency text', () => {
        assert.strictEqual(tree.find('[data-id="base-currency-text"]').length, 1);
    });

    it('renders exchange currency text', () => {
        assert.strictEqual(tree.find('[data-id="exchange-currency-text"]').length, 1);
    });

    describe('handleFromListClick', () => {
        it('calls selectBaseCurrency', () => {
            const tree = shallow(<Exchange {...props}/>);

            tree.instance().handleFromListClick('EUR', '50');

            assert(props.selectBaseCurrency.called);
        });

        it('calls getExchangeRates', () => {
            const getExchangeRatesSpy = sinon.spy(Exchange.prototype, 'getExchangeRates');
            const tree = shallow(<Exchange {...props}/>);

            tree.instance().handleFromListClick('EUR', '50');

            assert(getExchangeRatesSpy.called);
        });
    });

    describe('handleToListClick', () => {
        it('calls selectBaseCurrency', () => {
            const tree = shallow(<Exchange {...props}/>);

            tree.instance().handleToListClick('USD', '50');

            assert(props.selectExchangeCurrency.called);
        });
    });

    describe('footer', () => {
        it('contains button', () => {
            assert.strictEqual(tree.find('[data-id="transfer"]').length, 1);
        });

        it('calls button', () => {
            const handleTransferSpy = sinon.spy(Exchange.prototype, 'handleTransfer');
            
            tree.find('[data-id="transfer"]').simulate('click');

            assert(handleTransferSpy.called);
        });
    });

    describe('enterAmountToExchange', () => {
        it('calls setExchangeAmount', () => {
            const tree = shallow(<Exchange {...props}/>);

            tree.instance().enterAmountToExchange({
                target: {
                    value: '50'
                }
            });

            assert(props.setExchangeAmount.called);
        });
    });

    describe('handleTransfer', () => {
        it('calls initiateTransfer', () => {
            const tree = shallow(<Exchange {...props}/>);

            tree.instance().handleTransfer();

            assert(props.initiateTransfer.called);
            assert(props.initiateTransfer.calledWith(10, 'EUR', 'USD', 12));
        });
    });
});
