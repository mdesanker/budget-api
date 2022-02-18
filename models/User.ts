import { Schema, model } from "mongoose";

export interface IUser {
  _id?: string;
  name: Record<string, string>;
  email: string;
  password: string;
  date?: Date;
  income?: Record<string, any>[];
  housing?: Record<string, any>[];
  food?: Record<string, any>[];
  utilities?: Record<string, any>[];
  healthcare?: Record<string, any>[];
  loans?: Record<string, any>[];
  subscriptions?: Record<string, any>[];
}

const UserSchema = new Schema<IUser>({
  name: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
  },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
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

export default model("User", UserSchema);
