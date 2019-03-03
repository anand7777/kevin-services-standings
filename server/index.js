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
  db('standings')
    .where({ division: 'NFC West' })
    .select()
    .limit(5)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
});

app.post('/espn/post/standings', (req, res) => {
  const standing = req.body;

  // for (const requiredField of ['team_name','division','wins','losses','tie', 'percentage', 'points_for', 'points_against', 'team_logo']) {
  //   if (!standing[requiredField]) {
  //     return res
  //       .status(422)
  //       .send({ error: `You are missing a "${requiredField}" field.` });
  //   }
  // }

  db('standings').insert(standing)
    .then((standing) => {
      res.status(201).json({ id: standing[0] });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
});

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

app.put('/espn/standings/update/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const team_name = (req.body.team_name);

  db('standings')
    .where('id', id)
    .update({ team_name: team_name })
    .then(() => {
      res.send(200, `\n Updated teamname for record with id: ${id}`);
    })
    .catch((error) => {
      res.status(500).json({ error });
      console.log(error);
    });
});

app.delete('/espn/standings/delete/:id', (req, res) => {
  const id = parseInt(req.params.id);

  db('standings')
    .where('id', id)
    .del()
    .then(() => {
      res.send(200, `\n Deleted standing with id: ${id}`);
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
});
