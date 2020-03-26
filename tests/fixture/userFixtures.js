const faker = require('faker');

exports.create = function () {
    return {
        name: faker.name.firstName(),
        email: faker.internet.email().toLowerCase(),
        password: faker.internet.password()
    }
}
// module.exports = create;