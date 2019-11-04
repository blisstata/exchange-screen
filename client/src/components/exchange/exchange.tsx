import * as React from 'react';
import { Wallet } from '../wallet/wallets';
import { SelectBox } from '../select-box/select-box';
import { Text, TextColor, TextType } from '../text/text';
import { getExchangeRates, setExchangeAmount, goToExchange } from '../../actions/exchange';
import { updateWallets } from '../../actions/wallets';
import { connect } from 'react-redux';
import Transfer from '../../../images/transfer.svg';
import './exchange.less';

const BASE_CLASS = 'Revolut_exchange';
const DURATION = 10000;

export interface ExchangeProps {
    wallets: Array<Wallet>;
    getExchangeRates?: Function;
    setExchangeAmount?: Function;
    exchange?: {
        formattedRate: string;
        exchangedAmount: number;
        exchangedFormattedAmount: string;
        baseAmount: number;
    };
}
export interface ExchangeState {
    showBaseCurrencyOptions: boolean;
    baseCurrencyValue: string;
    showExchangeCurrencyOptions: boolean;
    exchangeCurrencyValue: string;
    baseCurrency: string;
    exchangeCurrency: string;
    amountToExchange: number;
    error: string;
    readonly: boolean;
}

class Exchange extends React.Component<ExchangeProps, ExchangeState> {
    constructor(props: ExchangeProps) {
        super(props);

        this.state = {
            showBaseCurrencyOptions: false,
            baseCurrencyValue: '',
            showExchangeCurrencyOptions: false,
            exchangeCurrencyValue: '',
            baseCurrency: '',
            exchangeCurrency: '',
            amountToExchange: 0,
            error: '',
            readonly: true
        }

    }

    dataPolling: any = undefined;

    componentWillUnmount() {
        clearInterval(this.dataPolling);
    }

    handleBaseCurrencyInputClick() {
        this.setState((state) => ({
            showBaseCurrencyOptions: !state.showBaseCurrencyOptions
        }));
    }

    handleExchangeCurrencyInputClick() {
        this.setState((state) => ({
            showExchangeCurrencyOptions: !state.showExchangeCurrencyOptions
        }));
    }

    getExchangeRates(currency: string, exchangedCurrency: string) {
        this.props.getExchangeRates({ base: currency, exchangedCurrency });
        this.dataPolling = setInterval(
        () => {
            this.props.getExchangeRates({ base: currency, exchangedCurrency});
        },
        DURATION);
    }

    handleFromListClick(currency: string, balance: string) {
        clearInterval(this.dataPolling);
        this.setState({
            baseCurrency: currency,
            baseCurrencyValue: `${currency} - Balance ${balance}`,
            showBaseCurrencyOptions: false
        });

        if(this.state.exchangeCurrency && this.state.exchangeCurrency !== currency) {
            this.getExchangeRates(currency, this.state.exchangeCurrency);
            this.setState({
                error: '',
                readonly: false
            })
        } else {
            this.setState({
                error: 'Please select a different currency',
                readonly: true
            })
        }
    }

    handleToListClick(currency: string, balance: string) {
        clearInterval(this.dataPolling)
        this.setState({
            exchangeCurrency: currency,
            exchangeCurrencyValue: `${currency} - Balance ${balance}`,
            showExchangeCurrencyOptions: false
        });

        if(this.state.baseCurrency && this.state.baseCurrency !== currency) {
            this.getExchangeRates(this.state.baseCurrency, currency);
            this.setState({
                error: '',
                readonly: false
            })
        } else {
            this.setState({
                error: 'Please select a different currency',
                readonly: true
            })
        }
    }

    enterAmountToExchange(e: any) {
        let value = e.target.value;
        if(value.indexOf('.') > -1) {
            const digitsAfterDecimal = e.target.value.split('.')[1];

            if(digitsAfterDecimal > 2) {
                value = parseFloat(e.target.value).toFixed(2);
            }
        }
        
        this.setState({
            amountToExchange: value,
        });

        this.props.setExchangeAmount(value);
    }

    handleTransfer() {
        if(this.props.exchange.baseAmount > 0) {
            const updatedWallets = [{
                currency: this.state.baseCurrency,
                price: `-${this.props.exchange.baseAmount}`
            },{
                currency: this.state.exchangeCurrency,
                price: `${this.props.exchange.exchangedAmount}`
            }];

            this.setState({
                error: ''
            });

            try {
                this.props.updateWallets(updatedWallets);
                this.props.goToExchange();
            } catch(err) {
                this.setState({
                    error: 'The amount you gave is higher than the current balance'
                }); 
            }
        } else {
            this.setState({
                error: 'Please give amount to be transferred'
            });
        }
    }

    render() {
        console.log(this.props);
        return(
            <div className={`${BASE_CLASS}`}>
                <div className={`${BASE_CLASS}-error`}>
                    <Text type={TextType.title2} textColor={TextColor.red}>
                        {this.state.error}
                    </Text>
                </div>
                <div className={`${BASE_CLASS}-main`}>
                    <div className={`${BASE_CLASS}-from`}>
                        <SelectBox 
                            wallets={this.props.wallets}
                            placeholder='Select a currency'
                            show={this.state.showBaseCurrencyOptions}
                            handleClick={() => this.handleBaseCurrencyInputClick()}
                            value={this.state.baseCurrencyValue}
                            handleListClick={(currency: string, balance: string) => this.handleFromListClick(currency, balance)}
                        />
                        <div className={`${BASE_CLASS}-text`}>
                            <Text
                                type={TextType.detailTextBold}
                                textColor={TextColor.mediumgray} 
                            >
                                Exchange From {this.state.baseCurrency}
                            </Text>
                        </div>
                        <input
                            type="number" 
                            name="price" 
                            value={this.state.amountToExchange}
                            onChange={(e) => this.enterAmountToExchange(e)}
                            className={`${BASE_CLASS}-base-amount`}
                            readOnly={this.state.readonly}
                        />
                    </div>
                    <Transfer className={`${BASE_CLASS}-icon`}/>
                    <div className={`${BASE_CLASS}-to`}>
                        <SelectBox 
                            wallets={this.props.wallets}
                            placeholder='Select a currency'
                            show={this.state.showExchangeCurrencyOptions}
                            handleClick={() => this.handleExchangeCurrencyInputClick()}
                            value={this.state.exchangeCurrencyValue}
                            handleListClick={(currency: string, balance: string) => this.handleToListClick(currency, balance)}
                        />
                        <div className={`${BASE_CLASS}-text`}>
                            <Text
                                type={TextType.detailTextBold}
                                textColor={TextColor.mediumgray}
                            >
                                Exchange To {this.state.exchangeCurrency} {this.props.exchange.formattedRate}
                            </Text>
                        </div>
                        <Text type={TextType.detailTextBold} textColor={TextColor.mediumgray}>
                            {this.props.exchange.exchangedFormattedAmount}
                        </Text>
                    </div>
                </div>
                <div className={`${BASE_CLASS}-footer`}>
                    <button className={`${BASE_CLASS}-transfer`} onClick={() => this.handleTransfer()}>
                        <Text type={TextType.detailTextBold} textColor={TextColor.white}>
                            Transfer
                        </Text>
                    </button>
                    <button className={`${BASE_CLASS}-transfer`} onClick={() => this.handleTransfer()}>
                        <Text type={TextType.detailTextBold} textColor={TextColor.white}>
                            Back To Home
                        </Text>
                    </button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state: any) => ({
    exchange: state.exchange
})


export default connect(mapStateToProps, {
    getExchangeRates,
    setExchangeAmount,
    updateWallets,
    goToExchange
})(Exchange);
