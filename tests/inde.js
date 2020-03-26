const chai = require('chai');
const chaiHtpp = require('chai-http');
const should = chai.should;
const expect = chai.expect;

chai.use(chaiHtpp);
const server = require('../index.js');

describe('Root Endpoint', () => {
    context('/', () => {
        it('Should return true, and give hello world string in data', done => {
            chai.request(server)
            .get('/')
            .end(function(err, res) {
                expect(res.status).to.eq(200);

                let {status, data} = res.body;
                expect(status).to.eq(true);
                expect(data).to.be.a('string');

                done();
            })
        })
    })
})