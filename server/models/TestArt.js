const sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {

    const TestArt = sequelize.define("TestArt", {
        artURL: {
            type: DataTypes.STRING,
            allowNull: false
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        artistName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        dateCreated: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    return TestArt;
}