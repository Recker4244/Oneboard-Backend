const db = require('../models');

const createBookmark = async (projectId, bookmark) => {
  const result = await db.bookmarks.create({
    project_id: projectId,
    name:bookmark.name,
    link: bookmark.link
  });
  return result;
};

const getBookmarks = async (projectId) => {
  const result = await db.bookmarks.findAll(
    {
      where: {
        project_id: projectId
      }
    }
  );
  return result;
};

module.exports = {
  createBookmark,
  getBookmarks
};