import { Types } from "mongoose";
import { isEmpty } from "lodash";
import { IUserRepository } from "../repository/user.repository.interface";
import { CustomField, IUser } from "../interface/user.interface";
import {
  BusinessError,
  GeneralError,
  NotFoundError,
} from "../../../helpers/exceptions";

export class UserService {
  constructor(private readonly userRepository: IUserRepository) {}

  createUser = async (user: IUser) => {
    try {
      const isEmailAvailableToNewUser = await this.isEmailAvailableToNewUser(
        user.email
      );

      if (!isEmailAvailableToNewUser) {
        throw new BusinessError(
          "Email já em uso, por favor tente recuperar a senha ou use um email diferente"
        );
      }

      const resultInsert = await this.userRepository.save(user);

      if (!resultInsert) {
        throw new GeneralError("Falha ao inserir usuário no banco.");
      }

      return {
        message: "Usuário criado com sucesso!",
      };
    } catch (error: any) {
      console.error(error.message, {
        eventName: "UserService.createUser",
      });
      throw error;
    }
  };

  updateUser = async (user: IUser) => {
    try {
      const resultUpdate = await this.userRepository.update(user._id!, user);

      if (!resultUpdate) {
        throw new BusinessError("Falha ao atualizar usuário.");
      }

      return resultUpdate;
    } catch (error: any) {
      console.error(error.message, {
        eventName: "UserService.updateUser",
      });
      throw error;
    }
  };

  getUserById = async (userId: Types.ObjectId, projection: Object = {}) => {
    try {
      return await this.userRepository.findUser({ _id: userId }, projection);
    } catch (error: any) {
      console.error(error.message, {
        eventName: "UserService.getUsuarioById",
        eventData: {
          userId,
          projection,
        },
      });
      throw error;
    }
  };

  private async isEmailAvailableToNewUser(email: string) {
    const userExists = await this.userRepository.findUser({ email });

    return isEmpty(userExists);
  }
}
