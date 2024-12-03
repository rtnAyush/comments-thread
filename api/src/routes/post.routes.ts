import express from "express";
import {
	createPost,
	viewComments,
	viewPost,
} from "../controllers/post.controller";

const router = express.Router();

// view parent post only
router.get("/view", viewPost);

//  create new post
router.post("/create", createPost);

// get comments with post id
router.get("/comments/:postId", viewComments);

export default router;
