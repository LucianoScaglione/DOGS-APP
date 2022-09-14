const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Comments', {
    comment: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, { timestamps: false })
}