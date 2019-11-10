import { walletReducer } from './wallets';
import {
    GET_WALLETS,
    UPDATE_WALLETS
} from '../actions/types';

describe('wallet reducer', () => {
    it('returns the initial state', () => {
        expect(walletReducer(undefined, {})).toStrictEqual({
            wallets: []
        });
    });

    it('handles GET_WALLETS', () => {
        const wallets = [{
            currency: 'USD',
            balance: 110
        }];

        expect(
            walletReducer(undefined, {
            type: GET_WALLETS,
            payload: {
                wallets: wallets
            }
          }).wallets
        ).toStrictEqual([{
                balance: 110,
                currency: 'USD',
                formattedMoney: '$110.00'
            }
        ]);
    });

    it('handles UPDATE_WALLETS', () => {
        const wallets = [{
            currency: 'USD',
            balance: 110,
            formattedMoney: '$110.00'
        }];

        const initialState = {
            wallets: wallets
        };

        const payload = [{
            currency: 'USD',
            price: '-10'
        }];

        expect(
            walletReducer(initialState, {
            type: UPDATE_WALLETS,
            payload: payload
          }).wallets
        ).toStrictEqual([{
                balance: 100,
                currency: "USD",
                formattedMoney: "$100.00",
            }]);
    });
});
