import { Component } from '@angular/core';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-company-nav',
  templateUrl: './company-nav.component.html',
  styleUrls: ['./company-nav.component.css'],
  providers: [NgbDropdownConfig],
})
export class CompanyNavComponent {
  public iconOnlyToggled = false;
  public sidebarToggled = false;

  constructor(config: NgbDropdownConfig) {
    config.placement = 'bottom-right';
  }

  ngOnInit() {}

  // toggle sidebar in small devices
  toggleOffcanvas() {
    // document.querySelector('.sidebar-offcanvas').classList.toggle('active');
  }
  // toggle sidebar
  toggleSidebar() {
    let body = document.querySelector('body');
    // if (
    //   !body.classList.contains('sidebar-toggle-display') &&
    //   !body.classList.contains('sidebar-absolute')
    // ) {
    //   this.iconOnlyToggled = !this.iconOnlyToggled;
    //   if (this.iconOnlyToggled) {
    //     body.classList.add('sidebar-icon-only');
    //   } else {
    //     body.classList.remove('sidebar-icon-only');
    //   }
    // } else {
    //   this.sidebarToggled = !this.sidebarToggled;
    //   if (this.sidebarToggled) {
    //     body.classList.add('sidebar-hidden');
    //   } else {
    //     body.classList.remove('sidebar-hidden');
    //   }
    // }
  }
}
