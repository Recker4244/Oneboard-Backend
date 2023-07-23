const retroService = require('../services/retroService');
const AWS = require('aws-sdk');
const s3 = new AWS.S3();

const createRetro = async (req, res) => {
  try {
    // console.log(req.body);
    const data = req.body;
    const image = req.file;
    console.log('image');
    console.log(image);
    const timestamp = new Date().getTime();
    const imageKey = `${timestamp}-${image.originalname}`;

    // Set up the S3 upload parameters
    // console.log(process.env.AWS_S3_BUCKET_NAME);
    const uploadParams = {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: imageKey,
      Body: image.buffer,
      ContentEncoding: 'base64',
      ContentType: image.mimetype
    };
    console.log(uploadParams);
    // Upload the image to S3
    const s3Data = await s3.upload(uploadParams).promise();
    console.log(s3Data);
    // Update the data object with the S3 image URL
    const imageUrl = s3Data.Location;

    console.log('controller');
    console.log(data);
    const result = await retroService.createRetro(data, imageUrl);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
    console.log(error.message);
  }
};

const getRetros = async (req, res) => {
  try {
    const retros = await retroService.getAllRetros(req.params.id);
    res.status(200).json(retros);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateRetro = async (req, res) => {
  try {
    const data = req.body;
    const image = req.file;
    console.log(data);
    const id = req.params.id;
    const result = await retroService.updateRetro(data, image, id);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createRetro,
  getRetros,
  updateRetro,
};
