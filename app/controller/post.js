let query = require("../model/db.js");

async function get(req, res) {
    let result = await query("SELECT * FROM posts_table");
    res.json({
        isSuccess: true,
        message: "",
        data: result,
    });
}

async function getOne(req, res) {
    let id = req.params.id;

    let result = await query("SELECT * FROM posts_table WHERE postId = ?", [
        id,
    ]);

    if (result.length === 0) {
        res.json({
            isSuccess: false,
            message: "Post not found",
        });
        return;
    }

    res.json({
        isSuccess: true,
        message: "",
        data: result,
    });
}

async function post(req, res) {
    let { userId, title, description } = req.body;

    if (!userId || !title || !description) {
        res.json({
            isSuccess: false,
            message: "userId, title and description are required",
        });
        return;
    }

    let result = await query(
        "INSERT INTO posts_table (userId, title, description) VALUES (?, ?, ?)",
        [userId, title, description]
    );
    if (result.affectedRows) {
        res.json({
            isSuccess: true,
            message: "Post added",
            data: {
                postId: result.insertId,
                userId,
                title,
                description,
            },
        });
        return;
    } else {
        res.json({
            isSuccess: false,
            message: "Failed to add post",
        });
    }
}

async function put(req, res) {
    let id = req.params.id;
    let { userId, title, description } = req.body;

    if (!userId || !title || !description) {
        res.json({
            isSuccess: false,
            message: "userId, title and description are required",
        });
        return;
    }

    let result = await query(
        "UPDATE posts_table SET `userId`=?, `title`=?, `description` = ? WHERE `postId` = ?",
        [userId, title, description, id]
    );

    if (result.affectedRows) {
        res.json({
            isSuccess: true,
            message: "Post updated",
            data: {
                postID: id,
                userId,
                title,
                description,
            },
        });
    } else {
        res.json({
            isSuccess: false,
            message: "Failed to update post",
        });
    }
}

async function del(req, res) {
    let id = req.params.id;

    let result = await query("DELETE FROM posts_table WHERE `postId` = ?", [
        id,
    ]);

    if (result.affectedRows) {
        res.json({
            isSuccess: true,
            message: "Post deleted",
            data: {
                postId: id,
            },
        });
    } else {
        res.json({
            isSuccess: false,
            message: "Failed to deleted post",
        });
    }
}

module.exports = {
    get,
    getOne,
    post,
    put,
    del,
};
