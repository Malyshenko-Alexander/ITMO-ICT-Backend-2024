import { Table, Column, Model, AllowNull} from "sequelize-typescript"
import { Optional } from "sequelize";

export type ProductAttributes = {
    id: number,
    name: string,
    description: string,
}

export type ProductCreate = Optional<ProductAttributes, "id">

@Table
export class Product extends Model<ProductAttributes, ProductCreate> {
    @AllowNull(false)
    @Column
    name!: string

    @AllowNull(false)
    @Column
    description!: string
}

export default Product