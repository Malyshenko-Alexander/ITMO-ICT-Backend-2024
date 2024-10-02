import {
    Table,
    Column,
    Model,
    AllowNull,
    Unique,
    BeforeCreate,
    BeforeUpdate,
} from "sequelize-typescript"
import PasswordHandler from "../../utils/PasswordHandler"
import { Optional } from "sequelize";
import {toString} from "validator";

export type UserAttributes = {
    id: number,
    email: string,
    password: string,
}

export type UserUpdatePassword = {
    email: string,
    password: string,
    new_password: string,
}

export type UserCreate = Optional<UserAttributes, "id">

@Table
export class User extends Model<UserAttributes, UserCreate> {
    @Unique
    @AllowNull(false)
    @Column
    email!: string

    @AllowNull(false)
    @Column
    password!: string
}

export default User