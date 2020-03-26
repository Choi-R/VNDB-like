const express = require('express');
const cors = require('cors');
const app = express();

var morgan = require('morgan');
const dotenv = require('dotenv');
dotenv.config();

const env = process.env.NODE_ENV;
const dbCOnnection = {
    development: process.env.DB_CONNECTION,
    test: process.env.DB_CONNECTION_TEST,
    staging: process.env.DB_CONNECTION,
    production: process.env.DB_CONNECTION
}

console.log(dbCOnnection[env])
app.use(morgan('tiny'));

const mongoose = require('mongoose');
mongoose.connect(dbCOnnection[env], {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
    .then(() => console.log('Database connected!'))
    .catch(err => console.log(err));

// const User = require('./models/user.js')
app.use(cors());
app.use(express.json());
app.use(express.static('public'));
const router = require('./router.js');
app.use('/api/v1', router)

app.get('/', function(req, res) {
    return res.status(200).json({
        status: true,
        data: 'Hello World'
    })
})

module.exports = app;