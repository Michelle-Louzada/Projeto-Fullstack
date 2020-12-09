import { PostClass } from "../model/Post";
import { BaseDatabase } from "./BaseDatabase";

class PostDatabase extends BaseDatabase {

    private tableName: string = "publicações_fullstack"
 
    public getTableName = (): string => this.tableName
 
    public async createPost(
       post: PostClass
    ) {

        try {
            await this.getConnection().insert({
                id: post.getId(),
                description: post.getDescription(),
                photo: post.getPhoto(),
                author_id: post.getAuthorId(),
                createdAt: post.getCreatedAt(),
                title: post.getTitle()
             }).into(this.tableName)
          } catch (error) {
             throw new Error("Erro de banco de dados: " + error.sqlMessage);
          }
        }
        public async selectPost(
            id: string,
            authorId: string
         ): Promise<PostClass> {
            try {
               const result = await this.getConnection()
                  .select("*")
                  .from(this.tableName)
                  .where({ id }).orWhere("author_id", authorId);
    
               return new PostClass(
                  result[0].id,
                  result[0].description,
                  result[0].photo,
                  result[0].createAt,
                  result[0].author_id,
                  result[0].title
               )
      
            } catch (error) {
               throw new Error(error.slqMessage || error.message)
            }
       }

      public async getPostDatabase(
      ): Promise<PostClass[]> {
         try {
            const result = await this.getConnection()
               .select("*")
               .from(this.tableName)

            return await result
            
         } catch (error) {
            throw new Error(error.slqMessage || error.message)
         }
    }
    public async getPostAuthor(
      authorId: string
      ): Promise<PostClass[]> {
         try {
            const result = await this.getConnection()
               .select("*")
               .where("author_id", authorId)
               .from(this.tableName)

            return await result
   
         } catch (error) {
            throw new Error(error.slqMessage || error.message)
         }
    }

}

export default new PostDatabase()