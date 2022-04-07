const sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {

    const TestRequests = sequelize.define("TestRequests", {
        artId: {
           type: DataTypes.INTEGER,
           autoIncrement: true,
           primaryKey: true 
        },
        artURL: {
            type: DataTypes.STRING(1234),
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
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        timestamps: false,
        freezeTableName: true
    });

    return TestRequests;
}