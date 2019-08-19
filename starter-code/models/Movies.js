const moongoose = require('mongoose');
const Schema = moongoose.Schema


const movieSchema = new Schema({
    title: String,
    genre: String,
    plot: String,
    cast: [{ type: Schema.Types.ObjectId, ref: "Celebrity" }]
})


const Movie = moongoose.model('Movie', movieSchema)
module.exports = Movie