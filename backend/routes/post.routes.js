import express from "express";
import { createPost, deletePost, getPost, getPosts, updatePost, likePost, commentPost } from "../controllers/post.controller.js";

const router = express.Router();

router.get("/", getPosts);
router.get("/:id", getPost);
router.post("/", createPost);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);
router.post("/:id/like", likePost);
router.post("/:id/comment", commentPost);

export default router;
