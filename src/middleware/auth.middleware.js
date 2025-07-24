import jwt from 'jsonwebtoken'
import asyncHandler from '../asyncHandler.js'
import User from '../models/user.model.js'

const verifyJWT = asyncHandler(async (req, res, next) => {
    try {
        // console.log("cookies :", req.cookies);
        // console.log("req.cookies?.accessToken", req.cookies?.accessToken)
        const token = req.cookies?.accessToken || req.header("Authorization")?.split(" ")[1];
        // console.log("Token:", token);
        if (!token) {
            return res.status(401).json("Access token is missing");
        }
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        // console.log("decodedToken", decodedToken)
        if (!decodedToken) {
            return res.status(401).json("Unauthenticated request");
        }
        const user = await User.findById(decodedToken?._id).select("-password")
        // console.log("user ", user)
        if (!user) {
            return res.status(401).json("Invaild Access Token request");
        }
        req.user = user;
        // console.log("sdsds", req.user)
        next();
    } catch (error) {
        console.error("JWT verification error:", error);
        return res.status(401).json({
            success: false,
            message: "Unauthenticated request",
            error: error.message || "Invalid token"
        });
    }
})

export default verifyJWT;