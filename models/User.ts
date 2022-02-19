import { Schema, model } from "mongoose";
import { DateTime } from "luxon";

export interface IUser {
  _id?: string;
  name: { firstName: string; lastName: string };
  email: string;
  password: string;
  date?: Date;
}

const UserSchema = new Schema<IUser>({
  name: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
  },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6, select: false },
  date: { type: Date, default: Date.now },
});

export default model("User", UserSchema);
