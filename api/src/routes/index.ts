import express from "express";
import postRoutes from "./post.routes";


const router = express.Router();

router.use("/posts", postRoutes);

router.get("*", function (req, res) {
	res.status(404).json({ error: "Page not found" });
});

export default router;
