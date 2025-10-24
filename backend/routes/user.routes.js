import express from "express";
import { getUsers, getUser, getUserByEmail, updateUser, deleteUser } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", getUsers);
router.get("/me", getUser);
router.get("/email/:email", getUserByEmail);
router.put("/", updateUser);
router.delete("/", deleteUser);

export default router;