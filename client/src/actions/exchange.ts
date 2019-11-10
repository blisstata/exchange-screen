
import { Dispatch } from 'redux';
import 'cross-fetch/polyfill';
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
    INITIATE_TRANSFER,
    INITIATE_TRANSFER_FAILED,
    NO_INITIATE_TRANSFER
} from './types';

import { updateWallets } from './wallets';

interface Exchange {
    base: string;
    exchangeCurrency: string;
}

export const getExchangeRatesSuccess = (response: any) => {
    return {
        type: GET_EXCHANGE_RATES,
        payload: response.rates
    }
}

export const getExchangeRates = (exchange: Exchange) => (dispatch: Function) => {
    const { base, exchangeCurrency } = exchange;
    return fetch(`http://localhost:4000/exchange?base=${base}&exchangedCurrency=${exchangeCurrency}`)
    .then(response => response.json())
    .then(response => {
        dispatch(getExchangeRatesSuccess(response))
    })
    .catch(function (error) {
        console.log(error);
    });
}

export const goToExchange = () => {
    return {
        type: TOGGLE_EXCHANGE
    };
}

export const setExchangeAmount = (amount: string) => {
    return {
        type: SET_EXCHANGE_AMOUNT,
        payload: amount
    };
}

export const toggleExchangeCurrencyOptions = () => {
    return {
        type: TOGGLE_EXCHANGE_CURRENCY_OPTIONS
    };
}

export const toggleBaseCurrencyOptions = () => {
    return {
        type: TOGGLE_BASE_CURRENCY_OPTIONS
    };
}

export const enableExchangeAmount = () => {
    return {
        type: ENABLE_EXCHANGE_AMOUNT
    };
}

export const disableExchangeAmount = () => {
    return {
        type: DISABLE_EXCHANGE_AMOUNT
    };
}

export const selectBaseCurrency = (
    currency: string,
    balance: string,
    exchangeCurrency?: string
) => (dispatch: Dispatch) => {
    dispatch({
        type: SELECT_BASE_CURRENCY,
        currency,
        balance
    });

    if(exchangeCurrency && exchangeCurrency !== currency) {
        dispatch(enableExchangeAmount());
    } else {
        dispatch(disableExchangeAmount());
    }
}

export const selectExchangeCurrency = (
    currency: string,
    balance: string,
    baseCurrency?: string
) => (dispatch: Dispatch) => {
    dispatch({
        type: SELECT_EXCHANGE_CURRENCY,
        currency,
        balance
    });

    if(baseCurrency && baseCurrency !== currency) {
        dispatch(enableExchangeAmount());
    } else {
        dispatch(disableExchangeAmount());
    }
}

export const initiateTransfer = (
    baseAmount: number,
    baseCurrency: string,
    exchangeCurrency: string,
    exchangedAmount: number
) => (dispatch: Dispatch) => {
    if(baseAmount > 0) {
        dispatch({
            type: INITIATE_TRANSFER
        });
        const updatedWallets = [{
            currency: baseCurrency,
            price: `-${baseAmount}`
        },{
            currency: exchangeCurrency,
            price: `${exchangedAmount}`
        }];
        
        try {
            dispatch<any>(updateWallets(updatedWallets));
            dispatch(goToExchange());
        } catch(err) {
            dispatch({
                type: INITIATE_TRANSFER_FAILED
            }); 
        }
    } else {
        dispatch({
            type: NO_INITIATE_TRANSFER
        });
    }
}
