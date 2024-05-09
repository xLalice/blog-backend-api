const express = require("express");
const router = express.Router();
const { getPosts, createPost, updatePost, deletePost } = require("../controllers/postController");
const { authenticate } = require('../middlewares/auth');

router.get("/", getPosts);
router.post("/", authenticate, createPost);
router.put("/:id", authenticate, updatePost);
router.delete("/:id", authenticate, deletePost);

module.exports = router;