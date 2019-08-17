const moongoose = require('mongoose');
const Schema = moongoose.Schema


const celebritySchema = new Schema({
    firstName: String,
    lastName: String,
    occupation: String,
    catchPhrase: String,
    creator: { type: Schema.Types.ObjectId, ref: "User" }
})


const Celebrity = moongoose.model('Celebrity', celebritySchema)
module.exports = Celebrity