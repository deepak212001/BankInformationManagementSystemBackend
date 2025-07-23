
import User from "../models/user.model.js"
import asyncHandler from "../asyncHandler.js"

const register = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body

    if (!name || !password || !email) {
        return res.status(400).json({ message: "All are required" })
    }
    const existedUser = await User.findOne({ email })
    if (existedUser) {
        return res.status(409).json("User with email already exists")
    }
    const newUser = await User.create({ name, email, password })
    const createdUser = await User.findById(newUser._id)
    if (!createdUser) {
        return res.status(500).json({ message: "User creation failed" })
    }
    res.status(201).json({ createdUser, message: "User registered successfully" })

});

const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" })
    }

    const user = await User.findOne({ email })
    if (!user) {
        return res.status(401).json({ message: "Invalid credentials" })
    }
    const isPasswordValid = await user.isPasswordCorrect(password)

    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid User credentials")
    }

    const accessToken = user.generateAccessToken()
    // user.refreshToken = accessToken
    // await user.save({ validateBeforeSave: false }) // validateBeforeSave: false means password validation is not required

    res.status(200)
        .cookie("accessToken", accessToken)
        .json(user, "User logged in successfully")

});

const logout = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)
    // new: true means return the updated user document
    if (!user) {
        return res.status(404).json({ message: "User not found" })
    }

    res.status(200)
        .clearCookie("accessToken")
        .json({ message: "User logged out successfully" })
})

export { register, login, logout }