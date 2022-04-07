module.exports = (sequelize, DataTypes) => {

    const ArtPieces = sequelize.define("ArtPieces", {
        artId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        artURL: {
            type: DataTypes.STRING(1000),
            allowNull: false
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING(280),
            allowNull:false
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        freezeTableName: true,
        timestamps: false
    });

    return ArtPieces;
}