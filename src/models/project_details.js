'use strict';
const {
  Model
} = require('sequelize');
const { v4: uuidv4 } = require('uuid');
module.exports = (sequelize, DataTypes) => {
  class project_details extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.retro, {
        foreignKey: 'project_id',
        sourceKey: 'project_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
      this.hasMany(models.cost, {
        foreignKey: 'project_id',
        sourceKey: 'project_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
      this.hasMany(models.teams, {
        foreignKey: 'project_id',
        sourceKey: 'project_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
      this.hasMany(models.links, {
        foreignKey: 'project_id',
        sourceKey: 'project_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
      this.hasMany(models.project_events, {
        foreignKey: 'project_id',
        sourceKey: 'project_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
      this.hasMany(models.pulse_score, {
        foreignKey: 'project_id',
        sourceKey: 'project_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });

    }
  }
  project_details.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    project_id: DataTypes.UUID,
    project_name: DataTypes.STRING,
    description: DataTypes.STRING,
    start_date: DataTypes.DATE,
    end_date: DataTypes.DATE,
    charge_codes: DataTypes.ARRAY(DataTypes.STRING)
  }, {
    sequelize,
    modelName: 'project_details',
  });

  project_details.beforeCreate((project_details) => {
    project_details.id = uuidv4();
    project_details.project_id = uuidv4();
  });
  return project_details;
};