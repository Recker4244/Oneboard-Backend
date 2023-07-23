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
        project_name: 'Unified Health Interface',
        description: 'Unified Health Interface is a web application that allows users to view their health records and health insurance information in one place.',
        start_date: new Date('2023-01-01'),
        end_date: new Date('2023-05-31'),
        charge_codes:['Ch1234', 'Ch5678'],
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], { returning: ['project_id', 'id'] });
    await queryInterface.bulkInsert('costs', [
      {
        id: uuidv4(),
        project_id: projects[0].project_id,
        cost_type: 'Microsoft Azure',
        amount: 600,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        project_id: projects[0].project_id,
        cost_type: 'S3 Bucket',
        amount: 800,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        project_id: projects[0].project_id,
        cost_type: 'SonarQube',
        amount: 300,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], { returning: true });
    await queryInterface.bulkInsert('links', [
      {
        id: uuidv4(),
        project_id: projects[0].project_id,
        link_name: 'Backend',
        url: 'https://github.com/tech-university-india/uhi-onboarding-backend.git',
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
        url: 'https://github.com/tech-university-india/uhi-onboarding-frontend.git',
        sonar_project_key: '',
        base_url: '',
        token: '',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        project_id: projects[0].project_id,
        link_name: 'Documentation',
        url: 'https://github.com/tech-university-india/uhi-documentation-site.git',
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
        url: 'https://github.com/orgs/tech-university-india/projects/1',
        sonar_project_key: '',
        base_url: '',
        token: '',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], { returning: true });
    await queryInterface.bulkInsert('project_events', [
      {
        id: uuidv4(),
        project_id: projects[0].project_id,
        event_name: 'Team Formation',
        start_date: new Date('2023-03-30'),
        end_date: new Date('2023-03-30'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        project_id: projects[0].project_id,
        event_name: 'Evaluation',
        start_date: new Date('2023-04-01'),
        end_date: new Date('2023-04-01'),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], { returning: true });
    await queryInterface.bulkInsert('bookmarks', [
      {
        id: uuidv4(),
        project_id: projects[0].project_id,
        name: 'Frontend Repo',
        link: 'https://github.com/tech-university-india/uhi-onboarding-frontend.git',
        createdAt: new Date('2023-03-25'),
        updatedAt: new Date('2023-03-25')
      },
      {
        id: uuidv4(),
        project_id: projects[0].project_id,
        name: 'Backend Repo',
        link: 'https://github.com/tech-university-india/uhi-onboarding-backend.git',
        createdAt: new Date('2023-03-25'),
        updatedAt: new Date('2023-03-25')
      },
      {
        id: uuidv4(),
        project_id: projects[0].project_id,
        name: 'Documentation Repo',
        link: 'https://github.com/tech-university-india/uhi-documentation-site.git',
        createdAt: new Date('2023-03-25'),
        updatedAt: new Date('2023-03-25')
      }
    ], { returning: true });
    await queryInterface.bulkInsert('teams', [
      {
        id: uuidv4(),
        project_id: projects[0].project_id,
        username: 'sneha',
        role: 'Designer',
        key_status: true,
        cost: 400,
        start_date: new Date('2023-03-15'),
        end_date: new Date('2023-03-27'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        project_id: projects[0].project_id,
        username: 'saatvik',
        role: 'Architect',
        key_status: true,
        cost: 300,
        start_date: new Date('2023-03-29'),
        end_date: new Date('2023-04-09'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        project_id: projects[0].project_id,
        username: 'shivam',
        role: 'Sr. Engineer I',
        key_status: true,
        cost: 250,
        start_date: new Date('2023-03-31'),
        end_date: new Date('2023-04-08'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        project_id: projects[0].project_id,
        username: 'ishit',
        role: 'Sr. Engineer II',
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
        username: 'kushagra',
        role: 'Engineer I',
        key_status: false,
        cost: 2200,
        start_date: new Date('2023-04-25'),
        end_date: new Date('2023-05-07'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        project_id: projects[0].project_id,
        username: 'souris',
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
        username: 'shreyas',
        role: 'Sr. Analyst',
        key_status: false,
        cost: 250,
        start_date: new Date('2023-04-25'),
        end_date: new Date('2023-05-07'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        project_id: projects[0].project_id,
        username: 'yashasva',
        role: 'Analyst',
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
        username: 'soumil',
        role: 'Engineer II',
        key_status: false,
        cost: 200,
        start_date: new Date('2023-04-25'),
        end_date: new Date('2023-05-07'),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], { returning: true });
    await queryInterface.bulkInsert('pulse_scores', [
      {
        id: uuidv4(),
        project_id: projects[0].project_id,
        username: 'sneha',
        score: 4,
        createdAt: new Date('2023-01-25'),
        updatedAt: new Date('2023-01-25')
      },
      {
        id: uuidv4(),
        project_id: projects[0].project_id,
        username: 'sneha',
        score: 5,
        createdAt: new Date('2023-02-25'),
        updatedAt: new Date('2023-02-25')
      },
      {
        id: uuidv4(),
        project_id: projects[0].project_id,
        username: 'sneha',
        score: 2,
        createdAt: new Date('2023-03-25'),
        updatedAt: new Date('2023-03-25')
      },
      {
        id: uuidv4(),
        project_id: projects[0].project_id,
        username: 'sneha',
        score: 4,
        createdAt: new Date('2023-04-25'),
        updatedAt: new Date('2023-04-25')
      },
      {
        id: uuidv4(),
        project_id: projects[0].project_id,
        username: 'sneha',
        score: 1,
        createdAt: new Date('2023-05-25'),
        updatedAt: new Date('2023-05-25')
      },
      {
        id: uuidv4(),
        project_id: projects[0].project_id,
        username: 'sneha',
        score: 5,
        createdAt: new Date('2023-06-25'),
        updatedAt: new Date('2023-06-25')
      },
      {
        id: uuidv4(),
        project_id: projects[0].project_id,
        username: 'sneha',
        score: 3,
        createdAt: new Date('2023-07-25'),
        updatedAt: new Date('2023-07-25')
      },
      {
        id: uuidv4(),
        project_id: projects[0].project_id,
        username: 'saatvik',
        score: 4,
        createdAt: new Date('2023-01-25'),
        updatedAt: new Date('2023-01-25')
      },
      {
        id: uuidv4(),
        project_id: projects[0].project_id,
        username: 'saatvik',
        score: 5,
        createdAt: new Date('2023-02-25'),
        updatedAt: new Date('2023-02-25')
      },
      {
        id: uuidv4(),
        project_id: projects[0].project_id,
        username: 'saatvik',
        score: 5,
        createdAt: new Date('2023-03-25'),
        updatedAt: new Date('2023-03-25')
      },
      {
        id: uuidv4(),
        project_id: projects[0].project_id,
        username: 'saatvik',
        score: 3,
        createdAt: new Date('2023-04-25'),
        updatedAt: new Date('2023-04-25')
      },
      {
        id: uuidv4(),
        project_id: projects[0].project_id,
        username: 'saatvik',
        score: 3,
        createdAt: new Date('2023-05-25'),
        updatedAt: new Date('2023-05-25')
      },
      {
        id: uuidv4(),
        project_id: projects[0].project_id,
        username: 'saatvik',
        score: 2,
        createdAt: new Date('2023-06-25'),
        updatedAt: new Date('2023-06-25')
      },
      {
        id: uuidv4(),
        project_id: projects[0].project_id,
        username: 'saatvik',
        score: 4,
        createdAt: new Date('2023-08-25'),
        updatedAt: new Date('2023-08-25')
      },
      {
        id: uuidv4(),
        project_id: projects[0].project_id,
        username: 'shivam',
        score: 4,
        createdAt: new Date('2023-01-25'),
        updatedAt: new Date('2023-01-25')
      },
      {
        id: uuidv4(),
        project_id: projects[0].project_id,
        username: 'shivam',
        score: 4,
        createdAt: new Date('2023-02-25'),
        updatedAt: new Date('2023-02-25')
      },
      {
        id: uuidv4(),
        project_id: projects[0].project_id,
        username: 'shivam',
        score: 2,
        createdAt: new Date('2023-03-25'),
        updatedAt: new Date('2023-03-25')
      },
      {
        id: uuidv4(),
        project_id: projects[0].project_id,
        username: 'shivam',
        score: 3,
        createdAt: new Date('2023-04-25'),
        updatedAt: new Date('2023-04-25')
      },
      {
        id: uuidv4(),
        project_id: projects[0].project_id,
        username: 'shivam',
        score: 5,
        createdAt: new Date('2023-05-25'),
        updatedAt: new Date('2023-05-25')
      },
      {
        id: uuidv4(),
        project_id: projects[0].project_id,
        username: 'ishit',
        score: 4,
        createdAt: new Date('2023-06-25'),
        updatedAt: new Date('2023-06-25')
      },
      {
        id: uuidv4(),
        project_id: projects[0].project_id,
        username: 'ishit',
        score: 1,
        createdAt: new Date('2023-07-25'),
        updatedAt: new Date('2023-07-25')
      },
      {
        id: uuidv4(),
        project_id: projects[0].project_id,
        username: 'ishit',
        score: 3,
        createdAt: new Date('2023-08-25'),
        updatedAt: new Date('2023-08-25')
      },
      {
        id: uuidv4(),
        project_id: projects[0].project_id,
        username: 'ishit',
        score: 5,
        createdAt: new Date('2023-09-25'),
        updatedAt: new Date('2023-09-25')
      },
      {
        id: uuidv4(),
        project_id: projects[0].project_id,
        username: 'ishit',
        score: 3,
        createdAt: new Date('2023-10-25'),
        updatedAt: new Date('2023-10-25')
      },
      {
        id: uuidv4(),
        project_id: projects[0].project_id,
        username: 'ishit',
        score: 4,
        createdAt: new Date('2023-11-25'),
        updatedAt: new Date('2023-11-25')
      },
      {
        id: uuidv4(),
        project_id: projects[0].project_id,
        username: 'kushagra',
        score: 2,
        createdAt: new Date('2023-03-25'),
        updatedAt: new Date('2023-03-25')
      },
      {
        id: uuidv4(),
        project_id: projects[0].project_id,
        username: 'kushagra',
        score: 3,
        createdAt: new Date('2023-04-25'),
        updatedAt: new Date('2023-04-25')
      },
      {
        id: uuidv4(),
        project_id: projects[0].project_id,
        username: 'kushagra',
        score: 5,
        createdAt: new Date('2023-05-25'),
        updatedAt: new Date('2023-05-25')
      },
      {
        id: uuidv4(),
        project_id: projects[0].project_id,
        username: 'kushagra',
        score: 4,
        createdAt: new Date('2023-06-25'),
        updatedAt: new Date('2023-06-25')
      },
      {
        id: uuidv4(),
        project_id: projects[0].project_id,
        username: 'kushagra',
        score: 1,
        createdAt: new Date('2023-07-25'),
        updatedAt: new Date('2023-07-25')
      },
      {
        id: uuidv4(),
        project_id: projects[0].project_id,
        username: 'kushagra',
        score: 3,
        createdAt: new Date('2023-08-25'),
        updatedAt: new Date('2023-08-25')
      },
      {
        id: uuidv4(),
        project_id: projects[0].project_id,
        username: 'souris',
        score: 3,
        createdAt: new Date('2023-05-25'),
        updatedAt: new Date('2023-05-25')
      },
      {
        id: uuidv4(),
        project_id: projects[0].project_id,
        username: 'souris',
        score: 2,
        createdAt: new Date('2023-06-25'),
        updatedAt: new Date('2023-06-25')
      },
      {
        id: uuidv4(),
        project_id: projects[0].project_id,
        username: 'souris',
        score: 4,
        createdAt: new Date('2023-08-25'),
        updatedAt: new Date('2023-08-25')
      },
      {
        id: uuidv4(),
        project_id: projects[0].project_id,
        username: 'souris',
        score: 4,
        createdAt: new Date('2023-01-25'),
        updatedAt: new Date('2023-01-25')
      },
      {
        id: uuidv4(),
        project_id: projects[0].project_id,
        username: 'shreyas',
        score: 4,
        createdAt: new Date('2023-02-25'),
        updatedAt: new Date('2023-02-25')
      },
      {
        id: uuidv4(),
        project_id: projects[0].project_id,
        username: 'shreyas',
        score: 2,
        createdAt: new Date('2023-03-25'),
        updatedAt: new Date('2023-03-25')
      },
      {
        id: uuidv4(),
        project_id: projects[0].project_id,
        username: 'shreyas',
        score: 3,
        createdAt: new Date('2023-04-25'),
        updatedAt: new Date('2023-04-25')
      },

    ], { returning: true });
    await queryInterface.bulkInsert('user_leaves', [
      {
        id: uuidv4(),
        project_id: projects[0].project_id,
        username: 'saatvik',
        start_date: new Date('2023-03-02'),
        end_date: new Date('2023-03-07'),
        createdAt: new Date('2023-03-25'),
        updatedAt: new Date('2023-03-25')
      },
      {
        id: uuidv4(),
        project_id: projects[0].project_id,
        username: 'sanyam',
        start_date: new Date('2023-03-18'),
        end_date: new Date('2023-03-21'),
        createdAt: new Date('2023-03-25'),
        updatedAt: new Date('2023-03-25')
      }
    ], { returning: true });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('project_details', null, {});
    await queryInterface.bulkDelete('costs', null, {});
    await queryInterface.bulkDelete('links', null, {});
    // await queryInterface.bulkDelete('retros', null, {});
    await queryInterface.bulkDelete('teams', null, {});
    await queryInterface.bulkDelete('pulse_scores', null, {});
    await queryInterface.bulkDelete('user_leaves', null, {});
    await queryInterface.bulkDelete('bookmarks', null, {});
  }
};
