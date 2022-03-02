import { Schema, Types, model } from "mongoose";
import { DateTime } from "luxon";

export interface IExpense {
  _id?: string;
  user: Types.ObjectId;
  date?: Date;
  income: { name: string; amount: number }[];
  housing: { name: string; amount: number }[];
  food: { name: string; amount: number }[];
  utilities: { name: string; amount: number }[];
  healthcare: { name: string; amount: number }[];
  loans: { name: string; amount: number }[];
  subscriptions: { name: string; amount: number }[];
}

const ExpenseSchema = new Schema<IExpense>({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Date, default: Date.now },
  income: [
    {
      name: { type: String },
      amount: { type: Number },
    },
  ],
  housing: [
    {
      name: { type: String },
      amount: { type: Number },
    },
  ],
  food: [
    {
      name: { type: String },
      amount: { type: Number },
    },
  ],
  utilities: [
    {
      name: { type: String },
      amount: { type: Number },
    },
  ],
  healthcare: [
    {
      name: { type: String },
      amount: { type: Number },
    },
  ],
  loans: [
    {
      name: { type: String },
      amount: { type: Number },
    },
  ],
  subscriptions: [
    {
      name: { type: String },
      amount: { type: Number },
    },
  ],
});

export default model("Expense", ExpenseSchema);
