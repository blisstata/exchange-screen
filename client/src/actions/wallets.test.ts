import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as fetchMock from 'fetch-mock';
import {
    getWallets,
    updateWallets
} from './wallets';

import {
    GET_WALLETS,
    UPDATE_WALLETS
} from './types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Wallets action creators', () => {
    afterEach(() => {
        fetchMock.restore()
    });

    describe('getWallets', () => {
        it('creates GET_WALLETS when fetching exchange rates has been done', () => {
            fetchMock.get('http://localhost:4000/wallets', {
                body: { wallets: ['do something'] },
                headers: { 'content-type': 'application/json' }
            });

            const expectedActions = [
                { type: GET_WALLETS, payload: { wallets: ['do something'] } } 
            ];

            const store = mockStore({})

            return store.dispatch<any>(getWallets()).then(() => {
                expect(store.getActions()).toEqual(expectedActions)
            });
        });
    });

    describe('updateWallets', () => {
        it('creates UPDATE_WALLETS', () => {
            const walletPrices = [{
                currency: 'EUR',
                price: '10€'
            }]
            const expectedActions = [
                { type: UPDATE_WALLETS, payload: walletPrices } 
            ];

            const store = mockStore({ })
            store.dispatch<any>(updateWallets(walletPrices));
            
            expect(store.getActions()).toEqual(expectedActions)
        });
    });
});
