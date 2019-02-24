const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const fs = require('fs');

const faker = require('faker');

const Stopwatch = require('statman-stopwatch');

const sw = new Stopwatch(true);

const csvWriter = createCsvWriter({
  path: './standings.csv',
  header: ['team_name', 'division', 'tie', 'wins', 'losses', 'percentage', 'points_for', 'points_against', 'team_logo'],
});

const generateData = async () => {
  fs.unlink('./standings.csv', (err) => {
    if (err) {
      console.error(err);
    }
  });

  for (let i = 0; i < 10000; i++) {
    const standings = [];
    for (let j = 0; j < 1000; j++) {
      standings.push({
        team_name: faker.random.word(),
        division: faker.random.word(),
        tie: faker.random.number({ min: 0, max: 3 }),
        wins: faker.random.number({ min: 0, max: 16 }),
        losses: faker.random.number({ min: 0, max: 16 }),
        percentage: faker.random.number({ min: 0, max: 100 }) / 100,
        points_for: faker.random.number({ min: 2, max: 800 }),
        points_against: faker.random.number({ min: 2, max: 800 }),
        team_logo: faker.image.sports(100, 100),
      });
    }
    await csvWriter.writeRecords(standings);
  }
  return console.log(`Generated data in:  ${sw.read() / 60000} minutes`);
};

generateData();
