import { Request, Response } from "express";
import Post from "../models/post.model";

export const createPost = async (
	req: Request,
	res: Response
): Promise<void> => {
	const { content, parentId } = req.body;

	try {
		const newPost = new Post({
			content,
			parentId,
		});

		await newPost.save();

		// if it is nested post push to comments
		if (parentId) {
			await Post.findByIdAndUpdate(parentId, {
				$push: { comments: newPost._id },
			});
		}

		res.status(200).json({
			post: newPost,
			message: "Post successfully created",
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: error ?? "Internal server error" });
	}
};

// fetch all the parent posts
export const viewPost = async (req: Request, res: Response): Promise<void> => {
	try {
		const newPost = await Post.find({ parentId: null });

		if (!newPost) throw new Error("No post found");

		res.status(200).json(newPost);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: error ?? "Internal server error" });
	}
};

export const viewComments = async (
	req: Request,
	res: Response
): Promise<void> => {
	const { postId } = req.params;
	try {
		const comments = await Post.findById(postId).populate("comments");

		if (!comments) throw new Error("No comments found.");

		res.status(200).json(comments.comments);
	} catch (error: any) {
		console.error(error);
		res.status(500).json({
			message: error ? error.message : "Internal server error",
		});
	}
};
