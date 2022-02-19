import { Schema, Types, model } from "mongoose";
import { DateTime } from "luxon";

enum transactionCategories {
  automotive = "Automotive",
  bills = "Bills & Utilities",
  education = "Education",
  entertainment = "Entertainment",
  fees = "Fees & Adjustments",
  food = "Food & Drink",
  gas = "Gas",
  gifts = "Gifts & Donations",
  groceries = "Groceries",
  health = "Health & Wellness",
  home = "Home",
  miscellaneous = "Miscellaneous",
  personal = "Personal",
  services = "Professional Services",
  shopping = "Shopping",
  travel = "Travel",
}

export interface ITransaction {
  user: Types.ObjectId;
  for: string;
  description?: string;
  merchant: string;
  amount: number;
  category: transactionCategories;
  date?: Date;
}

const TransactionSchema = new Schema<ITransaction>({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  for: { type: String, required: true },
  description: { type: String },
  merchant: { type: String, required: true },
  amount: { type: Number, required: true },
  category: { type: String, enum: transactionCategories, required: true },
  date: { type: Date, default: DateTime.now },
});

export default model("Transaction", TransactionSchema);
