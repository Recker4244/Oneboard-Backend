'use strict';
const {
  Model
} = require('sequelize');
const { v4: uuidv4 } = require('uuid');
module.exports = (sequelize, DataTypes) => {
  class teams extends Model {
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
      this.hasMany(models.user_leaves, {
        foreignKey: 'project_id',
        targetKey: 'project_id'
      });
      this.belongsTo(models.users, {
        foreignKey: 'username',
        targetKey: 'username'
      });
    }
  }
  teams.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    project_id: DataTypes.UUID,
    username: DataTypes.STRING,
    role: DataTypes.STRING,
    key_status: DataTypes.BOOLEAN,
    start_date: DataTypes.DATE,
    end_date: DataTypes.DATE,
    cost: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'teams',
  });

  teams.beforeCreate((team) => {
    team.id = uuidv4();
  });
  return teams;
};