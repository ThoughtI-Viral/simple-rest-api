let express = require("express");
let router = express.Router();

let user = require("../controller/user.js");
let post = require("../controller/post.js");

// defining router and contoller
router.get("/users", user.get);
router.get("/users/:id", user.getOne);
router.post("/users", user.post);
router.put("/users/:id", user.put);
router.delete("/users/:id", user.del);

router.get("/posts", post.get);
router.get("/posts/:id", post.getOne);
router.post("/posts", post.post);
router.put("/posts/:id", post.put);
router.delete("/posts/:id", post.del);

module.exports = router;
