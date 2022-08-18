const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('Dogs', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING
        },
        weight: {
            type: DataTypes.STRING
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
            type: DataTypes.STRING
        },
        image: {
            type: DataTypes.STRING
        }
    }, { timestamps: false })
}