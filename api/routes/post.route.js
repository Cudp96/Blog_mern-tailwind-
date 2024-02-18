import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import { create } from "../controllers/post.contoller.js";

const router = express.Router();

router.post("/createpost", verifyToken, create);

export default router;
