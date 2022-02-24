import { Schema, Types, model } from "mongoose";

export interface ITransaction {
  _id?: string;
  user: Types.ObjectId;
  description: string;
  merchant: string;
  amount: number;
  type: "expense" | "earning";
  category: string;
  date?: Date;
}

const TransactionSchema = new Schema<ITransaction>({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  description: { type: String, required: true },
  merchant: { type: String, required: true },
  amount: { type: Number, required: true },
  type: { type: String, enum: ["expense", "earning"], required: true },
  category: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

export default model("Transaction", TransactionSchema);
