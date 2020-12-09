import { dateH, InputPost, PostClass } from "../model/Post"
import authenticator, { AuthenticationData } from "../services/Authenticator"
import idGenerator from "../services/IdGenerator";
import postDatabase from '../data/PostDatabase'
import { CustomError } from "../error/BaseError";


class PostBusiness {

    public createPost = async (input: InputPost, token: string): Promise<PostClass> => {
    
        const { photo, description, title } = input
        try{

            if(!photo && !title) {
                throw new CustomError(422, "Missing input");
            }
            
            const tokenData: AuthenticationData = authenticator.verify(token)
    
            const author_id: string = tokenData.id
     
            const id = idGenerator.generate();
    
            const createdAt = dateH()
    
            const data: PostClass = new PostClass (id, description, photo, createdAt, author_id, title)
       
            await postDatabase.createPost(data)
    
            const createdPost: PostClass = (await postDatabase.selectPost(id, author_id));
     
            return createdPost
    
        } catch (error) {
            throw new Error(error.message);
        }
    }

    public getPostById = async (id: string, token: string): Promise<PostClass> => {

        try {
    
            let message = "Success!"
    
            const tokenData: AuthenticationData = authenticator.verify(token)

            const author_id = tokenData.id
    
            const post: PostClass = (await (postDatabase.selectPost(id, author_id)));
     
            if(!post) {
             throw new Error("'id' not registered");
             }
    
             return post
    
        }catch (error) {
            throw new Error(error.message);
        }
    }

    public getPostByAuthor = async (token: string): Promise<PostClass> => {

        try {
    
            let message = "Success!"
    
            const tokenData: AuthenticationData = authenticator.verify(token)

            const author_id = tokenData.id
    
            const post: PostClass[] = await postDatabase.getPostAuthor(author_id);
     
            if(!post) {
             throw new Error("'id' not registered");
             }

            return post[]
    
        }catch (error) {
            throw new Error(error.message);
        }
    }

}


export default new PostBusiness()