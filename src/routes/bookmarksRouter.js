const Router = require('express').Router();
const bookmarksController = require('../controllers/bookmarksController');

Router.post('/:id', bookmarksController.createBookmark);

Router.get('/:id', bookmarksController.getBookmarks);

module.exports = Router;
