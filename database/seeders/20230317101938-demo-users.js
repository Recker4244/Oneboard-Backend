/* eslint-disable no-unused-vars */
"use strict";
const { v4: uuidv4 } = require("uuid");
const generateHashedPassword = require("../../src/utils/hashPass");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const users = await queryInterface.bulkInsert(
      "users",
      [
        {
          id: uuidv4(),
          name: "admin",
          username: "admin",
          email: "admin@gmail.com",
          phoneno: "1234567890",
          github: "",
          role: "admin",
          flag: "",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          username: "sneha",
          name: "Sneha Trivedi",
          email: "Sneha_Trivedi@google.com",
          phoneno: "1234567890",
          github: "SNEHA1009TRIVEDI",
          role: "leadership",
          flag: "purple",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          username: "rohit",
          name: "Rohit Yadav",
          email: "Rohit_Yadav@google.com",
          phoneno: "1234567890",
          github: "meRohitYdv",
          role: "manager",
          flag: "green",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          username: "sanyam",
          name: "Sanyam",
          email: "Sanyam_Sharma@google.com",
          phoneno: "1234567890",
          github: "sanyam9",
          flag: "yellow",
          role: "developer",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          username: "balkar",
          name: "Balkar Singh",
          email: "Balkar_Singh@google.com",
          phoneno: "1234567890",
          github: "13balkar",
          role: "developer",
          flag: "orange",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          username: "siddharth",
          name: "Siddharth",
          email: "Siddharth_Sharma@google.com",
          phoneno: "1234567890",
          github: "sidx255",
          role: "developer",
          flag: "orange",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          username: "ashutosh",
          name: "Ashutosh",
          email: "Ashutosh_Senapati@google.com",
          phoneno: "1234567890",
          github: "ashutoshmck",
          role: "developer",
          flag: "orange",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          username: "pratul",
          name: "Pratul Bhargava",
          email: "Pratul_Bhargava@google.com",
          phoneno: "1234567890",
          github: "Pratul30",
          role: "developer",
          flag: "red",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          username: "anubhav",
          name: "Anubhav",
          email: "Anubhav_Kumar@google.com",
          phoneno: "1234567890",
          github: "findanubhav420",
          role: "developer",
          flag: "red",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          username: "saatvik",
          name: "Saatvik",
          email: "Saatwik_S@google.com",
          phoneno: "1234567890",
          github: "Saatwik-S",
          role: "manager",
          flag: "green",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          username: "shivam",
          name: "Shivam",
          email: "Shivam_Agarwal@google.com",
          github: "xentro-sam",
          role: "developer",
          flag: "orange",
          phoneno: "1234567890",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          username: "ishit",
          github: "ishit-007",
          name: "Ishit Singh",
          email: "Ishit_Singh@google.com",
          role: "developer",
          flag: "orange",
          phoneno: "1234567890",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          username: "kushagra",
          github: "Kushagraved",
          name: "Kushagra Ved",
          email: "Kushagra_Ved_Nigam@google.com",
          role: "developer",
          flag: "orange",
          phoneno: "1234567890",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          username: "souris",
          github: "souris-dev",
          name: "Souris Ash",
          email: "Souris_Ash@google.com",
          role: "developer",
          flag: "red",
          phoneno: "1234567890",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          username: "shreyas",
          github: "shreyas1925",
          name: "Shreyas Shettigar",
          email: "Shreyas_Shettigar@google.com",
          role: "developer",
          flag: "red",
          phoneno: "1234567890",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          username: "yashasva",
          github: "yashasva01",
          name: "Yashasva Sharma",
          email: "Yashasva_Sharma@google.com",
          role: "developer",
          flag: "red",
          phoneno: "1234567890",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          username: "soumil",
          github: "maitra100",
          name: "Soumil Maitra",
          email: "Soumil_Maitra@google.com",
          role: "developer",
          flag: "red",
          phoneno: "1234567890",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      { returning: ["username"] }
    );

    await queryInterface.bulkInsert(
      "credentials",
      [
        {
          id: uuidv4(),
          username: users[0].username,
          password: await generateHashedPassword("admin"),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          username: users[1].username,
          password: await generateHashedPassword("sneha"),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          username: users[2].username,
          password: await generateHashedPassword("rohit"),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          username: users[3].username,
          password: await generateHashedPassword("sanyam"),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          username: users[4].username,
          password: await generateHashedPassword("balkar"),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          username: users[5].username,
          password: await generateHashedPassword("siddharth"),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          username: users[6].username,
          password: await generateHashedPassword("ashutosh"),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          username: users[7].username,
          password: await generateHashedPassword("pratul"),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          username: users[8].username,
          password: await generateHashedPassword("anubhav"),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          username: users[9].username,
          password: await generateHashedPassword("saatvik"),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          username: users[10].username,
          password: await generateHashedPassword("shivam"),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          username: users[11].username,
          password: await generateHashedPassword("ishit"),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          username: users[12].username,
          password: await generateHashedPassword("kushagra"),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          username: users[13].username,
          password: await generateHashedPassword("souris"),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          username: users[14].username,
          password: await generateHashedPassword("shreyas"),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          username: users[15].username,
          password: await generateHashedPassword("yashasva"),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          username: users[16].username,
          password: await generateHashedPassword("soumil"),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      { returning: true }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("credentials", null, {});
    await queryInterface.bulkDelete("users", null, {});
  },
};

//command to run this seed file
