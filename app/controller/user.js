let query = require("../model/db.js");

async function get(req, res) {
    let result = await query("SELECT * FROM users_table");
    res.json({
        isSuccess: true,
        message: "",
        data: result,
    });
}

async function getOne(req, res) {
    let id = req.params.id;

    let result = await query("SELECT * FROM users_table WHERE userId = ?", [
        id,
    ]);

    if (result.length === 0) {
        res.json({
            isSuccess: false,
            message: "User not found",
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
    let { name, email } = req.body;

    if (!name || !email) {
        res.json({
            isSuccess: false,
            message: "Name and email are required",
        });
        return;
    }

    let result = await query(
        "INSERT INTO users_table (name, email) VALUES (?, ?)",
        [name, email]
    );
    if (result.affectedRows) {
        res.json({
            isSuccess: true,
            message: "User added",
            data: {
                userId: result.insertId,
                name,
                email,
            },
        });
        return;
    } else {
        res.json({
            isSuccess: false,
            message: "Failed to add user",
        });
    }
}

async function put(req, res) {
    let id = req.params.id;
    let { name, email } = req.body;

    if (!name || !email) {
        res.json({
            isSuccess: false,
            message: "Name and email are required",
        });
        return;
    }

    let result = await query(
        "UPDATE users_table SET `name`=?, `email`=? WHERE `userId` = ?",
        [name, email, id]
    );

    if (result.affectedRows) {
        res.json({
            isSuccess: true,
            message: "User updated",
            data: {
                userId: id,
                name,
                email,
            },
        });
    } else {
        res.json({
            isSuccess: false,
            message: "Failed to update user",
        });
    }
}

async function del(req, res) {
    let id = req.params.id;

    let result = await query("DELETE FROM users_table WHERE `userId` = ?", [
        id,
    ]);

    if (result.affectedRows) {
        res.json({
            isSuccess: true,
            message: "User deleted",
            data: {
                userId: id,
            },
        });
    } else {
        res.json({
            isSuccess: false,
            message: "Failed to deleted user",
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
