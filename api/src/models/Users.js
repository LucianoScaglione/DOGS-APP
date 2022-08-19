const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  sequelize.define('Users', {
    fullname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    photo: {
      type: DataTypes.STRING
    }
  }, { timestamps: false });
};