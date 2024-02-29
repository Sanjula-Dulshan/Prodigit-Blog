import express from "express";
import {
  createComment,
  deleteComment,
  editComment,
  getComments,
  getPostComments,
} from "../controllers/comment.controller.js";

const router = express.Router();

router.post("/", createComment);
router.get("/:postId", getPostComments);
router.get("/", getComments);
router.put("/:commentId", editComment);
router.delete("/:commentId", deleteComment);

export default router;
