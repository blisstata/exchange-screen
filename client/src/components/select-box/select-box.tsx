import * as React from 'react';
import './select-box.less';
import { Wallet } from '../wallet/wallets';

const BASE_CLASS = 'Revolut_select'

export interface SelectBoxProps {
    wallets: Array<Wallet>;
    placeholder: string;
    show: boolean;
    handleClick?: () => void;
    value: string;
    handleListClick?: (s: string, w: string) => void;                        
}

export const SelectBox = (props: SelectBoxProps) => {
    const options = props.wallets.map((wallet) => {
        return (
            <li className={`${BASE_CLASS}-list-element`} onClick={() => props.handleListClick(wallet.currency, wallet.formattedMoney)}>
                <span>{wallet.currency}</span>
                <span>{wallet.formattedMoney}</span>
            </li>
        );
    });

    return (
        <div className={`${BASE_CLASS}-container`}>
            <input 
                type="text"
                className={`${BASE_CLASS}-exchange`}
                placeholder={props.placeholder}
                value={props.value}
                onClick={() => props.handleClick()}
            />
            {
                props.show && 
                <ul className={`${BASE_CLASS}-list`}>
                    {options}
                </ul>
            }
        </div>
    )
}   
