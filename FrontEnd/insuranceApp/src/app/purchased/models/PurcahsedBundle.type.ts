import { PurchasedProduct } from "./PurchasedProduct.type";

export class PurchasedBundle{
    companyId?:string ;
    companyName?:string;
    clientId?:string ;
    purchaseDate?: Date;
    bundleId?:string ;
    quotePrice?:number;
    location?:string ;
    ppIds?:string[];
    bundlename?:string;
    productList?:PurchasedProduct[];
}