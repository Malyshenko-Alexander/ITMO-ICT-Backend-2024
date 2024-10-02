import sequelize from "../../database/Database"
import { CrudService } from "../CRUDService"
import { Repository } from "sequelize-typescript"
import Product, {ProductCreate} from "../../models/product/Product";


class ProductService implements CrudService<number, Product, ProductCreate> {
    private productRepository: Repository<Product> = sequelize.getRepository(Product)

    create(data: ProductCreate): Promise<Product> {
        try {
            return this.productRepository.create(data)

        } catch (e: any) {
            return Promise.reject(e)
        }
    }

    deleteById(id: number): Promise<number> {
        return this.productRepository.destroy({
            where: {
                id: id
            }
        })
    }

    async findById(id: number): Promise<Product | null> {
        return this.productRepository.findOne({
            where: {
                id: id
            }
        })
    }

    async getAll(): Promise<Array<Product> | null> {
        return this.productRepository.findAll()
    }

    async updateById(id: number, data: ProductCreate): Promise<Product> {
        const result = await this.productRepository.update(data, {
            where: {
                id: id
            },
            returning: true
        })

        if (result[0] === 0) {
            return Promise.reject({message: "Product not found"})
        }

        return Promise.resolve(result[1][0])
    }
}

export default ProductService