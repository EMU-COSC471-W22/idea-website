module.exports = (sequelize, DataTypes) => {

    const Comments = sequelize.define("Comments", {
        comment_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        comment_body: {
            type: DataTypes.STRING(2200),
            allowNull: false
        }
    }, {
        freezeTableName: true,
        timestamps: false
    });

    return Comments;
}