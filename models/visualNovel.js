const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const visual_novelSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    duration: {
        type: String,
        required: true
    },
    rating: Number,
    played_by: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
        unique: true
    }]
}, { collection: "visual_novels" })

const VN = mongoose.model('visual_novels', visual_novelSchema);

//new method
VN.all = function () {
    return new Promise((resolve, reject) => {
        VN
            .find()
            .select([
                '_id', 'title', 'duration', 'rating', 'played_by'
            ])
            .populate([
                {
                    path: 'played_by',
                    select: ['_id', 'name', 'email']
                },
                {
                    path: 'likes',
                    select: ['_id', 'name']
                }
            ])
            .then(result => { resolve(result) })
            .catch(err => {
                reject(err)
            })
    })
}

module.exports = VN;