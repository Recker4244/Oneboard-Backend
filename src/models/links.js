'use strict';
const {
  Model
} = require('sequelize');
const { v4: uuidv4 } = require('uuid');
module.exports = (sequelize, DataTypes) => {
  class links extends Model {
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
  links.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    project_id: DataTypes.UUID,
    link_name: DataTypes.STRING,
    url: DataTypes.STRING,
    base_url: DataTypes.STRING,
    sonar_project_key: DataTypes.STRING,
    token: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'links',
  });

  links.beforeCreate((links) => {
    links.id = uuidv4();
  });
  return links;
};