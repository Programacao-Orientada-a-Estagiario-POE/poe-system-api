import { Types } from "mongoose";

export interface IUser {
  _id?: Types.ObjectId;
  email: string;
  name: string;
  password: string;
}

export type CustomField = {
  key: string;
  value: string;
};
