require("dotenv").config();

let express = require("express");
let router = require("./app/router/router.js");

let app = express();

app.use(express.json());
app.use(express.static("public"));
app.use("/api/v1", router);

app.listen(8080, function () {
    console.log("App listening on port 8080...");
});
