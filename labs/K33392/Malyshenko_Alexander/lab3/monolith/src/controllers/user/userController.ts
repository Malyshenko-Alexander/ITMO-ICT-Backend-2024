import UserService from "../../services/user/userService"
import {Request, response, Response} from "express"
import { UserCreate } from "../../models/user/User"
import UserMapper from "../../mapper/user/userMapper"
import PasswordHandler from "../../utils/PasswordHandler"
import jwt from 'jsonwebtoken'
import fetch from 'node-fetch'
import axios from 'axios'

class UserController {
    private readonly userService: UserService
    private readonly userMapper = new UserMapper()
    private readonly passwordHandler = new PasswordHandler()

    constructor(userService: UserService) {
        this.userService = userService
    }

    login = async (request: Request, response: Response) => {
        try {
            const auth_response = await axios.post(process.env.authUrl + "users/login", {
                email: request.body["email"],
                password: request.body["password"]
            })
            return response.status(200).json({"token": auth_response.data["token"]})

        } catch (e: any) {
            return response.status(400).send({"message": e.message})
        }
    }

    getFindById = async (request: Request, response: Response) => {
        const id = Number(request.params.id)
        const user = await this.userService.findById(id)
        if (!user) {
            return response.status(404).send()
        }

        const dto = this.userMapper.userToDict(user)
        return response.status(200).json(dto)
    }

    postCreate = async (request: Request, response: Response) => {
        try {
            const registeredUser = await axios.post(
                process.env.authUrl + "users/singup", {
                    email: request.body["email"],
                    password: request.body["password"]
                })
            console.log("2")
            const dto = this.userMapper.userToDict(registeredUser.data)
            console.log("3")
            return response.status(201).send(dto)
        } catch (e: any) {
            console.log(e)
            return response.status(400).send({"message": e.message})
        }
    }


    patchUpdateUserPassword = async (request: Request, response: Response) => {
        try {
            const updateResponse = await axios.patch(
                process.env.authUrl + "users/update_password", {
                    email: request.body["email"],
                    password: request.body["password"],
                    new_password: request.body["new_password"]
                }, {headers:{Authorization: request.headers.authorization}})
            return response.status(201).send({"message": updateResponse.data["message"]})

        } catch (e: any) {
            return response.status(400).send({"Exception": e.message})
        }
    }

    patchUpdateById = async (request: Request, response: Response) => {
        const body: UserCreate = request.body
        const id = Number(request.params.id)
        try {
            body.password = await this.passwordHandler.hashPassword(body.password)
            const updatedUser = await this.userService.updateById(id, body)
            return response.status(200).send({"message": "Updated"})

        } catch (e: any) {
            return response.status(400).send({"Exception": e.message})
        }
    }

    listFindAll = async (request: Request, response: Response) => {
        const userList = await this.userService.findAll()
        if (!userList) {
            return response.status(404).send()
        }

        let data: any[] = []

        userList.forEach( user => {
            data.push(this.userMapper.userToDict(user))
        })

        return response.status(200).json(data)
    }

    deleteById = async (request: Request, response: Response) => {
        const id = Number(request.params.id)
        const deletedRows = await this.userService.deleteById(id)
        if (deletedRows === 0) {
            return response.status(404).send()
        }

        return response.status(204).send()
    }
}

export default UserController