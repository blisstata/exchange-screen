import { exchangeReducer } from './exchange';
import {
    GET_EXCHANGE_RATES,
    TOGGLE_EXCHANGE,
    SET_EXCHANGE_AMOUNT,
    TOGGLE_EXCHANGE_CURRENCY_OPTIONS,
    TOGGLE_BASE_CURRENCY_OPTIONS,
    SELECT_BASE_CURRENCY,
    SELECT_EXCHANGE_CURRENCY,
    ENABLE_EXCHANGE_AMOUNT,
    DISABLE_EXCHANGE_AMOUNT,
    NO_INITIATE_TRANSFER,
    INITIATE_TRANSFER_FAILED,
    INITIATE_TRANSFER
} from '../actions/types';

describe('exchange reducer', () => {
    it('returns the initial state', () => {
        expect(exchangeReducer(undefined, {})).toStrictEqual({
            showExchange: false,
            baseAmount: 0,
            exchangedAmount: 0,
            exchangedFormattedAmount: '',
            showExchangeCurrencyOptions: false,
            showBaseCurrencyOptions: false,
            baseCurrency: ''
        });
    });

    it('handles GET_EXCHANGE_RATES', () => {
        expect(
            exchangeReducer(undefined, {
            type: GET_EXCHANGE_RATES,
            payload: {
                rates: {
                    'EUR': 1.1
                }
            }
          })
        ).toStrictEqual({
            baseAmount: 0,
            baseCurrency: '',
            exchangedAmount: 0,
            exchangedFormattedAmount: '€0.00',
            formattedRate: '€1.10',
            rate: 1.1,
            showBaseCurrencyOptions: false,
            showExchange: false,
            showExchangeCurrencyOptions: false
        });
    });

    it('handles TOGGLE_EXCHANGE', () => {
        expect(
            exchangeReducer(undefined, {
            type: TOGGLE_EXCHANGE
          }).showExchange
        ).toStrictEqual(true);
    });

    it('handles SET_EXCHANGE_AMOUNT', () => {
        const initialState = {
            showExchange: false,
            baseAmount: 0,
            exchangedAmount: 0,
            exchangedFormattedAmount: '',
            showExchangeCurrencyOptions: false,
            showBaseCurrencyOptions: false,
            baseCurrency: '',
            rate: 1.1,
            exchangeCurrency: 'USD'
        };

        expect(
            exchangeReducer(initialState, {
            type: SET_EXCHANGE_AMOUNT,
            payload: 10
          }).exchangedFormattedAmount
        ).toStrictEqual('$11.00');
    });

    it('handles TOGGLE_EXCHANGE_CURRENCY_OPTIONS', () => {
        expect(
            exchangeReducer(undefined, {
            type: TOGGLE_EXCHANGE_CURRENCY_OPTIONS
          }).showExchangeCurrencyOptions
        ).toStrictEqual(true);
    });

    it('handles TOGGLE_BASE_CURRENCY_OPTIONS', () => {
        expect(
            exchangeReducer(undefined, {
            type: TOGGLE_BASE_CURRENCY_OPTIONS
          }).showBaseCurrencyOptions
        ).toStrictEqual(true);
    });

    it('handles SELECT_BASE_CURRENCY', () => {
        const updatedState = exchangeReducer(undefined, {
            type: SELECT_BASE_CURRENCY,
            currency: 'EUR',
            balance: '10€'
        });

        expect(updatedState.baseCurrency).toEqual('EUR');
        expect(updatedState.showBaseCurrencyOptions).toEqual(false);
    });

    it('handles SELECT_EXCHANGE_CURRENCY', () => {
        const updatedState = exchangeReducer(undefined, {
            type: SELECT_EXCHANGE_CURRENCY,
            currency: 'EUR',
            balance: '10€'
        });

        expect(updatedState.exchangeCurrency).toEqual('EUR');
        expect(updatedState.showExchangeCurrencyOptions).toEqual(false);
    });

    it('handles ENABLE_EXCHANGE_AMOUNT', () => {
        const updatedState = exchangeReducer(undefined, {
            type: ENABLE_EXCHANGE_AMOUNT
        });

        expect(updatedState.error).toEqual('');
        expect(updatedState.amountReadOnly).toEqual(false);
    });

    it('handles DISABLE_EXCHANGE_AMOUNT', () => {
        const updatedState = exchangeReducer(undefined, {
            type: DISABLE_EXCHANGE_AMOUNT
        });

        expect(updatedState.error).toEqual('Please select a different currency');
        expect(updatedState.amountReadOnly).toEqual(true);
    });

    it('handles NO_INITIATE_TRANSFER', () => {
        const updatedState = exchangeReducer(undefined, {
            type: NO_INITIATE_TRANSFER
        });

        expect(updatedState.error).toEqual('Please give amount to be transferred');
    });

    it('handles INITIATE_TRANSFER_FAILED', () => {
        const updatedState = exchangeReducer(undefined, {
            type: INITIATE_TRANSFER_FAILED
        });

        expect(updatedState.error).toEqual('The given amount is greater than the balance');
    });

    it('handles INITIATE_TRANSFER', () => {
        const updatedState = exchangeReducer(undefined, {
            type: INITIATE_TRANSFER
        });

        expect(updatedState.error).toEqual('');
    });

    it('handles default', () => {
        const updatedState = exchangeReducer(undefined, {
            type: ''
        });

        expect(updatedState).toEqual({
            showExchange: false,
            baseAmount: 0,
            exchangedAmount: 0,
            exchangedFormattedAmount: '',
            showExchangeCurrencyOptions: false,
            showBaseCurrencyOptions: false,
            baseCurrency: ''
        });
    });
});
