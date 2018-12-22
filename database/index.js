const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/standings', { useNewUrlParser: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('MongoDB has connected');
});

mongoose.Promise = global.Promise;

const standingsSchema = mongoose.Schema({
  team_name: String,
  division: String,
  wins: Number,
  losses: Number,
  tie: Number,
  percentage: Number,
  points_for: Number,
  points_against: Number,
});

const StandingsModel = mongoose.model('StandingsModel', standingsSchema);

module.exports = db;
module.exports = StandingsModel;
