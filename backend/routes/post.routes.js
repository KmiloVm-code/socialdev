import express from "express";
import {
  createPost,
  deletePost,
  getPost,
  getPosts,
  updatePost,
  likePost,
  commentPost,
} from "../controllers/post.controller.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.get("/", getPosts);
router.get("/:id", getPost);
router.post(
  "/",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "attachments", maxCount: 5 },
  ]),
  createPost
);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);
router.post("/:id/like", likePost);
router.post("/:id/comment", commentPost);

export default router;
