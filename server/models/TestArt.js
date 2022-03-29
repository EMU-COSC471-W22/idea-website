const sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {

    const TestArt = sequelize.define("TestArt", {
        art_url: {
            type: DataTypes.STRING,
            allowNull: false
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        artist_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        date_created: {
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