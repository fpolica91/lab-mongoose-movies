const moongoose = require('mongoose');
const Schema = moongoose.Schema


const userSchema = new Schema({
    username: String,
    password: String
}, {
        timestamps: true
    })


const User = moongoose.model('User', userSchema)
module.exports = User