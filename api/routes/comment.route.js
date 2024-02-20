import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import {
  createComment,
  deleteComment,
  editComment,
  getComment,
  getComments,
  likeComment,
} from "../controllers/comment.controller.js";

const router = express.Router();

router.post("/create", verifyToken, createComment);
router.get("/getcomments/:postId", getComments);
router.put("/likecomments/:commentId", verifyToken, likeComment);
router.put("/editcomments/:commentId", verifyToken, editComment);
router.delete("/deletecomments/:commentId", verifyToken, deleteComment);
router.get('/comments', verifyToken, getComment)

export default router;
