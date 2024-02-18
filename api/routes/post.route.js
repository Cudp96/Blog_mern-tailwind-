import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import { create, getPosts } from "../controllers/post.contoller.js";

const router = express.Router();

router.post("/createpost", verifyToken, create);
router.get("/getposts", getPosts);

export default router;
