const Comment = require("../models/comment");
const asyncHandler = require("express-async-handler");

exports.getComments = asyncHandler(async (req, res) => {
	const comments = await Comment.find();
	res.status(200).json(comments);
});

exports.createComment = asyncHandler(async (req, res) => {
	const comment = new Comment(req.body);
	const savedComment = await comment.save();
	res.status(201).json(savedComment);
});

exports.updateComment = asyncHandler(async (req, res) => {
	const { id } = req.params;
	const comment = await Comment.findById(id);
	if (!comment) {
		res.status(404).json({ message: "Comment not found" });
	}
	const updatedComment = await Comment.findByIdAndUpdate(id, req.body, {
		new: true,
	});
	res.status(200).json(updatedComment);
});

exports.deleteComment = asyncHandler(async (req, res) => {
	const { id } = req.params;
	const comment = await Comment.findById(id);
	if (!comment) {
		res.status(404).json({ message: "Comment not found" });
	}
	await comment.remove();
	res.status(200).json({ message: "Comment deleted" });
});

