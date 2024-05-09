const User = require("../models/user");
const asyncHandler = require("express-async-handler");

exports.getUsers = asyncHandler(async (req, res, next) => {
    const users = await User.find();
    res.json(users);
});

exports.getUser = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.params.id);
    res.json(user);
})

exports.createUser = asyncHandler(async (req, res, next) => {
    const {username, email, password} = req.body;
    try {
        const newUser = new User({ username, email, password});
        await newUser.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

exports.updateUser = asyncHandler(async (req, res, next) => {
    const {username, email, password} = req.body;
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({message: "User not found"});
        }

        user.username = username;
        user.email = email;
        user.password = password;
        await user.save();
        res.json(user);
    } catch (err) {
        res.status(400).json({message: err.message});
    }
});

exports.deleteUser = asyncHandler(async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        await user.deleteOne();
        res.json({ message: 'User deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
