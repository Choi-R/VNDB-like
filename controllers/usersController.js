const bcrypt = require('bcryptjs');
const User = require('../models/user.js');
const jwt = require('jsonwebtoken');
const { success, error } = require('../helpers/response.js');

function create(req, res) {
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
    });

    newUser.save()
        .then(() => {
            success(res, newUser, 201)
        })
        .catch(err => {
            error(res, err, 422)
        })
}

// Find All Users
function findAll(req, res) {
    User.find()
        .then(data => {
            success(res, data, 200)
        })
        .catch(err => {
            error(res, err, 422)
        })
}

// Find User by ID
function find(req, res) {
    User.findOne({ _id: req.params.id })
        .then(data => {
            success(res, data, 200)
        })
        .catch(err => {
            error(res, err, 422)
        })
}

function login(req, res) {
    User.findOne({ email: req.body.email })
        .then(data => {
            if (bcrypt.compareSync(req.body.password, data.password)) {
                let token = jwt.sign({ _id: data._id }, process.env.SECRET_KEY);
                res.status(200).json({
                    status: true,
                    data: token
                });
            }
            else {
                res.status(402).json({
                    status: false,
                    error: "Password is wrong"
                });
            }
        })
        .catch(() => res.status(401).json({
            status: false,
            error: "Email is wrong"
        }));
}

// Update User
function update(req, res) {
    User.updateOne({ _id: req.params.id }, { $set: req.body })
        .then(() => {
            success(res, req.body, 201)
        })
        .catch(err => {
            error(res, err, 422)
        })
}

// Delete User
function remove(req, res) {
    User.deleteOne({ _id: req.params.id })
        .then(data => {
            success(res, data, 201)
        })
        .catch(err => {
            error(res, err, 422)
        })
}

module.exports = {
    create,
    login,
    findAll,
    find,
    update,
    remove
}