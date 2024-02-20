import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import {
  createComment,
  editComment,
  getComments,
  likeComment,
} from "../controllers/comment.controller.js";

const router = express.Router();

router.post("/create", verifyToken, createComment);
router.get("/getcomments/:postId", getComments);
router.put("/likecomments/:commentId", verifyToken, likeComment);
router.put("/editcomments/:commentId", verifyToken, editComment);

export default router;
