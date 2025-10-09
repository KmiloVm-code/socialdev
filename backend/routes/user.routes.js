import express from "express";
import { getUsers, getUser, getUserByEmail, updateUser, deleteUser } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", getUsers);
router.get("/:id", getUser);
router.get("/email/:email", getUserByEmail);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;