module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define("Users",{
        username: {
            type: DataTypes.String,
            allowNull: false,
        },
        
        password: {
            type: DataTypes.String,
            allowNull: false,
        },
    });

    Users.associate = (models) => {
        Users.hasMany(models.Posts, {
            onDelete: "casscade",
        });
    };
    return Users;
};