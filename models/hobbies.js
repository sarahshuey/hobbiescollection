const mongoose = require('mongoose');

const sportsSchema = new mongoose.Schema({
    // TODO change name to be unique
    hobbieName: { type: String, required: true},
    description: {type: String},
    source: [{
      years: Number,
      equipment:{type: String}
    }],
    players: Number
})

const Sport = mongoose.model('Sport', sportsSchema);

module.exports = Sport;
