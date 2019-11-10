import { mapStateToProps, AppState } from './exchange';

describe('Map state to props', () => {
    const state: AppState = {
        exchange: {
            showExchange: false,
            baseAmount: 0,
            exchangedAmount: 0,
            baseCurrency: 'EUR',
            exchangeCurrency: 'USD',
            exchangedFormattedAmount: '0$',
            rate: 0.7,
            formattedRate: '0.7$',
            showExchangeCurrencyOptions: false,
            showBaseCurrencyOptions: true,
            amountReadOnly: false,
            error: ''
        },
        wallets: {
            wallets: [{
                currency: 'USD',
                balance: 50,
                formattedMoney: '50$'
            }]
        }
    };

    it('converts state to props', () => {
        const props = mapStateToProps(state);

        expect(props).toStrictEqual({
            showExchange: false,
            baseAmount: 0,
            exchangedAmount: 0,
            baseCurrency: 'EUR',
            exchangeCurrency: 'USD',
            exchangedFormattedAmount: '0$',
            rate: 0.7,
            formattedRate: '0.7$',
            showExchangeCurrencyOptions: false,
            showBaseCurrencyOptions: true,
            amountReadOnly: false,
            error: '',
            wallets: [{
                currency: 'USD',
                balance: 50,
                formattedMoney: '50$'
            }]
        });
    });
});
