import express from 'express';
import { getRates } from './exchange-rates';
import { wallets } from './wallets';

// Create a new express application instance
const app: express.Application = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/wallets', function (req, res) {
    res.json({ wallets });
});

app.get('/exchange', async (req, res) => {
  const { base, exchangedCurrency } = req.query;
  const rates = await getRates(base, exchangedCurrency);

  res.json({ rates });
});

app.listen(4000, () => {
  console.log('Example app listening on port 4000!');
});

export default app;
