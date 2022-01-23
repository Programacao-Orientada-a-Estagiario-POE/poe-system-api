import { Types } from "mongoose";
import { IUser } from "../../../domain/user/interface/user.interface";
import { IUserRepository } from "../../../domain/user/repository/user.repository.interface";
import { mongoose } from "../../../lib/db";
import { IMUser } from "../../database/mongo/models/user.model";

export class UserRepository implements IUserRepository {
  constructor(private readonly model: mongoose.Model<IMUser, {}>) {}

  getUsuarioById = async (id: Types.ObjectId, fields: Object = {}) => {
    try {
      const user = await this.model.collection.findOne(
        {
          _id: id,
        },
        { projection: fields }
      );

      return user as IUser;
    } catch (error: any) {
      console.error(error.message, {
        eventName: "UserRepository.getUsuarioById",
        eventData: {
          id,
          fields,
        },
      });
      throw error;
    }
  };

  save = async (user: IUser) => {
    try {
      const userSaved = await this.model.create(user);

      return !!userSaved;
    } catch (error: any) {
      console.error(error.message, {
        eventName: "UserRepository.save",
        eventData: user,
      });
      throw error;
    }
  };

  update = async (userId: Types.ObjectId, updatePayload: Object) => {
    try {
      const updateResult = await this.model.updateOne(
        {
          _id: userId,
        },
        {
          ...updatePayload,
          updatedAt: new Date(),
        }
      );

      const updatedWasSuccessful = !!updateResult.modifiedCount;

      return updatedWasSuccessful;
    } catch (error: any) {
      console.error(error.message, {
        eventName: "UserRepository.update",
        eventData: {
          userId,
          updatePayload,
        },
      });
      throw error;
    }
  };

  getUsuarioByExternalId = async (
    externalId: Types.ObjectId,
    fields?: Object | {}
  ) => {
    try {
      const user = await this.model.collection.findOne(
        {
          externalId,
        },
        fields
      );

      return user as IUser;
    } catch (error: any) {
      console.error(error.message, {
        eventName: "UserRepository.getUsuarioByExternalId",
        eventData: {
          externalId,
          fields,
        },
      });
      throw error;
    }
  };

  getUsuarioByAccessToken = async (
    accessToken: string,
    fileds: Object
  ): Promise<IUser> => {
    const result: any = await this.model.findOne(
      {
        lastAccessToken: accessToken,
      },
      {
        projection: fileds || undefined,
        readPreference: "secondaryPreferred",
      }
    );

    return result;
  };

  findUser = async (query: Object, projection: Object): Promise<IUser[]> => {
    try {
      const user = await this.model.collection
        .find(query, projection)
        .toArray();

      return user as IUser[];
    } catch (error: any) {
      console.error(error.message, {
        eventName: "UserRepository.findUser",
        eventData: {
          query,
          projection,
        },
      });
      throw error;
    }
  };
}
