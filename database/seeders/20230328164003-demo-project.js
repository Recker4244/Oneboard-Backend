/* eslint-disable no-unused-vars */
'use strict';
const { v4: uuidv4 } = require('uuid');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const projects = await queryInterface.bulkInsert('project_details', [
      {
        id: uuidv4(),
        project_id: uuidv4(),
        project_name: 'Voting System',
        description: 'A voting system for any organization for fair and easy voting',
        start_date: new Date('2023-02-01'),
        end_date: new Date('2023-03-31'),
        charge_codes: ['Ch1234', 'Ch5678'],
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], { returning: ['project_id', 'id'] });
    await queryInterface.bulkInsert('costs', [
      {
        id: uuidv4(),
        project_id: projects[0].project_id,
        cost_type: 'Microsoft Azure',
        amount: 1000,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        project_id: projects[0].project_id,
        cost_type: 'S3 Buckets',
        amount: 2000,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        project_id: projects[0].project_id,
        cost_type: 'Jira Boards',
        amount: 1200,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], { returning: true });

    await queryInterface.bulkInsert('project_events', [
      {
        id: uuidv4(),
        project_id: projects[0].project_id,
        event_name: 'Demo Day -Voting',
        start_date: new Date('2023-04-03'),
        end_date: new Date('2023-04-03'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        project_id: projects[0].project_id,
        event_name: 'Presentation -Voting',
        start_date: new Date('2023-04-05'),
        end_date: new Date('2023-04-05'),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], { returning: true });
    await queryInterface.bulkInsert('retros', [
      {
        id: uuidv4(),
        project_id: projects[0].project_id,
        title: 'Retro 1',
        action_items: ['Action 1', 'Action 2'],
        image_path: 'https://images.ctfassets.net/qop92tnevinq/S9n2otFiBLczU2lax8tWY/5c77101961aee04568b682dbfac08020/RestrospectiveMadSadGlad-preview__1_.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        project_id: projects[0].project_id,
        title: 'Retro 2',
        action_items: ['Action 1', 'Action 2'],
        image_path: 'https://s3.amazonaws.com/thumbnails.venngage.com/template/a7210199-533c-455b-9bdf-9d30ef42fbd4.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        project_id: projects[0].project_id,
        title: 'Retro 3',
        action_items: ['Action 1', 'Action 2'],
        image_path: 'https://conceptboard.com/wp-content/uploads/Header_retro_article_V2-01.png',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], { returning: true });
    await queryInterface.bulkInsert('teams', [
      {
        id: uuidv4(),
        project_id: projects[0].project_id,
        username: 'sneha',
        role: 'Designer',
        key_status: true,
        cost: 500,
        start_date: new Date('2023-03-15'),
        end_date: new Date('2023-03-27'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        project_id: projects[0].project_id,
        username: 'rohit',
        role: 'Architect',
        key_status: true,
        cost: 400,
        start_date: new Date('2023-03-29'),
        end_date: new Date('2023-04-09'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        project_id: projects[0].project_id,
        username: 'sanyam',
        role: 'Jr. Developer',
        key_status: false,
        cost: 150,
        start_date: new Date('2023-03-31'),
        end_date: new Date('2023-04-08'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        project_id: projects[0].project_id,
        username: 'balkar',
        role: 'Sr. Engineer I',
        key_status: false,
        cost: 300,
        start_date: new Date('2023-04-11'),
        end_date: new Date('2023-04-24'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        project_id: projects[0].project_id,
        username: 'siddharth',
        role: 'Sr. Engineer II',
        key_status: false,
        cost: 300,
        start_date: new Date('2023-04-25'),
        end_date: new Date('2023-05-07'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        project_id: projects[0].project_id,
        username: 'anubhav',
        role: 'Engineer II',
        key_status: false,
        cost: 200,
        start_date: new Date('2023-04-25'),
        end_date: new Date('2023-05-07'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        project_id: projects[0].project_id,
        username: 'pratul',
        role: 'Engineer I',
        key_status: false,
        cost: 200,
        start_date: new Date('2023-04-25'),
        end_date: new Date('2023-05-07'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        project_id: projects[0].project_id,
        username: 'ashutosh',
        role: 'Engineer I',
        key_status: false,
        cost: 200,
        start_date: new Date('2023-04-25'),
        end_date: new Date('2023-05-07'),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], { returning: true });
    await queryInterface.bulkInsert('links', [
      {
        id: uuidv4(),
        project_id: projects[0].project_id,
        link_name: 'Backend',
        url: 'https://github.com/dashboardorg2/voting-be.git',
        sonar_project_key: '',
        base_url: '',
        token: '',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        project_id: projects[0].project_id,
        link_name: 'Frontend',
        url: 'https://github.com/dashboardorg2/voting-fe.git',
        sonar_project_key: '',
        base_url: '',
        token: '',
        createdAt: new Date(),
        updatedAt: new Date()
      },

      {
        id: uuidv4(),
        project_id: projects[0].project_id,
        link_name: 'project',
        url: 'https://github.com/orgs/dashboardorg2/projects/1',
        sonar_project_key: '',
        base_url: '',
        token: '',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], { returning: true });
    await queryInterface.bulkInsert('user_leaves', [
      {
        id: uuidv4(),
        project_id: projects[0].project_id,
        username: 'rohit',
        start_date: new Date('2023-03-15'),
        end_date: new Date('2023-03-27'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        project_id: projects[0].project_id,
        username: 'balkar',
        start_date: new Date('2023-04-01'),
        end_date: new Date('2023-04-03'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        project_id: projects[0].project_id,
        username: 'siddharth',
        start_date: new Date('2023-03-30'),
        end_date: new Date('2023-03-31'),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], { returning: true });
    await queryInterface.bulkInsert('bookmarks', [
      {
        id: uuidv4(),
        project_id: projects[0].project_id,
        name: 'Frontend Repo',
        link: 'https://github.com/dashboardorg2/voting-fe.git',
        createdAt: new Date('2023-03-25'),
        updatedAt: new Date('2023-03-25')
      },
      {
        id: uuidv4(),
        project_id: projects[0].project_id,
        name: 'Backend Repo',
        link: 'https://github.com/dashboardorg2/voting-be.git',
        createdAt: new Date('2023-03-25'),
        updatedAt: new Date('2023-03-25')
      },
      {
        id: uuidv4(),
        project_id: projects[0].project_id,
        name: 'Jira Board',
        link: 'https://dashboardorg2.atlassian.net/jira/software/projects/VOT/boards/1',
        createdAt: new Date('2023-03-25'),
        updatedAt: new Date('2023-03-25')
      },
      {
        id: uuidv4(),
        project_id: projects[0].project_id,
        name: 'Box Link',
        link: 'https://app.box.com/folder/123456789',
        createdAt: new Date('2023-03-25'),
        updatedAt: new Date('2023-03-25')
      }
    ], { returning: true });

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('project_details', null, {});
    await queryInterface.bulkDelete('costs', null, {});
    await queryInterface.bulkDelete('links', null, {});
    await queryInterface.bulkDelete('retros', null, {});
    await queryInterface.bulkDelete('teams', null, {});
    await queryInterface.bulkDelete('user_leaves', null, {});
    await queryInterface.bulkDelete('bookmarks', null, {});
  }
};
