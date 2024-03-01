const { Users } = require("../models/index");

async function get(req, res) {
    let result;

    try {
        result = await Users.findAll();
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
        result = await Users.findOne({
            where: { userId: id },
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
            message: "User not found",
        });
    }

    return res.status(200).json({
        isSuccess: true,
        message: "",
        data: result,
    });
}

async function post(req, res) {
    let { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).json({
            isSuccess: false,
            message: "Bad Request: Name and email are required",
        });
    }

    let result;

    // check if email already exists
    try {
        result = await Users.findOne({
            where: { email },
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
            message: "Email already exists",
        });
    }

    try {
        result = await Users.create({ name, email });
    } catch (error) {
        return res.status(500).json({
            isSuccess: false,
            message: error.message,
        });
    }

    if (!result) {
        return res.status(500).json({
            isSuccess: false,
            message: "Failed to add user",
        });
    }

    return res.status(201).json({
        isSuccess: true,
        message: "User added",
        data: {
            userId: result.userId,
            name,
            email,
        },
    });
}

async function put(req, res) {
    let id = req.params.id;
    let { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).json({
            isSuccess: false,
            message: "Bad Request: Name and email are required",
        });
    }

    let result;

    try {
        result = await Users.update({ name, email }, { where: { userId: id } });
    } catch (error) {
        return res.status(500).json({
            isSuccess: false,
            message: error.message,
        });
    }

    if (result[0] === 0) {
        return res.status(500).json({
            isSuccess: false,
            message: "Failed to update user",
        });
    }

    return res.status(200).json({
        isSuccess: true,
        message: "User updated",
        data: {
            userId: id,
            name,
            email,
        },
    });
}

async function del(req, res) {
    let id = req.params.id;
    let result;

    try {
        result = await Users.destroy({
            where: { userId: id },
        });
    } catch (error) {
        return res.status(500).json({
            isSuccess: false,
            message: error.message,
        });
    }

    if (result === 0) {
        return res.status(500).json({
            isSuccess: false,
            message: "Failed to delete user",
        });
    }

    return res.status(200).json({
        isSuccess: true,
        message: "User deleted",
        data: {
            userId: id,
        },
    });
}

module.exports = {
    get,
    getOne,
    post,
    put,
    del,
};
