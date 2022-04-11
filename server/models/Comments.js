module.exports = (sequelize, DataTypes) => {

    const Comments = sequelize.define("Comments", {
        commentBody: {
            type: DataTypes.STRING(255),
            allowNull: false
        }
    }, {
        freezeTableName: true,
        timestamps: false
    });

    return Comments;
}