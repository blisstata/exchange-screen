import { GET_EXCHANGE_RATES, TOGGLE_EXCHANGE, SET_EXCHANGE_AMOUNT } from './types';

interface Exchange {
    base: string;
    exchangedCurrency: string;
}

export const getExchangeRates = (exchange: Exchange) => (dispatch: any) => {
    const { base, exchangedCurrency } = exchange;
    fetch(`http://localhost:4000/exchange?base=${base}&exchangedCurrency=${exchangedCurrency}`)
    .then(response => response.json())
    .then(response => {
        // handle success
        dispatch({
            type: GET_EXCHANGE_RATES,
            payload: response.rates
        })
    
    })
    .catch(function (error) {
        // handle error
        console.log(error);
    })
}

export const goToExchange = () => (dispatch: any) => {
    dispatch({
        type: TOGGLE_EXCHANGE
    });
}

export const setExchangeAmount = (amount: string) => (dispatch: any) => {
    dispatch({
        type: SET_EXCHANGE_AMOUNT,
        payload: amount
    })
}
