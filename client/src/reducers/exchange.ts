import { GET_EXCHANGE_RATES, TOGGLE_EXCHANGE, SET_EXCHANGE_AMOUNT } from '../actions/types';
import { FormatMoney } from '../../../server/format-money';
const initialState = {
    showExchange: false,
    baseAmount: 0,
    exchangedAmount: 0,
    exchangedFormattedAmount: 0
}

export const exchangeReducer = (state = initialState, action: any)=> {
    switch(action.type) {
        case GET_EXCHANGE_RATES: {
            for(let key in action.payload.rates) {
                const rate = parseFloat(action.payload.rates[key]);
                return {
                    ...state,
                    ...formatMoney(rate, key),
                    exchangedFormattedAmount: formatMoney(state.exchangedAmount, key).formattedRate
                }
            }
        }
        case TOGGLE_EXCHANGE:
            return {
                ...state,
                showExchange: !state.showExchange
            }
        case SET_EXCHANGE_AMOUNT: {
            const baseAmount = parseFloat(action.payload);
            const exchangedAmount = parseFloat(action.payload) * state.rate;
            return {
                ...state,
                baseAmount,
                exchangedAmount, 
                exchangedFormattedAmount: formatMoney(exchangedAmount, state.currency).formattedRate
            }
        }
        default:
            return state;    
    }
}

const formatMoney = (rate: string, key: string) => {
    const formattedRate = FormatMoney({
        amount: parseFloat(rate),
        currency: key
    });
    
    return {
        formattedRate,
        rate,
        currency: key
    };
}
