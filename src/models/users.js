'use strict';
const {
  Model
} = require('sequelize');
const { v4: uuidv4 } = require('uuid');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    static associate(models) {
      this.hasOne(models.credentials, {
        foreignKey: 'username',
        sourceKey: 'username',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
      this.hasMany(models.teams, {
        foreignKey: 'username',
        sourceKey: 'username',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });


    }
  }
  users.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    username: DataTypes.STRING,
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    phoneno: DataTypes.STRING,
    github: DataTypes.STRING,
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'users',
  });

  users.beforeCreate((users) => {
    users.id = uuidv4();
  });


  return users;
};