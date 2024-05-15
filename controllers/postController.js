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
    const post = new Post(req.body);
    try {
        const savedPost = await post.save();
        res.status(201).json(savedPost);
    } catch (error) {
        res.status(500).json({ message: "Error creating post", error: error.message });
    }
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
	const { id } = req.params;
	const post = await Post.findById(id);
	if (!post) {
		res.status(404).json({ message: "Post not found" });
	}
	await post.remove();
	res.status(200).json({ message: "Post deleted" });
});

