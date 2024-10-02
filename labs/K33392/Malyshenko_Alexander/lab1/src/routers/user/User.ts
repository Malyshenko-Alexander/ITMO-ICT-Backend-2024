import express from "express"
import UserController from "../../controllers/user/userController"
import UserService from "../../services/user/userService";

const controller = new UserController(new UserService());
const userRoutes = express.Router();

userRoutes.route("/").post(controller.post);
userRoutes.route("/").get(controller.getAll);
userRoutes.route("/:user_id").get(controller.get);
userRoutes.route("/:user_id").put(controller.update);
userRoutes.route("/:user_id").delete(controller.delete);

export default userRoutes
