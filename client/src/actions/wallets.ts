import { Dispatch } from 'redux';
import 'cross-fetch/polyfill';
import { GET_WALLETS, UPDATE_WALLETS } from './types';

interface WalletPrice {
    currency: string;
    price: string;
}

export const getWallets = () => (dispatch: any) => {
    return fetch(`http://localhost:4000/wallets`)
    .then(response => response.json())
    .then(response => {
        // handle success
        dispatch({
            type: GET_WALLETS,
            payload: response
        })
    
    })
    .catch(function (error) {
        // handle error
        console.log(error);
    })
}

export const updateWallets = (walletPrices: Array<WalletPrice>) => (dispatch: Dispatch) => {
    dispatch({
        type: UPDATE_WALLETS,
        payload: walletPrices
    })
}
