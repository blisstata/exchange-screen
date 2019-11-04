const DEFAULT_LOCALE = 'en-US';

export interface Money {
    amount: number;
    currency: string;
}

export const FormatMoney = (money: Money): string => {
    const { amount, currency } = money;
    const options = {
        style: 'currency',
        currency
    }

    let moneyFormatter = new Intl.NumberFormat(DEFAULT_LOCALE, options);
    
    return moneyFormatter.format(amount);
}
