const bookmarksService = require('../services/bookmarksService');

const createBookmark = async (req, res) => {
  try {
    const { id } = req.params;
    const newBookmark = await bookmarksService.createBookmark(id, req.body);
    return res.status(201).json({
      status: 201,
      data: newBookmark,
      message: 'Succesfully Created Bookmark'
    });
  } catch (error) {
    return res.status(500).json({ status: 500, message: error.message });
  }
};

const getBookmarks = async (req, res) => {
  try {
    const { id } = req.params;
    const bookmarks = await bookmarksService.getBookmarks(id);
    if (bookmarks.length === 0) {
      return res.status(404).json({
        status: 404,
        message: 'Bookmarks Not Found'
      });
    }
    return res.status(200).json({
      status: 200,
      data: bookmarks,
      message: 'Succesfully Bookmarks Recieved'
    });
  } catch (error) {
    return res.status(500).json({ status: 500, message: error.message });
  }
};

module.exports = {
  createBookmark,
  getBookmarks
};