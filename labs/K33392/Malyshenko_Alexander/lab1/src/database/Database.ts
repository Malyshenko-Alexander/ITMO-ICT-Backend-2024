import { Sequelize } from "sequelize-typescript"
import User from "../models/user/User"
import Product from "../models/product/Product";


const sequelize: Sequelize = new Sequelize({
    username: "root",
    password: "",
    database: "database_development",
    host: "127.0.0.1",
    dialect: 'sqlite',
    storage: "database.sqlite",
    repositoryMode: true
})

const models = [User, Product]

sequelize.addModels(models)
sequelize.sync()
    .then(() => console.log("models are synced"))
    .catch((error) => console.log(error))

export default sequelize