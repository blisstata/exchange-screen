import * as React from 'react';
import { Wallet } from './wallet';
import './wallet.less';

const BASE_CLASS = 'Revolut__wallets';

export interface Wallet {
    currency: string;
    balance: number;
    formattedMoney?: string;
}
export interface WalletsProps {
    wallets?: Array<Wallet>
}

export const Wallets = (props: WalletsProps) => {
    const wallets = props.wallets.map((wallet) => {
        return <Wallet key={`wallet-${wallet.currency}`} baseCurrency={wallet.currency} formattedMoney={wallet.formattedMoney} data-id="wallet"/>
    });

    return (
        <div className={`${BASE_CLASS}`}>
            {wallets}
        </div>
    );
}
