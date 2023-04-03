import { Component } from '@angular/core';
import { ClientProfile } from '../../model/client.type';

@Component({
  selector: 'app-client-profile',
  templateUrl: './client-profile.component.html',
  styleUrls: ['./client-profile.component.css']
})
export class ClientProfileComponent {
  client:ClientProfile;
  edit:Boolean=false;
  constructor(){
    this.client=new ClientProfile();
    this.client.clientName="Buzz LightYear";
    this.client.email="buzz@gmail.com";
    this.client.location="Pixar";
  }
}
