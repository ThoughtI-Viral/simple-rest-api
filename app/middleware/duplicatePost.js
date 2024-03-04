let { Posts } = require("../models/index");

async function duplicatePost(req, res, next) {
    let { title } = req.body;
    let result;

    if (!title) {
        return res.status(400).json({
            isSuccess: false,
            message: "Bad Request: Title is required",
        });
    }

    try {
        result = await Posts.findOne({
            where: { title },
        });
    } catch (error) {
        return res.status(500).json({
            isSuccess: false,
            message: error.message,
        });
    }

    if (result) {
        return res.status(400).json({
            isSuccess: false,
            message: "Duplicate post title",
        });
    }

    next();
}

module.exports = duplicatePost;
