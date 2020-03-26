const chai = require('chai');
const chaiHtpp = require('chai-http');
const {should, expect} = chai;
const User = require('../models/user.js');
const {create} = require("../tests/fixture/userFixtures.js")
chai.use(chaiHtpp);
const server = require('../index.js');
const bcrypt = require('bcryptjs');

let user = create()
console.log(user)

describe('User API', function(){
    // this.timeout(120000)

    before(function(){
        User.deleteMany({})
 //       .then(function() {done()})
    })

    after(function(){
        User.deleteMany({})
 //           .then(function() {done()})
    })

    context('/api/v1/users', function() {
        it('Should create a new user', function() {
            
            chai.request(server)
                .post('/api/v1/users')
                .set('Content-Type', 'application/json')
                .send(JSON.stringify(user))
                .end(function (err, res) {
                    console.log(res.body)
                    expect(res.status).to.eq(201);

                    let { status, data } = res.body;
                    expect(status).to.be.ok;
                    expect(data).to.be.an('object');
                    expect(data).to.have.property('_id');
                    expect(data).to.have.property('email');
                    expect(data.email).to.eq(user.email);

                    // done();
                })
        })
        it('Should get all user', function() {
            chai.request(server)
                .get('/api/v1/users')
                .end(function (err, res) {
                    expect(res.status).to.eq(200);

                    let { status, data } = res.body;
                    expect(status).to.eq(true);

                    // done();
                })
        })
    })
    context('/api/v1/users-login', function() {
        it('Should login succesfully', function() {
            chai.request(server)
                .post('/api/v1/users-login')
                .set('Content-Type', 'application/json')
                .send(JSON.stringify(user))
                .end(function (err, res) {
                    expect(res.status).to.eq(200);
                    console.log(res.body);

                    // done();
                })
        })
    })
})
