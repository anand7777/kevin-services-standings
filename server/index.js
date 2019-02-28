const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const configuration = require('../database/knexfile.js');
const db = require('knex')(configuration);

const app = express();

app.use(cors());
app.use(express.static(`${__dirname}/../client/dist`));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.get('/espn/teamstandings', (req, res) => {
  db('standings').select().limit(10)
    .then((standings) => {
      res.status(200).json(standings);
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
});

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
