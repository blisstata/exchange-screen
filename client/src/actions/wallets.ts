import { GET_WALLETS, UPDATE_WALLETS } from './types';

interface WalletPrice {
    currency: string;
    price: number
}

export const getWallets = () => (dispatch: any) => {
    fetch(`http://localhost:4000/home`)
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

export const updateWallets = (walletPrices: Array<WalletPrice>) => (dispatch: any) => {
    dispatch({
        type: UPDATE_WALLETS,
        payload: walletPrices
    })
}
