const { Sequelize } = require("sequelize");

const UsersModel = require("./Users");
const PostsModel = require("./Posts");

const sequelize = new Sequelize({
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    dialect: "mysql",
});

const Users = UsersModel(sequelize);
const Posts = PostsModel(sequelize);

// Define associations
Users.hasMany(Posts, { foreignKey: "userId" });
Posts.belongsTo(Users, { foreignKey: "userId" });

module.exports = {
    sequelize,
    Users,
    Posts,
};
