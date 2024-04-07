import express from "express";
import {
  createPost,
  deletePost,
  getPosts,
  updatePost,
} from "../controllers/post.controller.js";
import auth from "../middleware/auth.js";
import authAdmin from "../middleware/authAdmin.js";

const router = express.Router();

router.post("/", auth, authAdmin, createPost);
router.get("/", getPosts);
router.delete("/:postId/:userId", auth, authAdmin, deletePost);
router.put("/:postId/:userId", auth, authAdmin, updatePost);

export default router;
