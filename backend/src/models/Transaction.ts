import mongoose, {Document, Schema} from "mongoose";

export interface ITransaction extends Document {
    type: "income" | "expense";
    amount: number;
    category: string;
    description: string;
    date: Date;
}

const TransactionSchema: Schema = new Schema<ITransaction>({
    type: {
        type: String,
        required: [true, "Transaction type is required"],
        enum: ["income", "expense"],
    },
    amount: {
      type: Number,
      required: [true, "Amount is required"],
      min: [0, "Amount cannot be negative"],
    },
    description: {
      type: String,
      trim: true,
      required: [true, "Description is required"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
    },
    date: {
      type: Date,
      required: [true, "Date is required"],
    }
}, {timestamps: true});

export default mongoose.model<ITransaction>("Transaction", TransactionSchema);