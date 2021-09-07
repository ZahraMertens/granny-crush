const { User, Hobby , 
  // UserHobby , 
  UserMatch } = require('../models');

const userData = require('./userData.json');
const hobbyData = require('./hobbyData.json');
// const userHobbyData = require('./userHobbyData.json');
const userMatchData = require('./userMatchData.json');

const sequelize = require('../config/connection');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });
  console.log('\n----- DATABASE SYNCED -----\n');

  const hobby = await Hobby.bulkCreate(hobbyData)
  console.log('\n----- HOBBIES SEEDED -----\n');

  const user = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });
  console.log('\n----- USERS SEEDED -----\n');
  // const userHobby = await UserHobby.bulkCreate(userHobbyData)
  // console.log('\n----- USER HOBBIES SEEDED -----\n');

  const userMatch = await UserMatch.bulkCreate(userMatchData)
  console.log('\n----- USER MATCHES SEEDED -----\n');

  process.exit(0);
};

seedDatabase();
