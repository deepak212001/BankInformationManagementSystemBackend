import mongoose from "mongoose";

const bankAccountSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },

        ifscCode: {
            type: String,
            required: true,
            trim: true,
        },

        branchName: {
            type: String,
            required: true,
            trim: true,
        },

        bankName: {
            type: String,
            required: true,
            trim: true,
        },

        accountNumber: {
            type: Number,
            required: true,
            unique: true,
            trim: true,
        },

        accountHolderName: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
        }
    },
    { timestamps: true }
);

const BankAccount = mongoose.model("BankAccount", bankAccountSchema);
export default BankAccount;
