import UserInfoService from "../../services/userInfo/userInfoService";
import { Request, Response } from "express";
import { UserInfoCreate } from "../../models/userInfo/UserInfo";
import UserInfoMapper from "../../mapper/userInfo/userInfoMapper";
import axios from "axios";

class UserInfoController {
    private readonly userInfoService: UserInfoService;
    private readonly userInfoMapper = new UserInfoMapper();

    constructor(userInfoService: UserInfoService) {
        this.userInfoService = userInfoService;
    }

    getFindById = async (request: Request, response: Response) => {
        try {
            const data = await axios.get(process.env.infoUrl + "/users/info/one/" + request.params.id);
            return response.status(200).send(data.data)

        } catch (e: any) {
            return response.status(400).send({"Exception": e.message});
        }

    }

    getFindByUserId = async (request: Request, response: Response) => {
        try {
            const data = await axios.get(process.env.infoUrl + "/users/info/one/by/user/" + request.params.user_id);
            return response.status(200).send(data.data)

        } catch (e: any) {
            return response.status(400).send({"Exception": e.message});
        }
    }

    postCreate = async (request: Request, response: Response) => {
        try {
            const createdUserInfo = await axios.post(process.env.infoUrl + "/users/info/add", request.body,
                {headers:{Authorization: request.headers.authorization}});
            const dto = this.userInfoMapper.userInfoToDict(createdUserInfo.data)
            return response.status(201).send(dto);

        } catch (e: any) {
            return response.status(400).send({"Exception": e.message});
        }
    }

    changeMainInfo = async (request: Request, response: Response) => {
        try {
            const changedData = await axios.post(process.env.infoUrl + "/users/info/change_main_info",
                request.body, {headers:{Authorization: request.headers.authorization}});
            const dto = this.userInfoMapper.userInfoToDict(changedData.data)
            return response.status(200).send({"message": "Updated"})

        } catch (e: any) {
            return response.status(400).send({"Exception": e.message});
        }
    }

    changePhoneNumber = async (request: Request, response: Response) => {
        try {
            const changedData = await axios.post(process.env.infoUrl + "/users/info/change_phone",
                request.body, {headers:{Authorization: request.headers.authorization}});
            const dto = this.userInfoMapper.userInfoToDict(changedData.data)
            return response.status(200).send({"message": "Updated"})

        } catch (e: any) {
            return response.status(400).send({"Exception": e.message});
        }
    }

    patchUpdateById = async (request: Request, response: Response) => {
        const body: UserInfoCreate = request.body;
        const id = Number(request.params.id);
        try {
            const updatedUserInfo = await this.userInfoService.updateById(id, body);
            return response.status(200).send({"message": "Updated"});

        } catch (e: any) {
            return response.status(400).send({"message": e.message});
        }
    }

    listFindAll = async (request: Request, response: Response) => {
        try {
            const list = await axios.get(process.env.infoUrl + "/users/info/list");
            return response.status(200).send(list.data)

        } catch (e: any) {
            return response.status(400).send({"Exception": e.message});
        }
    }

    deleteById = async (request: Request, response: Response) => {
        try {
            const deletedData = await axios.delete(process.env.infoUrl + "/users/info/delete/" + request.params.id,
                {headers:{Authorization: request.headers.authorization}});
            return response.status(200).send({"message": "Deleted"})

        } catch (e: any) {
            return response.status(400).send({"Exception": e.message});
        }
    }
}

export default UserInfoController;