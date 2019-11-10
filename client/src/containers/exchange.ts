import * as React from 'react'; // tslint:disable-line
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Home } from '../components/home/home';
import {
    getExchangeRates,
    setExchangeAmount,
    goToExchange,
    toggleExchangeCurrencyOptions,
    toggleBaseCurrencyOptions,
    selectBaseCurrency,
    selectExchangeCurrency,
    initiateTransfer
} from '../actions/exchange';
import { updateWallets, getWallets } from '../actions/wallets';
import { Exchange } from '../reducers/exchange';
import { Wallets } from '../reducers/wallets';

export interface AppState {
    exchange: Exchange;
    wallets: Wallets;
}

export function mapStateToProps(state: AppState): any {
    return {
        ...state.exchange,
        ...state.wallets
    }
}

function mapDispatchToProps(dispatch: Dispatch): any {
    return bindActionCreators({
        getExchangeRates,
        setExchangeAmount,
        goToExchange,
        updateWallets,
        getWallets,
        toggleExchangeCurrencyOptions,
        toggleBaseCurrencyOptions,
        selectBaseCurrency,
        selectExchangeCurrency,
        initiateTransfer
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
