const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const Users = sequelize.define("Users", {
        userId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
    });

    // Define associations
    Users.associate = (models) => {
        Users.hasMany(models.Posts, { foreignKey: "userId" });
    };

    return Users;
};
