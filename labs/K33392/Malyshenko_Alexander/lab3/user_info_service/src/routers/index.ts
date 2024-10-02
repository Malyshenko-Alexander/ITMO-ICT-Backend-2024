import express from "express"
import userInfoRoutes from "./v1/userInfo/UserInfo"

const router: express.Router = express.Router()

router.use('/users/info', userInfoRoutes)


export default router