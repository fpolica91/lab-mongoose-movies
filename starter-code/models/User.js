const moongoose = require('mongoose');
const Schema = moongoose.Schema


const userSchema = new Schema({
    username: String,
    password: String,
    slackID: String,
    githubID: String
}, {
        timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
    })


const User = moongoose.model('User', userSchema)
module.exports = User