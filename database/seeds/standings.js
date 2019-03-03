const faker = require('faker');
const Stopwatch = require('statman-stopwatch');

const sw = new Stopwatch(true);

const getRand = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const randomDiv = () => {
  const divisions = ['AFC West', 'AFC East', 'AFC North', 'AFC South', 'NFC West', 'NFC East', 'NFC South', 'NFC North'];
  return divisions[getRand(0, 7)];
};

exports.seed = async (knex, Promise) => {
  // Deletes ALL existing entries
  knex('standings').del();
  // Inserts seed entries
  for (let i = 0; i < 10000; i++) {
    // console.log(i);
    const standings = [];
    for (let j = 0; j < 1000; j++) {
      standings.push({
        team_name: faker.random.word(),
        division: randomDiv(),
        tie: faker.random.number({ min: 0, max: 3 }),
        wins: faker.random.number({ min: 0, max: 16 }),
        losses: faker.random.number({ min: 0, max: 16 }),
        percentage: faker.random.number({ min: 0, max: 100 }) / 100,
        points_for: faker.random.number({ min: 2, max: 800 }),
        points_against: faker.random.number({ min: 2, max: 800 }),
        team_logo: faker.image.sports(80, 80),
      });
    }
    await knex('standings').insert(standings);
    // console.log(users);
  }
  return console.log(`Loaded data in ${sw.read() / 60000} minutes`);
};

