'use strict';
const {
  Model
} = require('sequelize');
const { v4: uuidv4 } = require('uuid');
module.exports = (sequelize, DataTypes) => {
  class bookmarks extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.project_details, {
        foreignKey: 'project_id',
        targetKey: 'project_id'
      });
    }
  }
  bookmarks.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    project_id: DataTypes.UUID,
    name: DataTypes.STRING,
    link: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'bookmarks',
  });
  bookmarks.beforeCreate((bookmarks) => {
    bookmarks.id = uuidv4();
  });

  return bookmarks;
};