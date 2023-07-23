const db = require('../models');
const AWS = require('aws-sdk');

const s3 = new AWS.S3();


const createRetro = async (data, imageURL) => {
  let { project_id, title, action_items } = data;
  if (!Array.isArray(action_items)) {
    action_items = [action_items];
  }
  console.log({
    project_id: project_id,
    title: title,
    action_items: action_items,
    image_path: imageURL,
  });
  const result = await db.retro.create({
    project_id: project_id,
    title: title,
    action_items: action_items,
    image_path: imageURL,
  });
  console.log('result');
  console.log(result);
  return result;
};

const getAllRetros = async (project_id) => {
  const retros = await db.retro.findAll({
    where: {
      project_id: project_id,
    },
    order: [['createdAt', 'DESC']],
  });
  return retros;
};

// create an update api for retro
const updateRetro = async (data, imageURL, id) => {
  console.log(id + 'id');
  console.log('data Before parsinng');
  console.log(data);
  let { project_id, title, action_items } = data;
  if (!project_id) {
    const retro = await db.retro.findOne({
      where: {
        id: id,
      },
    });
    project_id = retro.project_id;
  }

  console.log('project_id');
  console.log(title);
  if (!title) {
    const retro = await db.retro.findOne({
      where: {
        id: id,
      },
    });
    title = retro.title;
  }
  // if action_item is not an changed, use the old action_item
  if (!action_items) {
    const retro = await db.retro.findOne({
      where: {
        id: id,
      },
    });
    action_items = retro.action_items;
  }

  //  if action_item is not an array, convert it to an array
  if (!Array.isArray(action_items)) {
    action_items = [action_items];
  }

  // if image is not changed, use the old image
  if (!imageURL) {
    const retro = await db.retro.findOne({
      where: {
        id: id,
      },
    });
    imageURL = retro.image_path;
  }
  else{
    // store the updated image in s3
    const timestamp = new Date().getTime();
    const imageKey = `${timestamp}-${imageURL.originalname}`;
    const uploadParams = {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: imageKey,
      Body: imageURL.buffer,
      ContentEncoding: 'base64',
      ContentType: imageURL.mimetype
    };
    // console.log(uploadParams);
    const s3Data = await s3.upload(uploadParams).promise();
    // Update the data object with the S3 image URL
    imageURL = s3Data.Location;
  }

  const result = await db.retro.update(
    {
      project_id: project_id,
      title: title,
      action_items: action_items,
      image_path: imageURL,
    },
    {
      where: {
        id: id,
      },
    }
  );
  return result;
};

module.exports = {
  createRetro,
  getAllRetros,
  updateRetro,
};
