import express, { json } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoutes from "./routes/user.routes.js";
import authRoutes from "./routes/auth.routes.js";
import postRoutes from "./routes/post.routes.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());

mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("Connected to MongoDB"))
    .catch((error) => console.log(error));

app.get("/", (req, res) => {
    res.json({ message: "API funcionando correctamente" });
})

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
    console.log(`http://localhost:${process.env.PORT}`);
});
