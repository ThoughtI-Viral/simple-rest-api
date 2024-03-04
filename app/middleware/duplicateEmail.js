let { Users } = require("../models/index");

async function duplicateEmail(req, res, next) {
    let { email } = req.body;
    let result;

    if (!email) {
        return res.status(400).json({
            isSuccess: false,
            message: "Bad Request: Email is required",
        });
    }

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

    next();
}

module.exports = duplicateEmail;
