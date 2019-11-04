
const fetch = require('node-fetch');

export const getRates = async (base: string = 'EUR', exchangedCurrency: string) => {
    try {
        const response = await fetch(`https://api.exchangeratesapi.io/latest?base=${base}&symbols=${exchangedCurrency}`, {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            }
        });
        const json = await response.json();
        return json;
    } catch (err) {
      throw err;
    }
};
