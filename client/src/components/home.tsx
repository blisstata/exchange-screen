import * as React from 'react';
import './home.less';
import { Wallets, Wallet } from './wallet/wallets';
import { Transactions } from './transactions/transactions';
import Exchange from './exchange/exchange';
import { Text, TextColor, TextType } from './text/text';
import { goToExchange } from '../actions/exchange';
import { getWallets } from '../actions/wallets';
import { connect } from 'react-redux';
import Logo from '../../images/revolut-logo.svg'

const BASE_CLASS = 'Revolut_app';

interface HomeProps {
    getWallets: Function;
    goToExchange: Function;
    exchange: {
        showExchange: boolean;
        wallets: {
            wallets: Array<Wallet>
        }
    }
}

class Home extends React.Component<HomeProps> {
    componentDidMount() {
        this.props.getWallets(); 
    }

    handleClick() {
        this.props.goToExchange();
    }

    render() {
        const { showExchange } = this.props.exchange;
        
        return (
            <div className={`${BASE_CLASS}`}>
                <Logo/>
                {!showExchange && 
                    <div className={`${BASE_CLASS}-main`}>
                        <main>
                            <Wallets wallets={this.props.wallets.wallets}/>
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
                        wallets={this.props.wallets.wallets}
                    />
                }
            </div>
        );
    }
};

const mapStateToProps = (state: any) => ({
    exchange: state.exchange,
    wallets: state.wallets
})


export default connect(mapStateToProps, { goToExchange, getWallets })(Home);
