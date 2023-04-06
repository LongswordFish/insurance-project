import { pp_Location } from "./pp-Location.type";

export class pp_Product{
    productId?:string;
    category?:string;
    picture?:string;
    name?:string;
    description?:string;
    price?:number;
    companyId?:string;
    locations?:pp_Location[];
}