import { Types, Document, Schema } from "mongoose";
import { IUser } from "../../../../domain/user/interface/user.interface";
import { mongoose } from "../../../../lib/db";

export interface IMUser extends Document<IUser> {}

const customFieldSchema = new Schema({
  key: {
    type: String,
    required: false,
  },
  value: {
    type: String,
    required: false,
  },
});

const userSchema = new Schema(
  {
    externalId: {
      type: Types.ObjectId,
      required: false,
    },
    nome: {
      type: String,
      required: false,
    },
    customFields: {
      type: [customFieldSchema],
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
    lastMessageSendedAt: {
      type: Date,
      required: false,
    },
    lastOnlineAt: {
      type: Date,
      required: false,
    },
    currentsChatId: {
      type: [Types.ObjectId],
      required: false,
    },
    currentsSocketIds: {
      type: [Types.ObjectId],
      required: false,
    },
    lastAccessTokenGeneratedAt: {
      type: Date,
      required: false,
    },
    lastAccessToken: {
      type: String,
      required: false,
    },
    isAtivo: {
      type: Boolean,
      required: false,
    },
    isOnline: {
      type: Boolean,
      required: false,
    },
  },
  { collection: "user", versionKey: false }
);

export const UserModel = mongoose.model<IMUser>("user", userSchema);
