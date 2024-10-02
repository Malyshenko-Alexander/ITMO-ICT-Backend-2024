import express from "express"
import userRoutes from "./user/User"
import productRoutes from "./product/Product";

const router: express.Router = express.Router()

router.use('/users', userRoutes)
router.use('/products', productRoutes)

export default router