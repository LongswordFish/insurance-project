import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ClientDataService } from '../../services/client-data.service';

@Component({
  selector: 'app-client-profile',
  templateUrl: './client-profile.component.html',
  styleUrls: ['./client-profile.component.css']
})
export class ClientProfileComponent {
  client: any;

  constructor(private api:ClientDataService, private router: Router) { 
    let userId = sessionStorage.getItem("Userid");
    if (userId) {
      this.getClient(parseInt(userId));
    }
  }

  // Retrieve company information for profile 
  getClient(id: number) {
    this.api.getOneClient(id).subscribe(res => {
      this.client = res; 
      console.log(res);
    })
  }

  onButtonClickUpdate() {
    this.router.navigate(['/client-profile/update']);
  }
}
