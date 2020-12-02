import userDatabase, { UserDatabase } from "../data/UserDatabase";
import { CustomError } from "../error/BaseError";
import { LoginInputDTO, UserInputDTO } from "../model/User";
import tokenGenerator, { TokenGenerator } from "../services/Authenticator";
import hashManager, { HashManager } from "../services/HashManager";
import idGenerator, { IdGenerator } from "../services/IdGenerator";


export class UserBusiness {

    constructor (
       private idGenerator: IdGenerator,
       private hashManager: HashManager,
       private tokenGenerator: TokenGenerator,
       private userDatabase : UserDatabase
    ){}

    async createUser(user: UserInputDTO) {

        const {name, email, password, role} = user

        try{

        if (!name || !email || !password ) {
            throw new CustomError(422, "Missing input");
         }

         if (email.indexOf("@") === -1) {
            throw new CustomError(422, "Invalid email");
         }

         if (password.length < 6 && password ) {
            throw new CustomError(422, "Invalid password");
         }

        const id = idGenerator.generate();

        const hashManager = new HashManager();
        const hashPassword = await hashManager.hash(user.password);

        const userDatabase = new UserDatabase();
        await userDatabase.createUser(id, user.email, user.name, hashPassword, user.role);

        const accessToken = tokenGenerator.generate({ id, role: user.role });

        return {accessToken};
        
    } catch (error) {
        if (error.message.includes("for key 'email'")) {
           throw new CustomError(409, "Email already in use")
        }

        throw new CustomError(error.statusCode, error.message)
     }

  }

    async getUserByEmail(user: LoginInputDTO) {

        try{

            if (!user.email || !user.password) {
                throw new CustomError(422, "Missing input");
            }

        const userDatabase = new UserDatabase();
        const userFromDB = await userDatabase.getUserByEmail(user.email);

        if (!userFromDB) {
            throw new CustomError(401, "Invalid credentials");
         }

        const hashManager = new HashManager();
        const hashCompare = await hashManager.compare(user.password, userFromDB.getPassword());

        const accessToken = tokenGenerator.generate({ id: userFromDB.getId(), role: userFromDB.getRole() });

        if (!hashCompare) {
            throw new CustomError(401, "Invalid credentials");
        }

        return {accessToken};

    }  catch (error) {
        throw new CustomError(error.statusCode, error.message)
    }
    }
}

export default new UserBusiness(
    idGenerator,
    hashManager,
    tokenGenerator,
    userDatabase
)