import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clientnavbar',
  templateUrl: './clientnavbar.component.html',
  styleUrls: ['./clientnavbar.component.css']
})
export class ClientnavbarComponent implements OnInit {

  constructor(private router: Router) {}

  ngOnInit() {}

  onProduct1Click() {
    this.router.navigate(['/clientmain']);
  }

}
