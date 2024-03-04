const { Posts, Users } = require("../models/index");

async function get(req, res) {
    let result;

    try {
        result = await Posts.findAll({
            include: [{ model: Users, attributes: ["name", "email"] }],
        });
    } catch (error) {
        return res.status(500).json({
            isSuccess: false,
            message: error.message,
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
        result = await Posts.findOne({
            include: [{ model: Users, attributes: ["name", "email"] }],
            where: { postId: id },
        });
    } catch (error) {
        return res.status(500).json({
            isSuccess: false,
            message: error.message,
        });
    }

    if (!result) {
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
        result = await Posts.create({ userId, title, description });
    } catch (error) {
        return res.status(500).json({
            isSuccess: false,
            message: error.message,
        });
    }

    if (!result) {
        return res.status(500).json({
            isSuccess: false,
            message: "Failed to add post",
        });
    }

    return res.status(201).json({
        isSuccess: true,
        message: "Post added",
        data: {
            postId: result.postId,
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
        result = await Posts.update(
            { userId, title, description },
            { where: { postId: id } }
        );
    } catch (error) {
        return res.status(500).json({
            isSuccess: false,
            message: error.message,
        });
    }

    if (result[0] === 0) {
        return res.status(400).json({
            isSuccess: false,
            message: "Post not found",
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
        result = await Posts.destroy({
            where: { postId: id },
        });
    } catch (error) {
        return res.status(500).json({
            isSuccess: false,
            message: error.message,
        });
    }

    if (result === 0) {
        return res.status(400).json({
            isSuccess: false,
            message: "Post not found",
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
