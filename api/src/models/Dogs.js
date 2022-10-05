const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Dogs', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    weight: {
      type: DataTypes.STRING,
      allowNull: false
    },
    bred_for: {
      type: DataTypes.STRING
    },
    breed_group: {
      type: DataTypes.STRING
    },
    life_span: {
      type: DataTypes.STRING
    },
    temperament: {
      type: DataTypes.STRING
    },
    origin: {
      type: DataTypes.STRING,
      allowNull: false
    },
    image: {
      type: DataTypes.STRING
    },
    createdInDb: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, { timestamps: false })
}