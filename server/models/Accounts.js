module.exports = (sequelize, DataTypes) => {

    const Accounts = sequelize.define("Accounts", {
        username: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING(1000),
            allowNull: false
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        freezeTableName: true,
        timestamps: false
    });

    Accounts.associate = (models) => {
        /* Gives the art_pieces table the foreign key account_email */
        Accounts.hasMany(models.ArtPieces, {
            onDelete: "CASCADE",
            foreignKey: "account_username"
        });

        /* Gives the comments table the foreign key account_email */
        Accounts.hasMany(models.Comments, {
            onDelete: "CASCADE",
            foreignKey: "account_username"
        });
    }

    return Accounts;
}