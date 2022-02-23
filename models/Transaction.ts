import { Schema, Types, model } from "mongoose";

const categoryEnum = [
  "Automotive",
  "Bills & Utilities",
  "Education",
  "Entertainment",
  "Fees & Adjustments",
  "Food & Drink",
  "Gas",
  "Gifts & Donations",
  "Groceries",
  "Health & Wellness",
  "Home",
  "Miscellaneous",
  "Personal",
  "Professional Services",
  "Shopping",
  "Travel",
];

export interface ITransaction {
  _id?: string;
  user: Types.ObjectId;
  description: string;
  merchant: string;
  amount: number;
  type: "expense" | "earning";
  category:
    | "Automotive"
    | "Bills & Utilities"
    | "Education"
    | "Entertainment"
    | "Fees & Adjustments"
    | "Food & Drink"
    | "Gas"
    | "Gifts & Donations"
    | "Groceries"
    | "Health & Wellness"
    | "Home"
    | "Miscellaneous"
    | "Personal"
    | "Professional Services"
    | "Shopping"
    | "Travel";
  date?: Date;
}

const TransactionSchema = new Schema<ITransaction>({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  description: { type: String, required: true },
  merchant: { type: String, required: true },
  amount: { type: Number, required: true },
  type: { type: String, enum: ["expense", "earning"], required: true },
  category: { type: String, enum: categoryEnum, required: true },
  date: { type: Date, default: Date.now },
});

export default model("Transaction", TransactionSchema);
