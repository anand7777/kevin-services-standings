const fs = require('fs');
const { Client, pg } = require('pg');
const copyFrom = require('pg-copy-streams').from;

const Stopwatch = require('statman-stopwatch');
const sw = new Stopwatch(true);

const client = new Client({
  host: 'localhost',
  user: 'ap_sdc',
  database: 'espn-sdc',
  password: 'password',
  port: 5432,
});

client.connect();

const stream = client.query(copyFrom("COPY standings (team_name,division,wins,losses,tie,percentage,points_for,points_against,team_logo) FROM STDIN WITH DELIMITER ','"));
const fileStream = fs.createReadStream('./standings.csv');

fileStream.on('error', (error) => {
  console.log(`Error in reading file:  ${error}`);
});

stream.on('error', (error) => {
  console.log(`Error in copy command:  ${error}`);
});

stream.on('end', () => {
  console.log(`Loaded 10M records in:  ${sw.read() / 60000} minutes`);
  console.log('Completed loading data into pg standings table.');
});

fileStream.pipe(stream);
