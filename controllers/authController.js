const jwt = require("jsonwebtoken");
const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const passport = require("passport");
const config = require("../config/passport");

exports.login = asyncHandler(async (req, res, next) => {
    try {
        const {username, password} = req.body;
        const user = await User.findOne({username});

        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ message: "Invalid username or password" });
        }

        const token = jwt.sign({sub: user._id}, process.env.JWT_SECRET, {expiresIn: "1h"});
        res.json({token,
            user: {
                id: user._id,
                username: username,
            }
        });
    
    } catch (err) {
        res.status(500).json({ message: err.message });
        next(error);
    }
})

exports.logout = asyncHandler(async (req, res) => {
    res.clearCookie("jwt"); 
    res.json({ message: "Logged out" });
});


