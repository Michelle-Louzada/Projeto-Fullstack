import { Request, Response } from "express";
import userBusiness, { UserBusiness } from "../business/UserBusiness";
import { BaseDatabase } from "../data/BaseDatabase";
import { LoginInputDTO, UserInputDTO } from "../model/User";


export class UserController {

    constructor (
        private userBusiness: UserBusiness
    ){}

    async signup(req: Request, res: Response) {
        try {

            const input: UserInputDTO = {
                email: req.body.email,
                name: req.body.name,
                password: req.body.password,
                role: req.body.role
            }

            // const userBusiness = new UserBusiness();
            const token = await userBusiness.createUser(input);

            res.status(200).send({ token });

        } catch (error) {
            res.status(400).send({ error: error.message });
        }

        await BaseDatabase.destroyConnection();
    }

    async login(req: Request, res: Response) {

        try {

            const loginData: LoginInputDTO = {
                email: req.body.email,
                password: req.body.password
            };

            // const userBusiness = new UserBusiness();
            const token = await userBusiness.getUserByEmail(loginData);

            res.status(200).send({ token });

        } catch (error) {
            res.status(400).send({ error: error.message });
        }

        await BaseDatabase.destroyConnection();
    }

}

export default new UserController(userBusiness)