import {UserEntity} from "../entities/UserEntity";
import {UserDTO} from "../dtos/UserDTO";

export const userEntityToDTO = (user: UserEntity): UserDTO => {
    const {password, ...userWithoutPassword} = user

    return userWithoutPassword
}