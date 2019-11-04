import * as React from 'react';
import { Text, TextColor, TextType } from '../text/text';
import './transactions.less';

const BASE_CLASS = 'Revolut_transactions'
export const Transactions = () => {
    return (
        <div className={`${BASE_CLASS}`}>
            <Text textColor={TextColor.mediumgray} type={TextType.title2}>
                Transactions yet to come
            </Text>
        </div>
    );
}
