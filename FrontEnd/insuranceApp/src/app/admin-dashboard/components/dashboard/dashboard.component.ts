import { Component } from '@angular/core';
import { CompanyDataService } from '../../services/company-data.service';
import { CompanyModel } from '../../models/company.model';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  allCompanyData: any;
  xaxis: string[] = [];
  recentDates: string[] = []; 
  dataRegistered: number[] = []; 
  dataApproved: number[] = []; 
  chart: any;

  constructor(private api:CompanyDataService, private datePipe: DatePipe,private router: Router) { 
  }

  ngOnInit() {
    this.api.getAllCompanies().subscribe(res => {
      this.allCompanyData = res;
      this.xaxis = this.getLast30Days();
      this.dataRegistered = this.countRegistered();
      this.dataApproved = this.countApproved(); 
  
      var myChart = new Chart("myChart", {
        type: 'line',
  
        data: {
          labels: this.xaxis, 
           datasets: [
            {
              label: "Companies Registered",
              data: this.dataRegistered,
              backgroundColor: 'blue'
            },
            {
              label: "Companies Approved",
              data: this.dataApproved,
              backgroundColor: 'red'
            }
          ]
        },
        options: {
          aspectRatio:3.5
        }
        
      });
    });
  }

  // Re-route to companies page
  onButtonClick() {
    this.router.navigate(['/admin/companies']);
  }

  // Get all companies 
  getAllCompanies() {
    this.api.getAllCompanies().subscribe(res => {
      this.allCompanyData = res; 
    })
  }

  // Approve company
  approveCompany(data:any){
    this.api.approveCompany(data.companyId).subscribe(res => {
      this.getAllCompanies();
    })
  }

  // Reject company
  rejectCompany(data:any){
    this.api.rejectCompany(data.companyId).subscribe(res => {
      this.getAllCompanies();
    })
  }

  // Return array of data points for charting num occurences in last 30 days
  getLast30Days(): string[] {
    const dates: string[] = [];
    const today: Date = new Date();
    for (let i = 0; i < 30; i++) {
      const date: Date = new Date(today.getTime() - i * 24 * 60 * 60 * 1000);
      dates.push(date.toISOString().slice(0, 10));
    }
    return dates.reverse();
  }

  // Data returned from this function will be used in y-axis plotting --> Registered
  countRegistered() {
    const occurrences = new Array(this.xaxis.length).fill(0); // initialize array of zeros
    for (let i = 0; i < this.xaxis.length; i++) {
      const date = this.xaxis[i];
      for (let j = 0; j < this.allCompanyData.length; j++) {
        const company = this.allCompanyData[j];
        const companyDate = company.dateRegistered.slice(0, 10); // extract date from ISO string
        if (date === companyDate) {
          occurrences[i]++;
        }
      }
    }
    return occurrences;
  }

  // Data returned from this function will be used in y-axis plotting --> Approved
  countApproved() {
    const occurrences = new Array(this.xaxis.length).fill(0); // initialize array of zeros
    for (let i = 0; i < this.xaxis.length; i++) {
      const date = this.xaxis[i];
      for (let j = 0; j < this.allCompanyData.length; j++) {
        const company = this.allCompanyData[j];
        if (company.dateApproved) { // check for null value
          const companyDate = company.dateApproved.slice(0, 10); // extract date from ISO string
          if (date === companyDate) {
            occurrences[i]++;
          }
        }
      }
    }
    return occurrences;
  }  
}
