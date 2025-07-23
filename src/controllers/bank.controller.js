import BankAccount from "../models/bankAccount.model.js";
import asyncHandler from "../asyncHandler.js";

const addBankAccount = asyncHandler(async (req, res) => {
    const { accountNumber, bankName, accountHolderName, branchName, ifscCode } = req.body;

    if (!accountNumber || !bankName || !accountHolderName || !branchName || !ifscCode) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const newBankAccount = await BankAccount.create({
        accountNumber,
        bankName,
        accountHolderName,
        branchName,
        ifscCode,
        userId: req.user._id, // Assuming user ID is available in req.user
    });

    if (!newBankAccount) {
        return res.status(500).json({ message: "Failed to create bank account" });
    }

    res.status(201).json({
        message: "Bank account added successfully",
        bankAccount: newBankAccount,
    });
});

const getBankAccounts = asyncHandler(async (req, res) => {
    const bankAccounts = await BankAccount.find({ userId: req.user._id });

    if (!bankAccounts || bankAccounts.length === 0) {
        return res.status(404).json({ message: "No bank accounts found" });
    }

    res.status(200).json({
        message: "Bank accounts retrieved successfully",
        bankAccounts,
    });
});

const updateBankAccount = asyncHandler(async (req, res) => {
    const { accountId } = req.params;
    const { accountNumber, bankName, accountHolderName, branchName, ifscCode } = req.body;

    const bankAccount = await BankAccount.findByIdAndUpdate(
        accountId,
        {
            $set: {
                accountNumber: accountNumber,
                bankName: bankName,
                accountHolderName: accountHolderName,
                branchName: branchName,
                ifscCode: ifscCode,
            }
        },
        { new: true }
    );

    if (!bankAccount || bankAccount.userId.toString() !== req.user._id.toString()) {
        return res.status(404).json({ message: "Bank account not found" });
    }

    if (accountNumber) bankAccount.accountNumber = accountNumber;
    if (bankName) bankAccount.bankName = bankName;
    if (accountHolderName) bankAccount.accountHolderName = accountHolderName;
    if (branchName) bankAccount.branchName = branchName;
    if (ifscCode) bankAccount.ifscCode = ifscCode;

    await bankAccount.save();

    res.status(200).json({
        message: "Bank account updated successfully",
        bankAccount,
    });
});

const deleteBankAccount = asyncHandler(async (req, res) => {
    const { accountId } = req.params;
    const bankAccount = await BankAccount.findById(accountId);
    if (!bankAccount || bankAccount.userId.toString() !== req.user._id.toString()) {
        return res.status(404).json({ message: "Bank account not found" });
    }
    const deleteRespone = await BankAccount.findByIdAndDelete(bankAccount._id);
    if (!deleteRespone) {
        return res.status(404).json({ message: "Bank account not found" });
    }
    res.status(200).json({
        message: "Bank account deleted successfully",
        bankAccount: deleteRespone,
    });

});

const getAllUsersBank = async (req, res) => {
    const data = await BankAccount.find().populate("userId", "name email -_id");
    if (!data || data.length === 0) {
        return res.status(404).json({ message: "No bank accounts found" });
    }
    res.status(200).json(data, "Bank accounts retrieved successfully");
};

export { addBankAccount, getBankAccounts, updateBankAccount, deleteBankAccount, getAllUsersBank };