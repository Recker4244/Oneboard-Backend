/* eslint-disable no-unused-vars */
"use strict";
const { v4: uuidv4 } = require("uuid");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const projects = await queryInterface.bulkInsert(
      "project_details",
      [
        {
          id: uuidv4(),
          project_id: uuidv4(),
          project_name: "Developer Dashboard",
          description:
            "Developer Dashboard is a web application that allows users to view their project stats at one place.",
          charge_codes: ["Ch1234", "Ch5678"],
          start_date: new Date("2023-01-01"),
          end_date: new Date("2023-06-25"),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      { returning: ["project_id", "id"] }
    );
    await queryInterface.bulkInsert(
      "costs",
      [
        {
          id: uuidv4(),
          project_id: projects[0].project_id,
          cost_type: "Microsoft Azure",
          amount: 600,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          project_id: projects[0].project_id,
          cost_type: "S3 Bucket",
          amount: 800,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          project_id: projects[0].project_id,
          cost_type: "SonarQube",
          amount: 300,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      { returning: true }
    );

    await queryInterface.bulkInsert(
      "links",
      [
        {
          id: uuidv4(),
          project_id: projects[0].project_id,
          link_name: "Backend",
          url: "https://github.com/tech-university-india/developer-dashboard-backend.git",
          sonar_project_key: "DD",
          base_url: "http://localhost:9000",
          token: "c3F1X2QyZjMwODljNjJjNWQyNmYwZDdjOGI2YmIzNzIxZDlmY2JiMjBhOTk6",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          project_id: projects[0].project_id,
          link_name: "Frontend",
          url: "https://github.com/tech-university-india/developer-dashboard-frontend.git",
          sonar_project_key: "DD-frontend",
          base_url: "http://localhost:9000",
          token: "c3F1X2QyZjMwODljNjJjNWQyNmYwZDdjOGI2YmIzNzIxZDlmY2JiMjBhOTk6",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          project_id: projects[0].project_id,
          link_name: "project",
          url: "https://github.com/orgs/tech-university-india/projects/5",
          sonar_project_key: "DD",
          base_url: "http://localhost:9000",
          token: "c3F1X2QyZjMwODljNjJjNWQyNmYwZDdjOGI2YmIzNzIxZDlmY2JiMjBhOTk6",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      { returning: true }
    );

    await queryInterface.bulkInsert(
      "project_events",
      [
        {
          id: uuidv4(),
          project_id: projects[0].project_id,
          event_name: "Demo Day",
          start_date: new Date("2023-03-31"),
          end_date: new Date("2023-03-31"),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          project_id: projects[0].project_id,
          event_name: "Final Presentation",
          start_date: new Date("2023-04-01"),
          end_date: new Date("2023-04-01"),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      { returning: true }
    );

    await queryInterface.bulkInsert(
      "retros",
      [
        {
          id: uuidv4(),
          project_id: projects[0].project_id,
          title: "Retro 1",
          action_items: ["Action 1", "Action 2"],
          image_path:
            "https://retro-image.s3.amazonaws.com/Screenshot+2023-04-03+at+4.21.13+PM.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          project_id: projects[0].project_id,
          title: "Retro 2",
          action_items: ["Action 1", "Action 2"],
          image_path:
            "https://retro-image.s3.amazonaws.com/Screenshot+2023-04-03+at+3.06.20+PM.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          project_id: projects[0].project_id,
          title: "Retro 3",
          action_items: ["Action 1", "Action 2", "Action 3"],
          image_path:
            "https://retro-image.s3.amazonaws.com/Screenshot+2023-04-03+at+4.06.15+PM.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      { returning: true }
    );

    await queryInterface.bulkInsert(
      "teams",
      [
        {
          id: uuidv4(),
          project_id: projects[0].project_id,
          username: "ashutosh",
          role: "SDE Intern",
          key_status: true,
          cost: 100,
          start_date: new Date("2023-03-15"),
          end_date: new Date("2023-03-27"),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          project_id: projects[0].project_id,
          username: "sneha",
          role: "Designer",
          key_status: true,
          cost: 500,
          start_date: new Date("2023-01-01"),
          end_date: new Date("2023-06-25"),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          project_id: projects[0].project_id,
          username: "rohit",
          role: "Architect",
          key_status: true,
          cost: 400,
          start_date: new Date("2023-03-29"),
          end_date: new Date("2023-04-09"),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          project_id: projects[0].project_id,
          username: "sanyam",
          role: "Jr. Engineer",
          key_status: false,
          cost: 150,
          start_date: new Date("2023-03-31"),
          end_date: new Date("2023-04-08"),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          project_id: projects[0].project_id,
          username: "balkar",
          role: "Sr. Engineer I",
          key_status: false,
          cost: 250,
          start_date: new Date("2023-04-11"),
          end_date: new Date("2023-04-24"),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          project_id: projects[0].project_id,
          username: "siddharth",
          role: "Sr. Engineer II",
          key_status: false,
          cost: 300,
          start_date: new Date("2023-04-25"),
          end_date: new Date("2023-05-07"),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          project_id: projects[0].project_id,
          username: "anubhav",
          role: "Engineer II",
          key_status: false,
          cost: 200,
          start_date: new Date("2023-04-25"),
          end_date: new Date("2023-05-07"),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          project_id: projects[0].project_id,
          username: "pratul",
          role: "Engineer I",
          key_status: false,
          cost: 200,
          start_date: new Date("2023-04-25"),
          end_date: new Date("2023-05-07"),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      { returning: true }
    );

    await queryInterface.bulkInsert(
      "pulse_scores",
      [
        {
          id: uuidv4(),
          project_id: projects[0].project_id,
          username: "sneha",
          score: 4,
          createdAt: new Date("2023-01-01"),
          updatedAt: new Date("2023-06-25"),
        },
        {
          id: uuidv4(),
          project_id: projects[0].project_id,
          username: "sneha",
          score: 5,
          createdAt: new Date("2023-01-01"),
          updatedAt: new Date("2023-02-25"),
        },
        {
          id: uuidv4(),
          project_id: projects[0].project_id,
          username: "sneha",
          score: 2,
          createdAt: new Date("2023-01-01"),
          updatedAt: new Date("2023-06-25"),
        },
        {
          id: uuidv4(),
          project_id: projects[0].project_id,
          username: "sneha",
          score: 4,
          createdAt: new Date("2023-01-01"),
          updatedAt: new Date("2023-06-25"),
        },
        {
          id: uuidv4(),
          project_id: projects[0].project_id,
          username: "sneha",
          score: 1,
          createdAt: new Date("2023-01-01"),
          updatedAt: new Date("2023-05-25"),
        },
        {
          id: uuidv4(),
          project_id: projects[0].project_id,
          username: "sneha",
          score: 5,
          createdAt: new Date("2023-01-01"),
          updatedAt: new Date("2023-06-25"),
        },
        {
          id: uuidv4(),
          project_id: projects[0].project_id,
          username: "sneha",
          score: 3,
          createdAt: new Date("2023-01-01"),
          updatedAt: new Date("2023-06-25"),
        },
        {
          id: uuidv4(),
          project_id: projects[0].project_id,
          username: "rohit",
          score: 4,
          createdAt: new Date("2023-01-25"),
          updatedAt: new Date("2023-01-25"),
        },
        {
          id: uuidv4(),
          project_id: projects[0].project_id,
          username: "rohit",
          score: 5,
          createdAt: new Date("2023-02-25"),
          updatedAt: new Date("2023-02-25"),
        },
        {
          id: uuidv4(),
          project_id: projects[0].project_id,
          username: "rohit",
          score: 5,
          createdAt: new Date("2023-03-25"),
          updatedAt: new Date("2023-03-25"),
        },
        {
          id: uuidv4(),
          project_id: projects[0].project_id,
          username: "rohit",
          score: 3,
          createdAt: new Date("2023-04-25"),
          updatedAt: new Date("2023-04-25"),
        },
        {
          id: uuidv4(),
          project_id: projects[0].project_id,
          username: "rohit",
          score: 3,
          createdAt: new Date("2023-05-25"),
          updatedAt: new Date("2023-05-25"),
        },
        {
          id: uuidv4(),
          project_id: projects[0].project_id,
          username: "rohit",
          score: 2,
          createdAt: new Date("2023-06-25"),
          updatedAt: new Date("2023-06-25"),
        },
        {
          id: uuidv4(),
          project_id: projects[0].project_id,
          username: "rohit",
          score: 4,
          createdAt: new Date("2023-08-25"),
          updatedAt: new Date("2023-08-25"),
        },
        {
          id: uuidv4(),
          project_id: projects[0].project_id,
          username: "balkar",
          score: 4,
          createdAt: new Date("2023-01-25"),
          updatedAt: new Date("2023-01-25"),
        },
        {
          id: uuidv4(),
          project_id: projects[0].project_id,
          username: "balkar",
          score: 4,
          createdAt: new Date("2023-02-25"),
          updatedAt: new Date("2023-02-25"),
        },
        {
          id: uuidv4(),
          project_id: projects[0].project_id,
          username: "balkar",
          score: 2,
          createdAt: new Date("2023-03-25"),
          updatedAt: new Date("2023-03-25"),
        },
        {
          id: uuidv4(),
          project_id: projects[0].project_id,
          username: "balkar",
          score: 3,
          createdAt: new Date("2023-04-25"),
          updatedAt: new Date("2023-04-25"),
        },
        {
          id: uuidv4(),
          project_id: projects[0].project_id,
          username: "balkar",
          score: 5,
          createdAt: new Date("2023-05-25"),
          updatedAt: new Date("2023-05-25"),
        },
        {
          id: uuidv4(),
          project_id: projects[0].project_id,
          username: "balkar",
          score: 4,
          createdAt: new Date("2023-06-25"),
          updatedAt: new Date("2023-06-25"),
        },
        {
          id: uuidv4(),
          project_id: projects[0].project_id,
          username: "balkar",
          score: 1,
          createdAt: new Date("2023-07-25"),
          updatedAt: new Date("2023-07-25"),
        },
        {
          id: uuidv4(),
          project_id: projects[0].project_id,
          username: "balkar",
          score: 3,
          createdAt: new Date("2023-08-25"),
          updatedAt: new Date("2023-08-25"),
        },
        {
          id: uuidv4(),
          project_id: projects[0].project_id,
          username: "balkar",
          score: 5,
          createdAt: new Date("2023-09-25"),
          updatedAt: new Date("2023-09-25"),
        },
        {
          id: uuidv4(),
          project_id: projects[0].project_id,
          username: "balkar",
          score: 3,
          createdAt: new Date("2023-10-25"),
          updatedAt: new Date("2023-10-25"),
        },
        {
          id: uuidv4(),
          project_id: projects[0].project_id,
          username: "balkar",
          score: 4,
          createdAt: new Date("2023-11-25"),
          updatedAt: new Date("2023-11-25"),
        },
      ],
      { returning: true }
    );

    await queryInterface.bulkInsert(
      "user_leaves",
      [
        {
          id: uuidv4(),
          project_id: projects[0].project_id,
          username: "sneha",
          start_date: new Date("2023-01-01"),
          end_date: new Date("2023-06-25"),
          createdAt: new Date("2023-03-25"),
          updatedAt: new Date("2023-03-25"),
        },
        {
          id: uuidv4(),
          project_id: projects[0].project_id,
          username: "sanyam",
          start_date: new Date("2023-03-10"),
          end_date: new Date("2023-03-15"),
          createdAt: new Date("2023-03-25"),
          updatedAt: new Date("2023-03-25"),
        },
      ],
      { returning: true }
    );

    await queryInterface.bulkInsert(
      "bookmarks",
      [
        {
          id: uuidv4(),
          project_id: projects[0].project_id,
          name: "Frontend Repo",
          link: "https://github.com/tech-university-india/developer-dashboard-frontend",
          createdAt: new Date("2023-03-25"),
          updatedAt: new Date("2023-03-25"),
        },
        {
          id: uuidv4(),
          project_id: projects[0].project_id,
          name: "Backend Repo",
          link: "https://github.com/tech-university-india/developer-dashboard-backend",
          createdAt: new Date("2023-03-25"),
          updatedAt: new Date("2023-03-25"),
        },
        {
          id: uuidv4(),
          project_id: projects[0].project_id,
          name: "Box Link",
          link: "https://google.ent.box.com/folder/190376865977?s=2cvozldxtbujtxf54dhq9htfq819zbcv",
          createdAt: new Date("2023-03-25"),
          updatedAt: new Date("2023-03-25"),
        },
        {
          id: uuidv4(),
          project_id: projects[0].project_id,
          name: "Miro Board",
          link: "https://miro.com/app/board/uXjVPjqgfjY=/",
          createdAt: new Date("2023-03-25"),
          updatedAt: new Date("2023-03-25"),
        },
        {
          id: uuidv4(),
          project_id: projects[0].project_id,
          name: "Task List",
          link: "https://google.ent.box.com/file/1150880042615?s=glb0nlp4ui5w89w9lnjqsc60k4mct13a",
          createdAt: new Date("2023-03-25"),
          updatedAt: new Date("2023-03-25"),
        },
      ],
      { returning: true }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("project_details", null, {});
    await queryInterface.bulkDelete("costs", null, {});
    await queryInterface.bulkDelete("links", null, {});
    await queryInterface.bulkDelete("retros", null, {});
    await queryInterface.bulkDelete("teams", null, {});
    await queryInterface.bulkDelete("pulse_scores", null, {});
    await queryInterface.bulkDelete("user_leaves", null, {});
    await queryInterface.bulkDelete("bookmarks", null, {});
  },
};

//npx sequelize-cli db:seed --seed 20230319112931-demo-projects.js
//npx sequelize-cli seed:generate --name demo-projects
