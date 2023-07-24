'use strict';
const bcrypt = require('bcryptjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
      const password = bcrypt.hashSync('password', 10)
      await queryInterface.bulkInsert('Users', [
      {
        name: 'John Doe',
        username: 'admin',
        email: 'admin@gmail.com',
        password: password,
        photo: '/upload/photo/programmer.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ], {});
  
  },

  async down (queryInterface, Sequelize) {
  
    await queryInterface.bulkDelete('Users', null, {});
     
  }
};
