import { Request, Response } from "express";
import { InputPost, PostClass } from "../model/Post";
import postBusiness from '../business/PostBusiness'
import postDatabase from '../data/PostDatabase'
import authenticator, { AuthenticationData } from "../services/Authenticator";
import { CustomError } from "../error/BaseError";

class PostController {

    public async createPost(
       req: Request,
       res: Response
    ): Promise<void> {
   
       try {
          let message = "Success!"
   
          const token: string = req.headers.authorization as string
    
          const { photo, description, title } = req.body
    
          
          const input: InputPost = {
           photo,
           description,
           title
       }
   
       const result = await postBusiness.createPost(input, token);
   
    
          res.status(201).send({ message, result})
    
       } catch (error) {
          let message = error.sqlMessage || error.message
          res.statusCode = 400
    
          res.send({ message })
       
    }}
 
    public async getPostById(
       req: Request,
       res: Response
    ): Promise<void> {
    
        try {
           let message = "Success!"
    
           const token: string = req.headers.authorization as string
    
           const id: string  = req.params.id
    
           const result: PostClass = await postBusiness.getPostById(id, token);
     
           res.status(200).send({ message, result })
     
        } catch (error) {
           let message = error.sqlMessage || error.message
           res.statusCode = 400
     
           res.send({ message })
        }
     }

     public async getPostsByAuthorId(
      req: Request,
      res: Response
   ): Promise<void> {
   
       try {
          let message = "Success!"
   
          const token: string = req.headers.authorization as string
   
          const result: PostClass = await postBusiness.getPostByAuthor(token);
    
          res.status(200).send({ message, result })
    
       } catch (error) {
          let message = error.sqlMessage || error.message
          res.statusCode = 400
    
          res.send({ message })
       }
    }

     public async getPosts(
      req: Request,
      res: Response
   ): Promise<void> {
   
       try {
          let message = "Success!"
   
          const token: string = req.headers.authorization as string

          const tokenData: AuthenticationData = authenticator.verify(token)
   
          const result: PostClass[] = await postDatabase.getPostDatabase();
    
          res.status(200).send({ message, result })
    
       } catch (error) {
          let message = error.sqlMessage || error.message
          res.statusCode = 400

          if (
            message === "jwt must be provided" ||
            message === "invalid signature" ||
            message === "jwt expired"
         ) {
            res.statusCode = 401
            message = "not authorized"
         }
          res.send({ message })

       }
    }

 }
 
 export default new PostController()