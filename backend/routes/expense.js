const express = require("express");
const Expense = require("../model/expenseModel.js");
const authMiddleware = require("../middleware/auth.js");
const mongoose = require("mongoose");
// const app = express();
const router = express.Router();

// add expenses
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { title, amount, category, type, paymentMode, date, notes } = req.body;
    const userExpense = new Expense({
      user: req.userId,
      title,
      amount,
      category,
      type,
      paymentMode,
      date,
      notes,
    });

    await userExpense.save();
    return res
      .status(201)
      .json({ message: "Expenses added successfully", expense: userExpense });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.get("/", authMiddleware, async (req, res) => {
  try {
    // const { id } = req.user;
    const user = await Expense.find({
      user: req.userId,
    }).sort({ date: -1 });
    console.log(user);
    return res.status(200).json({ message: "Fetched user data", user });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: "failed to fetched" });
  }
});

router.get("/summary", authMiddleware, async (req, res) => {
    try {
       console.log("Step 1: userId =", req.userId);
        const userId = new mongoose.Types.ObjectId(req.userId); // Fix 1: conversion
           console.log("Step 2: converted userId =", userId);

        const incomeResult = await Expense.aggregate([
            { $match: { user: userId, type: 'income' } },
            { $group: { _id: null, total: { $sum: "$amount" } } }
        ]);
            console.log("Step 3: income done");

        const totalExpenses = await Expense.aggregate([
            { $match: { user: userId, type: 'expense' } },  // Fix 2: singular
            { $group: { _id: null, total: { $sum: "$amount" } } }
        ]);
            console.log("Step 3: expense done");

        const category = await Expense.aggregate([
            { $match: { user: userId, type: 'expense' } },  // Fix 2: singular
            { $group: { _id: "$category", total: { $sum: "$amount" } } },
            { $sort: { total: -1 } }
        ]);
          console.log("Step 5: category done");

        const monthlyTrend = await Expense.aggregate([
            { $match: { user: userId } },
            {
                $group: {
                    _id: {
                        month: { $month: "$date" },
                        year: { $year: "$date" },
                        type: "$type"
                    },
                    total: { $sum: "$amount" }
                }
            },
            { $sort: { "_id.year": 1, "_id.month": 1 } }
        ]);

         console.log("Step 6: monthlyTrend done");
        const transactionCount = await Expense.countDocuments({ user: userId });

        const totalIncome = incomeResult[0]?.total || 0;
        const totalExpense = totalExpenses[0]?.total || 0;
        const balance = totalIncome - totalExpense;

        return res.status(200).json({
            message: "successfull summary given",
            totalIncome,
            totalExpense,
            balance,
            transactionCount,
            category,
            monthlyTrend
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
});

router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);
    console.log(user);
    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    if (expense.user.toString() !== req.userId) {
      return res.status(403).json({ message: "Not Authorized" });
    }
    return res.status(200).json({ message: "Fetched user data", expense });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: "failed to fetched" });
  }
});

router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { title, amount, category, type, paymentMode, date, notes } =
      req.body;

    const expense = await Expense.findById(req.params.id);

    if (!expense) {
      return res.status(404).json({ message: "User not found" });
    }

    if (expense.user.toString() !== req.userId) {
      return res.status(403).json({ message: "User is not Authorized" });
    }

    expense.title = title;
    expense.amount = amount;
    expense.category = category;
    expense.type = type;
    expense.paymentMode = paymentMode;
    expense.date = date;
    expense.notes = notes;

    await expense.save();
    return res.status(200).json({ message: "data updated successfully"  , expense});
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);

    if (!expense) {
      return res.status(404).json({ message: "User not found" });
    }

    if (expense.user.toString() !== req.userId) {
      return res.status(403).json({ message: "User is not Authorized" });
    }

    await Expense.findByIdAndDelete(req.params.id);
    return res.status(200).json({ message: "user deleted successfully", expense });
  }catch (error) {
    console.error("DELETE ERROR:", error);  
    return res.status(500).json({ message: error.message });
}
});

module.exports = router;

