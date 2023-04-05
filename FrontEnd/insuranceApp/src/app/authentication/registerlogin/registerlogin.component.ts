import { Component, TemplateRef, ViewChild } from '@angular/core';
import { AuthenticateService } from 'src/app/authentication/services/authenticate.service';
import { BsModalRef,BsModalService } from 'ngx-bootstrap/modal'; 
import { EmailValidator } from '@angular/forms';
import { RoutingService } from 'src/app/purchased/services/routing.service';
import { User } from '../model/User.type';
import { ClientModel } from 'src/app/client-profile/models/client.model';
import { CompanyModel } from 'src/app/company-profile/models/company.model';


@Component({
  selector: 'app-registerlogin',
  templateUrl: './registerlogin.component.html',
  styleUrls: ['./registerlogin.component.css']
})


export class RegisterloginComponent {
  tokendata:any;
  email:any;
  modalRef: any;
  errorlist:any[]=[];
  modalMessage:any;
  value:any='client';
  clientArr: ClientModel = new ClientModel();
  companyArr: CompanyModel = new CompanyModel();
  //client and company data


  constructor(private authenticate:AuthenticateService,private modalService:BsModalService,
              private routingService:RoutingService){
   
  }

  @ViewChild('template', { static: true }) modal : any;

  userLogin(data:any){
    this.authenticate.login(data).subscribe((res:any)=>{
      console.log(res);
      console.warn(res),
      sessionStorage.setItem("token",res.token);
      sessionStorage.setItem("Userid",res.userid);
      sessionStorage.setItem("role",data.role);
      this.modalMessage = "Your login was Successful";
  
      //Creating client and company Post calls
      this.clientArr.clientId = res.userid;
      this.clientArr.email = data.email;
      this.clientArr.location = "";
      this.clientArr.clientName = "";

      this.companyArr.companyId = res.userid;
      this.companyArr.name = "";
      this.companyArr.email=data.email;
      this.companyArr.city="";
      this.companyArr.state="";
      this.companyArr.address="";
      this.companyArr.country="";
      this.companyArr.postalCode="";



      
      console.log(this.clientArr);


      //  if(data.role == "client"){
      //   // client post api
      //   this.authenticate.getClientById(res.userid).subscribe((client) => {
      //     console.log(client)
      //   },
      //   (error)=>{
      //     this.authenticate.insertIntoClientTable(this.clientArr).subscribe(result => {
      //     console.log(result);
      //     });
      //   }
      //   );
      // }
      if(data.role == "company"){
        //company call
        this.authenticate.getCompanyById(res.userid).subscribe((company) => {
          console.log(company)
        },
        (error)=>{
          this.authenticate.insertIntoCompanyTable(this.companyArr).subscribe(result => {
          console.log(result);
          
          });
        }
        );
      }
      let user = new User();
      user.Userid=res.userid;
      user.role=data.role;
      this.authenticate.updateUserForNavbar(user);
      if(data.role=='company'){
        this.routingService.openCompanyDash();
      }else if(data.role=='client'){
        this.routingService.openAllProducts();
      }else if(data.role=='admin'){
        this.routingService.openAdminDash()
      }else{
        this.routingService.openHome();
      }
      
    },error=>{
      this.modalMessage = error.error;
    })
    this.modalRef = this.modalService.show(this.modal);
  }
  // ngOnInit(){
  //   this.tokendata=sessionStorage.getItem("token");
  //   this.email=sessionStorage.getItem("UserId");
  //   this.email=sessionStorage.getItem("Role");
  // }
    logout(){
      this.authenticate.logout();
    }
    userRegister(data:any){
      //RegExp regex = @"^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$";
      if(data.role == null){
        this.modalMessage = "Please select a Role";
      }else{
      this.authenticate.register(data).subscribe((response:any)=>{
        this.modalMessage = "Your registration was Successful";
        //api post for client and company based on the role selected...role - data.role, email - data.email, 
      },error=>{
        this.modalMessage = error.error;
      })
    }
      this.modalRef = this.modalService.show(this.modal);
    }
}
