import 'mocha';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from './index';

chai.use(chaiHttp);
chai.should();

describe('app', () => {
    it('returns wallets', (done: any) => {
        chai.request(app)
        .get('/wallets')
        .end((err: any, res: any) => {
            res.should.have.status(200);
            res.body.should.be.a('object');

            chai.expect(res.body).to.eql({
                wallets: [
                    {
                      balance: 50,
                      currency: 'USD'
                    },
                    {
                      balance: 140,
                      currency: 'EUR'
                    },
                    {
                      balance: 150,
                      currency: 'GBP'
                    }
                ]
            });
            done();
        });
    });

    it('returns exchange rate', (done: any) => {
        chai.request(app)
        .get('/exchange?base=EUR&exchangedCurrency=USD')
        .end((err: any, res: any) => {
            res.should.have.status(200);
            res.body.should.be.a('object');

            chai.expect(res.body.rates.base).to.eql('EUR');
            done();
        });
    });
});


