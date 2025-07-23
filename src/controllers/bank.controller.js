import BankAccount from "../models/bankAccount.model.js";
import asyncHandler from "../asyncHandler.js";

const addBankAccount = asyncHandler(async (req, res) => {
    const { accountNumber, bankName, accountHolderName } = req.body;

    if (!accountNumber || !bankName || !accountHolderName) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const newBankAccount = new BankAccount({
        accountNumber,
        bankName,
        accountHolderName,
        userId: req.user._id, // Assuming user ID is available in req.user
    });

    await newBankAccount.save();

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
    const { accountNumber, bankName, accountHolderName } = req.body;

    const bankAccount = await BankAccount.findById(accountId);

    if (!bankAccount || bankAccount.userId.toString() !== req.user._id.toString()) {
        return res.status(404).json({ message: "Bank account not found" });
    }

    if (accountNumber) bankAccount.accountNumber = accountNumber;
    if (bankName) bankAccount.bankName = bankName;
    if (accountHolderName) bankAccount.accountHolderName = accountHolderName;

    await bankAccount.save();

    res.status(200).json({
        message: "Bank account updated successfully",
        bankAccount,
    });
});

const deleteBankAccount = asyncHandler(async (req, res) => {
    const { accountId } = req.params;
    const bankAccount = await BankAccount.findById(accountId);
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
    const data = await BankAccount.find().populate("user", "username email");
    res.json(data);
};

export { addBankAccount, getBankAccounts, updateBankAccount, deleteBankAccount, getAllUsersBank };