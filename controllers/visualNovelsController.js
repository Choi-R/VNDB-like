const VN = require('../models/visualNovel.js');
const User = require('../models/user.js');

function create(req, res) {
    if (!req.headers.authorization) {
        return res.status(401).json({
            status: false,
            error: 'Unauthorized'
        })
    }
    let visualNovel = new VN({
        title: req.body.title,
        duration: req.body.duration,
        rating: req.body.rating,
        played_by: req.headers.authorization
    });

    visualNovel.save()
        .then(data => {
            res.status(200).json({
                status: true,
                data: data
            })
        })
        .catch(err => {
            res.status(422).json({
                status: false,
                error: err
            })
        })
}

async function like(req, res) {
    try {
        let visualNovel = await VN.findById(req.params.id);
        let user = await User.findById(req.headers.authorization);

        if (!visualNovel || !user) {
            return res.status(422).json({
                status: false,
                error: 'User or Visual Novel doesn\'t seems to be exist!'
            })
        }

        visualNovel.likes.push(user._id);
        await visualNovel.save()

        res.status(201).json({
            status: true,
            data: visualNovel
        })
    }
    catch (err) {
        res.status(422).json({
            status: false,
            error: err
        })
    }
}

function findAll(req, res) {
    VN.all()
        .then(data => {
            res.status(201).json({
                status: true,
                data: data
            })
        })
        .catch(err => {
            res.status(422).json({
                status: false,
                error: err
            })
        })
}

function find(req, res) {
    VN.findOne({ _id: req.params.id })
        .then(data => {
            res.status(201).json({
                status: true,
                data: data
            })
        })
        .catch(err => {
            res.status(422).json({
                status: false,
                error: err
            })
        })
}

function update(req, res) {
    VN.updateOne({ _id: req.params.id }, { $set: req.body })
        .then(data => {
            res.status(201).json({
                status: true,
                data: data
            })
        })
        .catch(err => {
            res.status(422).json({
                status: false,
                error: err
            })
        })
}

function remove(req, res) {
    VN.deleteOne({ _id: req.params.id })
        .then(data => {
            res.status(201).json({
                status: true,
                data: data
            })
        })
        .catch(err => {
            res.status(422).json({
                status: false,
                error: err
            })
        })
}
module.exports = {
    create,
    findAll,
    find,
    update,
    like,
    remove
}