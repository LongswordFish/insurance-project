import { pp_Product } from "./pp-Product.type";

export class pp_Bundle{
    bundleid?: string;
    bundlename?: string;
    productids?: string[];
    totalPrice?: number;
    location?: string;
    companyid?: string;
    productList?:pp_Product[];
}