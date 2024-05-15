const express = require("express");
const router = express.Router();
const { getPosts, getPost, createPost, updatePost, deletePost, publishPost, unpublishPost } = require("../controllers/postController");
const { authenticate } = require('../middlewares/auth');

router.get("/", getPosts);
router.get("/:id", getPost);
router.post("/", authenticate, createPost);
router.put("/:id/publish", authenticate, publishPost);
router.put("/:id/unpublish", authenticate, unpublishPost);
router.put("/:id", authenticate, updatePost);
router.delete("/:id", authenticate, deletePost);

module.exports = router;