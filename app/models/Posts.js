// models/Post.js
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const Posts = sequelize.define("Posts", {
        postId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    });

    // Define associations
    Posts.associate = (models) => {
        Posts.belongsTo(models.Users, {
            foreignKey: "userId",
            onDelete: "CASCADE",
        });
    };

    return Posts;
};
