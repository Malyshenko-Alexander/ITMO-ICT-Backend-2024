import Product from "../../models/product/Product";

class ProductMapper {
    productToDict(product: Product) {
        return {
            id: product.id,
            name: product.name,
            description: product.description
        };
    }
}

export default ProductMapper;