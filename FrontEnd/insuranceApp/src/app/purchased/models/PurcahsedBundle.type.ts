import { PurchasedProduct } from "./PurchasedProduct.type";

export class PurchasedBundle{
    companyId?:string ;
    clientId?:string ;
    purchaseDate?: Date;
    bundleId?:string ;
    quotePrice?:number;
    location?:string ;
    ppIds?:string[];
    productList?:PurchasedProduct[];
}