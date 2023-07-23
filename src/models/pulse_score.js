'use strict';
const {
  Model
} = require('sequelize');
const { v4: uuidv4 } = require('uuid');
module.exports = (sequelize, DataTypes) => {
  class pulse_score extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.project_details, {
        foreignKey: 'project_id',
        targetKey: 'project_id'
      });
    }
  }
  pulse_score.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    project_id: DataTypes.UUID,
    username: DataTypes.STRING,
    score: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'pulse_score',
  });
  pulse_score.beforeCreate((pulse_score) => {
    pulse_score.id = uuidv4();
  });

  return pulse_score;
};