const mongoose = require('mongoose');

mongoose.connect('localhost:27017/standings', { useNewUrlParser: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('MongoDB has connected');
});

const standingsSchema = mongoose.Schema({
  team_name: String,
  division: String,
  wins: Number,
  losses: Number,
  tie: Number,
  percentage: Number,
  points_for: Number,
  points_against: Number,
  team_logo: String,
  link: String,
});

const Standings = mongoose.model('Standings', standingsSchema);

module.exports.db = db;
module.exports.Standings = Standings;
