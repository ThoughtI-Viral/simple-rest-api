let express = require("express");
let router = express.Router();

// importing controller
let user = require("../controller/user.js");
let post = require("../controller/post.js");

// importing middleware
let duplicateEmail = require("../middleware/duplicateEmail.js");
let duplicatePost = require("../middleware/duplicatePost.js");

// defining router and contoller
router.get("/users", user.get);
router.get("/users/:id", user.getOne);
router.post("/users", duplicateEmail, user.post);
router.put("/users/:id", duplicateEmail, user.put);
router.delete("/users/:id", user.del);

router.get("/posts", post.get);
router.get("/posts/:id", post.getOne);
router.post("/posts", duplicatePost, post.post);
router.put("/posts/:id", duplicatePost, post.put);
router.delete("/posts/:id", post.del);

router.all("*", function (req, res) {
    return res.status(404).json({
        isSuccess: false,
        message: "Please enter a valid endpoint",
    });
});

module.exports = router;
