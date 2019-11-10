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
import { FormatMoney } from '../../../server/format-money';

export interface Exchange {
    showExchange: boolean;
    baseAmount: number;
    exchangedAmount: number;
    baseCurrency: string;
    exchangeCurrency?: string;
    exchangedFormattedAmount: string;
    rate?: number;
    formattedRate?: string;
    showExchangeCurrencyOptions: boolean;
    showBaseCurrencyOptions: boolean;
    amountReadOnly?: boolean;
    error?: string;
}

const initialState: Exchange = {
    showExchange: false,
    baseAmount: 0,
    exchangedAmount: 0,
    exchangedFormattedAmount: '',
    showExchangeCurrencyOptions: false,
    showBaseCurrencyOptions: false,
    baseCurrency: ''
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
                };
            }
        }
        case TOGGLE_EXCHANGE: {
            return {
                ...state,
                showExchange: !state.showExchange,
                exchangeCurrencyValue: '',
                baseCurrencyValue: '',
                baseAmount: 0,
                formattedRate: '',
                exchangedFormattedAmount: '',
                baseCurrency: '',
                exchangeCurrency: ''
            };
        }
        case SET_EXCHANGE_AMOUNT: {
            const baseAmount = parseFloat(action.payload);
            const exchangedAmount = parseFloat(action.payload) * state.rate;
            return {
                ...state,
                baseAmount,
                exchangedAmount, 
                exchangedFormattedAmount: formatMoney(exchangedAmount, state.exchangeCurrency).formattedRate
            };
        }
        case TOGGLE_EXCHANGE_CURRENCY_OPTIONS: {
            return {
                ...state,
                showExchangeCurrencyOptions: !state.showExchangeCurrencyOptions
            };
        }
        case TOGGLE_BASE_CURRENCY_OPTIONS: {
            return {
                ...state,
                showBaseCurrencyOptions: !state.showBaseCurrencyOptions
            } ;
        }
        case SELECT_BASE_CURRENCY: {
            return {
                ...state,
                baseCurrency: action.currency,
                baseCurrencyValue: `${action.currency} - Balance ${action.balance}`,
                showBaseCurrencyOptions: false
            };
        }
        case SELECT_EXCHANGE_CURRENCY: {
            return {
                ...state,
                exchangeCurrency: action.currency,
                exchangeCurrencyValue: `${action.currency} - Balance ${action.balance}`,
                showExchangeCurrencyOptions: false
            };
        }
        case ENABLE_EXCHANGE_AMOUNT: {
            return {
                ...state,
                error: '',
                amountReadOnly: false
            };
        }
        case DISABLE_EXCHANGE_AMOUNT: {
            return {
                ...state,
                error: 'Please select a different currency',
                amountReadOnly: true
            };
        }
        case NO_INITIATE_TRANSFER: {
            return {
                ...state,
                error: 'Please give amount to be transferred'
            };
        }
        case INITIATE_TRANSFER_FAILED: {
            return {
                ...state,
                error: 'The given amount is greater than the balance'
            };
        }
        case INITIATE_TRANSFER: {
            return {
                ...state,
                error: ''
            };
        }
        default:
            return state;    
    }
}

const formatMoney = (rate: number, key: string) => {
    const formattedRate = FormatMoney({
        amount: parseFloat(rate),
        currency: key
    });
    
    return {
        formattedRate,
        rate
    };
}
