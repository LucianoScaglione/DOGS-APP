const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Comments', {
    comment: {
      type: DataTypes.STRING,
      allowNull: false
    },
    userId: {
      type: DataTypes.STRING,
    },
  }, { timestamps: false })
}