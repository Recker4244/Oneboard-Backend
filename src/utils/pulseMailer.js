// const { user, teams } = require('../models/index');
const user = require('../models/index').users;
const teams = require('../models/index').teams;
const { sendMail } = require('./mailer');
const cron = require('node-cron');
require('dotenv').config();
const sender = {
  email: process.env.PULSE_EMAIL,
};



const sendPulseMail = async () => {
  try {
    // cron.schedule('*/10 * * * * *', async () => {
    cron.schedule('0 11 * * 1', async () => {
      const projects = await teams.findAll({ attributes: ['project_id', 'username', 'end_date'] });
      const names = {};
      for (let i = 0; i < projects.length; i++) {
        names[projects[i].dataValues.username] = 1;
      }
      for (let i = 0; i < projects.length; i++) {
        const username = projects[i].dataValues.username;
        if (names[username] === 0) continue;
        const date = new Date(projects[i].dataValues.end_date);
        const today = new Date();
        if (date < today) continue;
        const mail = await user.findOne({ where: { username: username }, attributes: ['email', 'name'] });
        projects[i].dataValues.email = mail.dataValues.email;
        const name = mail.dataValues.name;
        const to = [{
          email: projects[i].dataValues.email,
        }];
        const subject = `${username},Please submit your monthly pulse survey`;
        const htmlContent = `<html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body >
        <div style="max-width: 800px; margin: 0 auto; padding: 40px; padding-bottom: 20px; background-color: #051C2C; color:whitesmoke; box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16); border-radius: 6px; text-align: center;">
          <h1 style="margin: 0 0 20px; font-size: 36px; font-weight: bold; ">Pulse Check</h1>
        <img  style="max-height: 300px; max-width: 300px;" src="https://img.freepik.com/free-photo/collage-customer-experience-concept_23-2149367129.jpg?w=1800&t=st=1680257665~exp=1680258265~hmac=3f48f8b1e50f1cea4b2bfcadce651db1bac1ff969aa34993f141a99a4c79122a" alt="">
        <div style="display: flex; align-items: end">
          <div style="font-size: 65px; color: #2251FF;">D</div>
          <div style="font-size: 25px ;margin-bottom: 15px;">ear ${name}</div>
        </div>
        <p style="margin: 0 0 20px; font-size: 20px;text-align: justify;">We appreciate your continued input, it is important for us to know how you’re feeling, whether times are good or uncertain. Thank you for the care you are showing one another and for offering your perspectives each week.</p>
        <h2 style="margin: 0 0 20px; font-size: 28px; font-weight: bold; ">How are you feeling?</h2>
        <div style="display: flex; justify-content: center;">
          <a href="http://localhost:3000/pulse?username=${username}&project_id=${projects[i].dataValues.project_id}&pulse=5" style="text-decoration: none; margin-right: 20px; font-size:70px;">🤗</a>
          <a href="http://localhost:3000/pulse?username=${username}&project_id=${projects[i].dataValues.project_id}&pulse=3" style="text-decoration: none; margin-right: 20px; font-size:70px;">🙂</a>
          <a href="http://localhost:3000/pulse?username=${username}&project_id=${projects[i].dataValues.project_id}&pulse=1" style="text-decoration: none; font-size:70px;">😖</a>
        </div>
        <div style="display: flex; justify-content: space-between;">
          <p>Powered by @OneBoard</p>
          <img style="max-height: 40px; max-width: 50px;" src="https://retro-image.s3.amazonaws.com/logoDark.png" alt="">
        </div>
      </div>
      </body>
      </html>`;
        names[username] = 0;
        await sendMail(sender, to, subject, htmlContent);
      }
    });
  }
  catch (err) {
    console.log(err);
  }
};

module.exports = sendPulseMail;