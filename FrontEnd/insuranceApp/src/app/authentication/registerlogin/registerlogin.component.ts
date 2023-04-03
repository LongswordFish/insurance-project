import { Component, TemplateRef, ViewChild } from '@angular/core';
import { AuthenticateService } from 'src/app/authentication/services/authenticate.service';
import { BsModalRef,BsModalService } from 'ngx-bootstrap/modal'; 
import { EmailValidator } from '@angular/forms';

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
  constructor(private authenticate:AuthenticateService,private modalService:BsModalService){
   
  }

  @ViewChild('template', { static: true }) modal : any;

  userLogin(data:any){
    this.authenticate.login(data).subscribe((res:any)=>{
      console.warn(res),
      sessionStorage.setItem("token",res.token);
      sessionStorage.setItem("Userid",res.userid);
      sessionStorage.setItem("role",data.role);
      this.modalMessage = "Your login was Successful";
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
      this.authenticate.register(data).subscribe(()=>{
        this.modalMessage = "Your registration was Successful";
      },error=>{
        this.modalMessage = error.error;
      })
    }
      this.modalRef = this.modalService.show(this.modal);
    }
}
