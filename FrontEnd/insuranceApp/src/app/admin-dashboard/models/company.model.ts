export class CompanyModel
{
    companyId:number=0;
    name:string="";
    email:string="";
    description?:string;
    address:string="";
    city:string="";
    state:string="";
    country:string="";
    postalCode:string="";
    logo?:string;  
    contactDetails?:string; 
    isApproved:boolean = false; 
    adminViewed:boolean = false; 
    dateRegistered?:string;
    dateApproved?:string;
}
