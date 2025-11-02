import type { Request, Response, NextFunction } from "express";
import Transaction from "../models/Transaction";
import ApiError from "../utils/ApiError";

export const getTransactions = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { type, category, startDate, endDate } = req.query;
    const filter: any = {};

    if (type) filter.type = type;
    if (category) filter.category = category;
    if (startDate && endDate)
      filter.date = {
        $gte: new Date(startDate as string),
        $lte: new Date(endDate as string),
      };

    const transactions = await Transaction.find(filter).sort({ date: -1 });
    res.json(transactions);
  } catch (error) {
    next(error);
  }
};

export const addTransaction = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { type, amount, category, description, date } = req.body;
        if(!type || !amount || !category || !description || !date) {
            return next(new ApiError(400, "All fields are required"));
        }
        const transaction = await Transaction.create({type, amount, description, category, date});
        res.status(201).json(transaction);
    } catch (error) {
        next(error);
    }
};

export const updateTransaction = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const updated = await Transaction.findByIdAndUpdate(req.params.id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!updated) {
          return next(new ApiError(404, "Transaction not found"));
        }
        res.status(200).json({success: true, data: updated});
    } catch (error) {
        next(error);
    }
};

export const deleteTransaction = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const deleted = await Transaction.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return next(new ApiError(404, "Transaction not found"));
    }
    res.status(200).json({success: true, message: "Message deleted successfully"});
  } catch (error) {
    next(error);
  }
};