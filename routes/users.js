const express = require("express");
const router = express.Router();
const { getUsers, getUser, createUser, updateUser, deleteUser } = require("../controllers/userController");
const { login, logout } = require('../controllers/authController');
const { authenticate } = require('../middlewares/auth');

router.get("/", authenticate, getUsers);
router.get("/:id", getUser);
router.post("/", createUser);
router.put("/:id", authenticate, updateUser);
router.delete("/:id", authenticate, deleteUser);
router.post("/login", login);
router.post("/logout", authenticate, logout);

module.exports = router;