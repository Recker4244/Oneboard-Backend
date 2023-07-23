const Router = require('express').Router();
// const path = require('path');
const retroController = require('../controllers/retroController');
const upload = require('../middlewares/multer');

Router.post('/',upload.single('image'), retroController.createRetro);
  
Router.get('/create/:id', retroController.getRetros);

Router.put('/update/:id', upload.single('image'), retroController.updateRetro);

module.exports = Router;

