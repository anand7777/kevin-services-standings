const data = require('../index');

const faker = require('faker');
const Stopwatch = require('statman-stopwatch');

const sw = new Stopwatch(true);



const load = async () => {
  // Deletes ALL existing entries
  await data.Standings.deleteMany((err) => {
    if(err) {
      console.log('An error occured while removing Standings.')
        console.log('Error:  ', err);
      }
  });
  // Inserts seed entries
  for (let i = 1; i < 1001; i++) {
    // console.log(i);
    const standings = [];
    for (let j = 0; j < 10000; j++) {
      standings.push({
        team_name: faker.random.word(),
        division: faker.company.companyName(),
        tie: faker.random.number({ min: 0, max: 3 }),
        wins: faker.random.number({ min: 0, max: 16 }),
        losses: faker.random.number({ min: 0, max: 16 }),
        percentage: faker.random.number({ min: 0, max: 100 }) / 100,
        points_for: faker.random.number({ min: 2, max: 800 }),
        points_against: faker.random.number({ min: 2, max: 800 }),
        team_logo: faker.image.sports(100, 100),
      });
    }

    await data.Standings.insertMany(standings, (err) => {
      if(err) {
        console.log('An error occured while loading Standings.')
        console.log('Error:  ', err);
      }
    });
    // console.log(users);
    // console.log(`${i * 1000000} and counting...`)
  }
  return console.log(`Loaded data in ${sw.read() / 60000} minutes`);
};

load();
