import mongoose from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
            index: true
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },

        password: {
            type: String,
            required: [true, "Password is required"]
        },
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user"
        },
        refreshToken: {
            type: String,
            default: null
        },
    },
    { timestamps: true }
);

const User = mongoose.model("User", userSchema);

userSchema.pre("save", async function (next) {
    if (!this.isModified("password"))
        return next();
    this.password = await bcrypt.hash(this.password, 10)
    next()
});

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
    // true aur false
}
userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export default User;
