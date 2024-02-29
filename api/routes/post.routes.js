import express from "express";
import {
  createPost,
  deletePost,
  getPosts,
  updatePost,
} from "../controllers/post.controller.js";

const router = express.Router();

router.post("/", createPost);
router.get("/", getPosts);
router.delete("/:postId/:userId", deletePost);
router.put("/:postId/:userId", updatePost);

export default router;
