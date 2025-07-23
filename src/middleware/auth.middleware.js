import jwt from 'jsonwebtoken'
import asyncHandler from '../asyncHandler.js'
import User  from '../models/user.model.js'

const verifyJWT = asyncHandler(async (req, res, next) => {
    try {
        console.log("cookies :",req.cookies);
        console.log(req.header("Authorization"));
        const token = req.cookies?.accessToken || req.header("Authorization")?.split(" ")[1];
        console.log("Token:", token);
        if (!token) {
            return res.status(401).json("Access token is missing");
        }
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        if (!decodedToken) {
            return res.status(401).json("Unauthenticated request");
        }
        const user = await User.findById(decodedToken?._id).select("-password")
        if (!user) {
            return res.status(401).json("Invaild Access Token request");
        }
        req.user = user;
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