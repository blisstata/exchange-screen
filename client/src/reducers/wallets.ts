import { GET_WALLETS, UPDATE_WALLETS } from '../actions/types';
import { FormatMoney, Money } from '../../../server/format-money';
import { Wallet } from '../components/wallet/wallets';

export interface Wallets {
    wallets?: Array<Wallet>;
}

const initialState: Wallets = {
    wallets: []
};

export const walletReducer = (state = initialState, action: any) => {
    switch(action.type) {
        case GET_WALLETS: {
            const wallets = action.payload.wallets;
            const formattedWallets = wallets.map((wallet: Wallet) => {
                const money: Money = {
                  amount: wallet.balance,
                  currency: wallet.currency
                }
          
                const formattedMoney = FormatMoney(money);
                
                return {
                  ...wallet,
                  formattedMoney
                };
            });
            return {
                ...state,
                wallets: formattedWallets
            }
        }
        case UPDATE_WALLETS: {
            const wallets = action.payload;
            const updatedWallets = state.wallets.map((wallet) => {
                const index = wallets.findIndex((updatedWallet: any) => updatedWallet.currency === wallet.currency);
                
                if(index > -1) {
                    const balance = wallet.balance + parseFloat(wallets[index].price);
                    if(balance >= 0) {
                        const formattedBalance = FormatMoney({
                            amount: balance,
                            currency: wallet.currency
                        });
                        return {
                            ...wallet,
                            balance,
                            formattedMoney: formattedBalance
                        }
                    } else {
                        throw new Error('Cannot deduct the amount');
                    }
                    
                } else {
                    return wallet;
                }
            });

            return {
                ...state,
                wallets: updatedWallets
            };
        }
        default:
            return state
    }
}
