import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as fetchMock from 'fetch-mock';
import {
    getExchangeRates,
    goToExchange,
    setExchangeAmount,
    toggleExchangeCurrencyOptions,
    toggleBaseCurrencyOptions,
    selectBaseCurrency,
    selectExchangeCurrency,
    initiateTransfer
} from './exchange';

import {
    GET_EXCHANGE_RATES,
    TOGGLE_EXCHANGE,
    SET_EXCHANGE_AMOUNT,
    TOGGLE_EXCHANGE_CURRENCY_OPTIONS,
    TOGGLE_BASE_CURRENCY_OPTIONS,
    SELECT_BASE_CURRENCY,
    ENABLE_EXCHANGE_AMOUNT,
    DISABLE_EXCHANGE_AMOUNT,
    SELECT_EXCHANGE_CURRENCY,
    INITIATE_TRANSFER,
    UPDATE_WALLETS,
    NO_INITIATE_TRANSFER
} from './types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Exchange action creators', () => {
    afterEach(() => {
        fetchMock.restore();
    });
    describe('getExchangeRates', () => {
        const exchange = {
            base: 'EUR',
            exchangeCurrency: 'USD'
        };

        it('creates GET_EXCHANGE_RATES when fetching exchange rates has been done', () => {
            fetchMock.get('http://localhost:4000/exchange?base=EUR&exchangedCurrency=USD', {
                body: { rates: { rates: ['do something'] } },
                headers: { 'content-type': 'application/json' }
            });

            const expectedActions = [
                { type: GET_EXCHANGE_RATES, payload: { rates: ['do something'] } } 
            ];

            const store = mockStore({ rates: [] })

            return store.dispatch<any>(getExchangeRates(exchange)).then(() => {
                expect(store.getActions()).toEqual(expectedActions)
            });
        });
    });

    describe('goToExchange', () => {
        it('creates TOGGLE_EXCHANGE', () => {
            const expectedActions = [
                { type: TOGGLE_EXCHANGE } 
            ];

            const store = mockStore({ rates: [] })

            store.dispatch(goToExchange());
            
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    describe('setExchangeAmount', () => {
        it('creates SET_EXCHANGE_AMOUNT', () => {
            const expectedActions = [
                { type: SET_EXCHANGE_AMOUNT, payload: '35.5' } 
            ];

            const store = mockStore({})

            store.dispatch(setExchangeAmount('35.5'));
            
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    describe('toggleExchangeCurrencyOptions', () => {
        it('creates TOGGLE_EXCHANGE_CURRENCY_OPTIONS', () => {
            const expectedActions = [
                { type: TOGGLE_EXCHANGE_CURRENCY_OPTIONS } 
            ];

            const store = mockStore({})

            store.dispatch(toggleExchangeCurrencyOptions());
            
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    describe('toggleBaseCurrencyOptions', () => {
        it('creates TOGGLE_BASE_CURRENCY_OPTIONS', () => {
            const expectedActions = [
                { type: TOGGLE_BASE_CURRENCY_OPTIONS } 
            ];

            const store = mockStore({})

            store.dispatch(toggleBaseCurrencyOptions());
            
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    describe('selectBaseCurrency', () => {
        it('creates ENABLE_EXCHANGE_AMOUNT when exchangeCurrency is present and is not equal to baseCurrency', () => {
            const expectedActions = [
                { type: SELECT_BASE_CURRENCY, currency: 'EUR', balance: '50€' },
                { type: ENABLE_EXCHANGE_AMOUNT } 
            ];

            const store = mockStore({});

            store.dispatch<any>(selectBaseCurrency('EUR', '50€', 'USD'));
            
            expect(store.getActions()).toEqual(expectedActions);
        });

        it('creates DISABLE_EXCHANGE_AMOUNT when exchangeCurrency is present, but is equal to baseCurrency', () => {
            const expectedActions = [
                { type: SELECT_BASE_CURRENCY, currency: 'EUR', balance: '50€' },
                { type: DISABLE_EXCHANGE_AMOUNT } 
            ];

            const store = mockStore({});

            store.dispatch<any>(selectBaseCurrency('EUR', '50€', 'EUR'));
            
            expect(store.getActions()).toEqual(expectedActions);
        });

        it('creates DISABLE_EXCHANGE_AMOUNT when exchangeCurrency is not present', () => {
            const expectedActions = [
                { type: SELECT_BASE_CURRENCY, currency: 'EUR', balance: '50€' },
                { type: DISABLE_EXCHANGE_AMOUNT } 
            ];

            const store = mockStore({});

            store.dispatch<any>(selectBaseCurrency('EUR', '50€'));
            
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    describe('selectExchangeCurrency', () => {
        it('creates ENABLE_EXCHANGE_AMOUNT when baseCurrency is present and is not equal to exchangeCurrency', () => {
            const expectedActions = [
                { type: SELECT_EXCHANGE_CURRENCY, currency: 'EUR', balance: '50€' },
                { type: ENABLE_EXCHANGE_AMOUNT } 
            ];

            const store = mockStore({});

            store.dispatch<any>(selectExchangeCurrency('EUR', '50€', 'USD'));
            
            expect(store.getActions()).toEqual(expectedActions);
        });

        it('creates DISABLE_EXCHANGE_AMOUNT when baseCurrency is present, but is equal to exchangeCurrency', () => {
            const expectedActions = [
                { type: SELECT_EXCHANGE_CURRENCY, currency: 'EUR', balance: '50€' },
                { type: DISABLE_EXCHANGE_AMOUNT } 
            ];

            const store = mockStore({});

            store.dispatch<any>(selectExchangeCurrency('EUR', '50€', 'EUR'));
            
            expect(store.getActions()).toEqual(expectedActions);
        });

        it('creates DISABLE_EXCHANGE_AMOUNT when baseCurrency is not present', () => {
            const expectedActions = [
                { type: SELECT_EXCHANGE_CURRENCY, currency: 'EUR', balance: '50€' },
                { type: DISABLE_EXCHANGE_AMOUNT } 
            ];

            const store = mockStore({});

            store.dispatch<any>(selectExchangeCurrency('EUR', '50€'));
            
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    describe('initiateTransfer', () => {
        it('creates INITIATE_TRANSFER, UPDATE_WALLETS, TOGGLE_EXCHANGE', () => {
            const expectedActions = [
                { type: INITIATE_TRANSFER },
                {
                    type: UPDATE_WALLETS,
                    payload: [{
                        currency: 'EUR',
                        price: '-10',
                    },
                    {
                        currency: 'USD',
                        price: '12',
                    }]
                },
                { type:  TOGGLE_EXCHANGE }
            ];

            const store = mockStore({
                wallets: {
                    wallets: [{
                        currency: 'EUR',
                        balance: 5
                    },{
                        currency: 'USD',
                        balance: 10
                    }]
                }
            });

            store.dispatch<any>(initiateTransfer(10, 'EUR', 'USD', 12));
            
            expect(store.getActions()).toEqual(expectedActions);
        });

        it('creates NO_INITIATE_TRANSFER if baseAmount is 0', () => {
            const expectedActions = [
                { type: NO_INITIATE_TRANSFER }
            ];

            const store = mockStore({});

            store.dispatch<any>(initiateTransfer(0, 'EUR', 'USD', 12));
            
            expect(store.getActions()).toEqual(expectedActions);
        });
    });
});
