import {
    Table,
    Column,
    Model,
    AllowNull,
    Unique,
} from "sequelize-typescript"
import { Optional } from "sequelize";

export type UserAttributes = {
    id: number,
    email: string,
}

export type UserCreate = Optional<UserAttributes, "id">

@Table
export class User extends Model<UserAttributes, UserCreate> {
    @Unique
    @AllowNull(false)
    @Column
    email!: string
}

export default User