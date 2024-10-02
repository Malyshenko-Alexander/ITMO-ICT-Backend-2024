import express from "express"
import ProductController from "../../controllers/product/productController";
import ProductService from "../../services/product/productService";

const controller = new ProductController(new ProductService());
const productRoutes = express.Router();

productRoutes.route("/").post(controller.post);
productRoutes.route("/").get(controller.getAll);
productRoutes.route("/:product_id").get(controller.get);
productRoutes.route("/:product_id").put(controller.update);
productRoutes.route("/:product_id").delete(controller.delete);

export default productRoutes
