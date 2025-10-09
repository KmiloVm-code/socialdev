import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        default: "https://cdn-icons-png.flaticon.com/512/149/149071.png"
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    }
}, {timestamps:
    {
        createdAt: "created_at",
        updatedAt: "updated_at"
    }
});

userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = bcrypt.hashSync(this.password, 10);
    }
    next();
});

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

export default mongoose.model("User", userSchema);
