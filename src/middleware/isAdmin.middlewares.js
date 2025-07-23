import User from '../models/user.model.js'
import asyncHandler from '../asyncHandler.js';
const isAdmin = asyncHandler(async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        if (user.role !== 'admin') {
            return res.status(403).json({ message: "Access denied, admin only" });
        }
        next();
    } catch (error) {
        console.error("Error in isAdmin middleware:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

export default isAdmin;