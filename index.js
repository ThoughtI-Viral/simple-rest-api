require("dotenv").config();

let express = require("express");
let router = require("./app/router/router.js");
let { sequelize } = require("./app/models/index");

let app = express();

app.use(express.json());
app.use(express.static("public"));
app.use("/api/v1", router);

app.listen(process.env.PORT, function () {
    console.log("App listening on port 8080...");
});

sequelize
    .sync()
    .then(() => {
        console.log("Database connected");
    })
    .catch((reason) => console.log("Fail to connect database", reason));
