let query = require("../model/db.js");

async function get(req, res) {
    let result;

    try {
        result = await query("SELECT * FROM posts_table");
    } catch (error) {
        return res.status(500).json({
            isSuccess: false,
            message: error.sqlMessage,
        });
    }

    return res.status(200).json({
        isSuccess: true,
        message: "",
        data: result,
    });
}

async function getOne(req, res) {
    let id = req.params.id;
    let result;

    try {
        result = await query("SELECT * FROM posts_table WHERE postId = ?", [
            id,
        ]);
    } catch (error) {
        return res.status(500).json({
            isSuccess: false,
            message: error.sqlMessage,
        });
    }

    if (result.length === 0) {
        return res.status(404).json({
            isSuccess: false,
            message: "Post not found",
        });
    }

    return res.status(200).json({
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

    let result;

    try {
        result = await query(
            "INSERT INTO posts_table (userId, title, description) VALUES (?, ?, ?)",
            [userId, title, description]
        );
    } catch (error) {
        return res.status(500).json({
            isSuccess: false,
            message: error.sqlMessage,
        });
    }

    if (!result.affectedRows) {
        return res.status(500).json({
            isSuccess: false,
            message: "Failed to add post",
        });
    }

    return res.status(201).json({
        isSuccess: true,
        message: "Post added",
        data: {
            postId: result.insertId,
            userId,
            title,
            description,
        },
    });
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

    let result;

    try {
        result = await query(
            "UPDATE posts_table SET `userId`=?, `title`=?, `description` = ? WHERE `postId` = ?",
            [userId, title, description, id]
        );
    } catch (error) {
        return res.status(500).json({
            isSuccess: false,
            message: error.sqlMessage,
        });
    }

    if (!result.affectedRows) {
        return res.status(500).json({
            isSuccess: false,
            message: "Failed to update post",
        });
    }

    return res.status(200).json({
        isSuccess: true,
        message: "Post updated",
        data: {
            postId: id,
            userId,
            title,
            description,
        },
    });
}

async function del(req, res) {
    let id = req.params.id;
    let result;

    try {
        result = await query("DELETE FROM posts_table WHERE `postId` = ?", [
            id,
        ]);
    } catch (error) {
        return res.status(500).json({
            isSuccess: false,
            message: error.sqlMessage,
        });
    }

    if (!result.affectedRows) {
        return res.status(500).json({
            isSuccess: false,
            message: "Failed to delete post",
        });
    }

    return res.status(200).json({
        isSuccess: true,
        message: "Post deleted",
    });
}

module.exports = {
    get,
    getOne,
    post,
    put,
    del,
};
