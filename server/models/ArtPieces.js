module.exports = (sequelize, DataTypes) => {

    const ArtPieces = sequelize.define("ArtPieces", {
        art_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        art_url: {
            type: DataTypes.STRING(1000),
            allowNull: false
        },
        title: {
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

    ArtPieces.associate = (models) => {
        /* Gives the comments table the foreign key art_id */
        ArtPieces.hasMany(models.Comments, {
            onDelete: "CASCADE",
            foreignKey: "art_id"
        });
    }

    return ArtPieces;
}