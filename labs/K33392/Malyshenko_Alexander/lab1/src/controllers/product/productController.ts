import { Request, Response } from "express"
import ProductService from "../../services/product/productService";
import ProductMapper from "../../mapper/product/productMapper";
import {ProductCreate} from "../../models/product/Product";

class ProductController {
    private readonly productService: ProductService
    private readonly productMapper: ProductMapper = new ProductMapper()

    constructor(productService: ProductService) {
        this.productService = productService
    }

    getAll = async (request: Request, response: Response) => {
        const productsList = await this.productService.getAll()
        if (!productsList) {
            return response.status(404).send()
        }

        let data: any[] = []

        productsList.forEach( product => {
            data.push(this.productMapper.productToDict(product))
        })

        return response.status(200).json(data)
    }

    get = async (request: Request, response: Response) => {
        const id = Number(request.params.product_id)
        const product = await this.productService.findById(id)
        if (!product) {
            return response.status(404).send()
        }

        const data = this.productMapper.productToDict(product)
        return response.status(200).json(data)
    }

    post = async (request: Request, response: Response) => {
        const body: ProductCreate = request.body

        try {
            const createdProduct = await this.productService.create(body)
            const data = this.productMapper.productToDict(createdProduct)
            return response.status(201).send(data)

        } catch (e: any) {
            return response.status(400).send({"message": e.message})
        }
    }

    delete = async (request: Request, response: Response) => {
        const id = Number(request.params.product_id)
        const deletedRows = await this.productService.deleteById(id)
        if (deletedRows === 0) {
            return response.status(404).send()
        }

        return response.status(204).send()
    }

    update = async (request: Request, response: Response) => {
        const body: ProductCreate = request.body
        const id = Number(request.params.product_id)
        try {
            await this.productService.updateById(id, body)
            const product = await this.productService.findById(id)
            if (!product) {
                return response.status(404).send()
            }

            const data = this.productMapper.productToDict(product)
            return response.status(200).send(data)

        } catch (e: any) {
            return response.status(400).send({"message": e.message})
        }
    }
}

export default ProductController