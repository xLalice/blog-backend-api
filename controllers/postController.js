const Post = require("../models/post");
const asyncHandler = require("express-async-handler");

exports.getPosts = asyncHandler(async (req, res) => {
	const posts = await Post.find();
	res.status(200).json(posts);
});

exports.getPost = asyncHandler(async (req, res) => {
	const { id } = req.params;
	const post = await Post.findById(id);
	if (!post) {
		res.status(404).json({ message: "Post not found" });
	}
	res.status(200).json(post);
})

exports.createPost = asyncHandler(async (req, res) => {
    const { content, author, post } = req.body;

    if (!content || !author || !post) {
        return res.status(400).json({ message: "Content, author, and post are required." });
    }

    const comment = new Comment({ content, author, post });
    const savedComment = await comment.save();
    res.status(201).json(savedComment);
});

exports.updatePost = asyncHandler(async (req, res) => {
	const { id } = req.params;
	const post = await Post.findById(id);
	if (!post) {
		res.status(404).json({ message: "Post not found" });
	}
	const updatedPost = await Post.findByIdAndUpdate(id, req.body, {
		new: true,
	});
	res.status(200).json(updatedPost);
});

exports.publishPost = asyncHandler(async (req, res) => {
	const { id } = req.params;
	const post = await Post.findById(id);
	if (!post) {
		res.status(404).json({ message: "Post not found" });
	}

	const updatedPost = await Post.findByIdAndUpdate(id, { published: true }, {
		new: true,	
	})
	res.status(200).json(updatedPost);
})

exports.unpublishPost = asyncHandler(async (req, res) => {
	const { id } = req.params;
	const post = await Post.findById(id);
	if (!post) {
		res.status(404).json({ message: "Post not found" });
	}
	const updatedPost = await Post.findByIdAndUpdate(id, { published: false }, {
		new: true,
	})
	res.status(200).json(updatedPost);
})

exports.deletePost = asyncHandler(async (req, res) => {
	try {
		const { id } = req.params;
		const post = await Post.findByIdAndDelete(id);
		
		if (!post) {
			throw new Error("Post not found");
		}
		
		res.status(200).json({ message: "Post deleted" });
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
});

