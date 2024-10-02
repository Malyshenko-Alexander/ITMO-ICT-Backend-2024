import {Sequelize} from "sequelize-typescript"
import User from "../models/user/User"
import UserInfo from "../models/userInfo/UserInfo";
import * as dotenv from "dotenv";

dotenv.config();
const sequelize = new Sequelize(String(process.env.db))

const models = [
    UserInfo
]

sequelize.addModels(models)
sequelize.sync().then(() => console.log("models are synced")).catch((error) => console.log(error))

export default sequelize