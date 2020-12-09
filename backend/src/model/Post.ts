export type Post = {
    id: string,
    photo: string,
    description: string,
    createdAt: string,
    author_id: string,
    title: string
 }

 export type PostData = {
    id: string,
    photo: string,
    description: string,
    createdAt: string,
    authorId: string,
    title: string
 }

 export interface InputPost {
    photo: string,
    description: string,
    title: string
 }

 export class PostClass {
    private id: string
    private description: string
    private photo: string
    private createdAt: string
    private author_id: string
    private title: string
 
    constructor(
       id: string,
       description: string,
       photo: string,
       createdAt: string,
       authorId: string,
       title: string
 
    ) {
       this.id = id
       this.description = description
       this.photo = photo
       this.createdAt = createdAt
       this.author_id = authorId
       this.title = title
    }
 
    public getId = (): string => this.id
    public getDescription = (): string => this.description
    public getPhoto = (): string => this.photo
    public getCreatedAt = (): string => this.createdAt
    public getAuthorId = (): string => this.author_id
    public getTitle = (): string => this.title

 
 }


export function dateH() {
const data = new Date();

// Guarda cada pedaço em uma variável
const dia     = data.getDate();           // 1-31
const mes     = data.getMonth();          // 0-11 (zero=janeiro)
const ano4    = data.getFullYear();       // 4 dígitos
const hora    = data.getHours();          // 0-23
const min     = data.getMinutes();        // 0-59
const seg     = data.getSeconds();        // 0-59

const str_data = ano4 + '-' + (mes+1) + '-' + dia;
const str_hora = hora + ':' + min + ':' + seg;

return (`${str_data}, ${str_hora}`) 


 }