const faker = require('faker');

module.exports = {
  up: queryInterface => {
    const newData = [];

    for (let i = 1; i <= 80; i++) {
      const seedData = {
        name: faker.name.findName(),
        email: faker.internet.email(),
        age: faker.random.number({ min: 16, max: 69 }),
        weight: faker.random.number({ min: 50, max: 120, precision: 0.01 }),
        height: faker.random.number({ min: 1.4, max: 2.1, precision: 0.01 }),
        created_at: new Date(),
        updated_at: new Date(),
      };
      newData.push(seedData);
    }

    return queryInterface.bulkInsert('students', newData);
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('students', null, {});
  },
};
