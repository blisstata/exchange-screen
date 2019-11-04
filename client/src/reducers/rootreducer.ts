import { combineReducers } from 'redux';
import { exchangeReducer } from './exchange';
import { walletReducer } from './wallets';

export default combineReducers({
    exchange: exchangeReducer,
    wallets: walletReducer
});
