import { Document, Schema } from "mongoose";
import { IUser } from "../../../../domain/user/interface/user.interface";
import { mongoose } from "../../../../lib/db";

export interface IMUser extends Document<IUser> {}

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: false,
    },
    password: {
      type: String,
      required: false,
    },
    createdAt: {
      type: Date,
      required: false,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      required: false,
      default: Date.now,
    },
    isActive: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  { collection: "user", versionKey: false }
);

export const UserModel = mongoose.model<IMUser>("user", userSchema);
