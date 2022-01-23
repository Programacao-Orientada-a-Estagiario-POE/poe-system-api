import { Types } from "mongoose";
import { IUser } from "../interface/user.interface";

export interface IUserRepository {
  update(userId: Types.ObjectId, updatePayload: Object): Promise<boolean>;
  save(user: IUser): Promise<Boolean>;
  findUser(query: Object, projection?: Object): Promise<Array<IUser>>;
}
