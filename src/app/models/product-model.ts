import { ImageUrlsI } from "./imageurl";

export interface ProductsI{

    cantidad?:number;
    category?: string;
    description?: string;
    id?: string;
    imgPortada?: string;
    marca?:string;
    price?:number;
    title?:string;
    url?:String[];

}