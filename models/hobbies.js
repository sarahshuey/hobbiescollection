const mongoose = require('mongoose');

const sportsSchema = new mongoose.Schema({
    // TODO change name to be unique
    hobbieName: { type: String, required: true, unique: true},
    description: [String],
    source: [{
      years: Number,
      equipment:{type: String}
    }],
    players: Number
})

const sport = mongoose.model('Sport', sportsSchema);

module.exports = sport;
