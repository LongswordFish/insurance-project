import { ClaimDocument } from "./ClaimDocument";

export class Claim{
    claimId?:string;
    customerId?:string;
    productId?:string;
    companyId?:string;
    date_created?:string;
    isActive?:boolean;
    isApproved?:boolean;
    description?:string;
    notes?:string;
    documents?:ClaimDocument[];
}