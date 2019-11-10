import * as React from 'react';
import './home.less';
import { Wallets, Wallet } from '../wallet/wallets';
import { Transactions } from '../transactions/transactions';
import { Exchange } from '../exchange/exchange';
import { Text, TextColor, TextType } from '../text/text';
import Logo from '../../../images/revolut-logo.svg';

const BASE_CLASS = 'Revolut_app';

export interface HomeActionProps {
    goToExchange?: () => Function;
    getWallets?: () => Function;
    getExchangeRates?: () => Function;
    setExchangeAmount?: (s: string) => Function;
    updateWallets?: (a: any) => Function;
    toggleExchangeCurrencyOptions?: () => Function;
    toggleBaseCurrencyOptions?: () => Function;
    selectBaseCurrency?: () => Function;
    selectExchangeCurrency?: () => Function;
    initiateTransfer?: () => Function;
}

export interface HomeProps extends HomeActionProps {
    showExchange: boolean;
    baseAmount?: number;
    exchangedAmount?: number;
    exchangedFormattedAmount?: string;
    formattedRate?: string;
    showExchangeCurrencyOptions?: boolean;
    showBaseCurrencyOptions?: boolean;
    wallets?: Array<Wallet>;
    baseCurrencyValue?: string;
    exchangeCurrencyValue?: string;
    baseCurrency?: string;
    exchangeCurrency?: string;
    error?: string;
    amountReadOnly?: boolean;
}

export class Home extends React.Component<HomeProps> {
    componentDidMount() {
        this.props.getWallets(); 
    }

    handleClick() {
        this.props.goToExchange();
    }

    render() {
        const {
            showExchange,
            baseAmount,
            exchangedAmount,
            exchangedFormattedAmount,
            formattedRate,
            wallets,
            showExchangeCurrencyOptions,
            showBaseCurrencyOptions,
            baseCurrencyValue,
            exchangeCurrencyValue,
            baseCurrency,
            exchangeCurrency,
            error,
            amountReadOnly
        } = this.props;
        return (
            <div className={`${BASE_CLASS}`}>
                <header>
                    <Logo data-id='revolut-logo'/>
                </header>
                {!showExchange && 
                    <div className={`${BASE_CLASS}-main`}>
                        <main>
                            <Wallets wallets={wallets}/>
                            <button className={`${BASE_CLASS}-main-exchange`} onClick={() => this.handleClick()}>
                                <Text type={TextType.detailTextBold} textColor={TextColor.white}>
                                    Exchange
                                </Text>
                            </button>
                        </main>
                        <Transactions />
                    </div>
                }
                {showExchange && 
                    <Exchange
                        wallets={wallets}
                        baseAmount={baseAmount}
                        exchangedAmount={exchangedAmount}
                        exchangedFormattedAmount={exchangedFormattedAmount}
                        formattedRate={formattedRate}
                        showExchangeCurrencyOptions={showExchangeCurrencyOptions}
                        showBaseCurrencyOptions={showBaseCurrencyOptions}
                        getExchangeRates={this.props.getExchangeRates}
                        setExchangeAmount={this.props.setExchangeAmount}
                        goToExchange={this.props.goToExchange}
                        updateWallets={this.props.updateWallets}
                        toggleExchangeCurrencyOptions={this.props.toggleExchangeCurrencyOptions}
                        toggleBaseCurrencyOptions={this.props.toggleBaseCurrencyOptions}
                        selectBaseCurrency={this.props.selectBaseCurrency}
                        baseCurrencyValue={baseCurrencyValue}
                        selectExchangeCurrency={this.props.selectExchangeCurrency}
                        exchangeCurrencyValue={exchangeCurrencyValue}
                        baseCurrency={baseCurrency}
                        exchangeCurrency={exchangeCurrency}
                        error={error}
                        amountReadOnly={amountReadOnly}
                        initiateTransfer={this.props.initiateTransfer}
                    />
                }
            </div>
        );
    }
};
