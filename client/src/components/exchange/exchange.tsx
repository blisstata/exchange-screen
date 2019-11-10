import * as React from 'react';
import { Wallet } from '../wallet/wallets';
import { SelectBox } from '../select-box/select-box';
import { Text, TextColor, TextType } from '../text/text';
import Transfer from '../../../images/transfer.svg';
import './exchange.less';

const BASE_CLASS = 'revolut_exchange';
const DURATION = 10000;

export interface ExchangeProps {
    wallets: Array<Wallet>;
    getExchangeRates?: Function;
    setExchangeAmount?: Function;
    updateWallets?: Function;
    goToExchange?: Function;
    selectBaseCurrency?: Function;
    selectExchangeCurrency?: Function;
    toggleExchangeCurrencyOptions?: Function;
    toggleBaseCurrencyOptions?: Function;
    initiateTransfer?: Function;
    formattedRate?: string;
    exchangedAmount?: number;
    exchangedFormattedAmount?: string;
    baseAmount?: number;
    showExchangeCurrencyOptions?: boolean;
    showBaseCurrencyOptions?: boolean;
    baseCurrencyValue?: string;
    baseCurrency?: string;
    exchangeCurrency?: string;
    exchangeCurrencyValue?: string;
    error?: string;
    amountReadOnly?: boolean;
}

export class Exchange extends React.Component<ExchangeProps, {}> {
    dataPolling: any = undefined;

    componentWillUnmount() {
        clearInterval(this.dataPolling);
    }

    getExchangeRates(currency: string, exchangeCurrency: string) {
        this.props.getExchangeRates({ base: currency, exchangeCurrency });
        this.dataPolling = setInterval(
        () => {
            this.props.getExchangeRates({ base: currency, exchangeCurrency});
        },
        DURATION);
    }

    handleFromListClick(currency: string, balance: string) {
        clearInterval(this.dataPolling);
        this.props.selectBaseCurrency(currency, balance, this.props.exchangeCurrency);
        this.props.exchangeCurrency && this.getExchangeRates(currency, this.props.exchangeCurrency);
    }

    handleToListClick(currency: string, balance: string) {
        clearInterval(this.dataPolling)
        this.props.selectExchangeCurrency(currency, balance, this.props.baseCurrency);
        this.props.baseCurrency && this.getExchangeRates(this.props.baseCurrency, currency);
    }

    enterAmountToExchange(e: any) {
        let value = e.target.value;
        if(value.indexOf('.') > -1) {
            const digitsAfterDecimal = e.target.value.split('.')[1];

            if(digitsAfterDecimal > 2) {
                value = parseFloat(e.target.value).toFixed(2);
            }
        }

        this.props.setExchangeAmount(value);
    }

    handleTransfer() {
        const {
            baseAmount,
            baseCurrency,
            exchangeCurrency,
            exchangedAmount,
        } = this.props;
        this.props.initiateTransfer(baseAmount, baseCurrency, exchangeCurrency, exchangedAmount);
    }

    render() {
        return(
            <div className={`${BASE_CLASS}`}>
                <div className={`${BASE_CLASS}-error`}>
                    <Text type={TextType.title2} textColor={TextColor.red}>
                        {this.props.error}
                    </Text>
                </div>
                <div className={`${BASE_CLASS}-main`}>
                    <div className={`${BASE_CLASS}-from`}>
                        <SelectBox
                            data-id='base-currency-select-box'
                            wallets={this.props.wallets}
                            placeholder='Select a currency'
                            show={this.props.showBaseCurrencyOptions}
                            handleClick={() => this.props.toggleBaseCurrencyOptions()}
                            value={this.props.baseCurrencyValue}
                            handleListClick={(currency: string, balance: string) => this.handleFromListClick(currency, balance)}
                        />
                        <div className={`${BASE_CLASS}-text`}>
                            <Text
                                type={TextType.detailTextBold}
                                textColor={TextColor.mediumgray}
                                data-id='base-currency-text'
                            >
                                Exchange From {this.props.baseCurrency}
                            </Text>
                        </div>
                        <input
                            type="number" 
                            name="price" 
                            value={this.props.baseAmount}
                            onChange={(e) => this.enterAmountToExchange(e)}
                            className={`${BASE_CLASS}-base-amount`}
                            readOnly={this.props.amountReadOnly}
                        />
                    </div>
                    <Transfer className={`${BASE_CLASS}-icon`}/>
                    <div className={`${BASE_CLASS}-to`}>
                        <SelectBox
                            data-id='exchange-currency-select-box'
                            wallets={this.props.wallets}
                            placeholder='Select a currency'
                            show={this.props.showExchangeCurrencyOptions}
                            handleClick={() => this.props.toggleExchangeCurrencyOptions()}
                            value={this.props.exchangeCurrencyValue}
                            handleListClick={(currency: string, balance: string) => this.handleToListClick(currency, balance)}
                        />
                        <div className={`${BASE_CLASS}-text`}>
                            <Text
                                type={TextType.detailTextBold}
                                textColor={TextColor.mediumgray}
                                data-id='exchange-currency-text'
                            >
                                Exchange To {this.props.exchangeCurrency} {this.props.formattedRate}
                            </Text>
                        </div>
                        <Text type={TextType.detailTextBold} textColor={TextColor.mediumgray}>
                            {this.props.exchangedFormattedAmount}
                        </Text>
                    </div>
                </div>
                <div className={`${BASE_CLASS}-footer`}>
                    <button className={`${BASE_CLASS}-button`} data-id='transfer' onClick={() => this.handleTransfer()}>
                        <Text type={TextType.detailTextBold} textColor={TextColor.white}>
                            Transfer
                        </Text>
                    </button>
                    <button className={`${BASE_CLASS}-button`} onClick={() => this.props.goToExchange()}>
                        <Text type={TextType.detailTextBold} textColor={TextColor.white}>
                            Back To Home
                        </Text>
                    </button>
                </div>
            </div>
        )
    }
}
