import * as React from 'react';
import { Text, TextType, TextColor } from '../text/text';
import './wallet.less';

const BASE_CLASS = 'Revolut__wallets';
export interface WalletProps {
    baseCurrency: string;
    formattedMoney: string;
}

export const Wallet = (props: WalletProps) => {
    return (
        <div className={`${BASE_CLASS}-wallet`}>
            <div className={`${BASE_CLASS}-card`}>
                <Text type={TextType.title1} textColor={TextColor.white}>
                    {props.baseCurrency}
                </Text>
            </div>
            <div className={`${BASE_CLASS}-balance`}>
                <Text type={TextType.detailTextBold} textColor={TextColor.gray}>
                    Balance
                </Text>
                <Text type={TextType.title2} textColor={TextColor.mediumgray}>
                    {props.formattedMoney}
                </Text>
            </div>
        </div>
    );
}
