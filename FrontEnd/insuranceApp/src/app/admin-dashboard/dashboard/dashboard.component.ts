import { AfterViewInit, Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements AfterViewInit {
  active = 1;
  chart: any;
  showChart: Boolean = false;
  columnChartOptions = {
    animationEnabled: true,
    title: {
      text: 'Top 10 Performing Companies (by Revenue)',
      fontFamily: "Roboto",
      fontSize: 23,
    },
    data: [{
        type: 'column',
        dataPoints: [
          { label: 'ABC Company', y: 150000 },
          { label: 'Rocky Mountain Insurance', y: 125000 },
          { label: 'Long Roads Packages', y: 115000 },
          { label: 'General Store', y: 99000 },
          { label: 'Locality', y: 89000 },
          { label: 'Cars4Us', y: 88000 },
          { label: 'Cushion Home', y: 87000 },
          { label: 'Diamond Deals', y: 67000 },
          { label: 'Right Turn', y: 45000 },
          { label: 'River Bank Insured', y: 30000 }
        ]
    }]
  };
  lineChartOptions = {
    animationEnabled: true,
    title: {
      text: 'Companies Joined in the Past 5 Days',
      fontFamily: "Roboto",
      fontSize: 23,
    },
    data: [{
        type: 'line',
        dataPoints: [
          { label: 'Monday, March 27, 2023', y: 10 },
          { label: 'Tuesday, March 28, 2023', y: 15 },
          { label: 'Wednesday, March 29, 2023', y: 25 },
          { label: 'Thursday, March 30, 2023', y: 30 },
          { label: 'Friday, March 31, 2023', y: 28 }
        ]
      }]
  };
  pieChartOptions = {
    animationEnabled: true,
    title: {
      text: 'Top Performing Products',
      fontFamily: "Roboto",
      fontSize: 23,
    },
    data: [{
        type: 'pie',
        dataPoints: [
          { label: 'Complete Auto Insurance - ABC Insurance', y: 39 },
          { label: 'Home Insurance Pkg 3 - General Store', y: 25 },
          { label: 'Diamond Protection Plan - Cars4Us', y: 16 },
          { label: 'Touring Pkg 4.5 - ABC Insurance', y: 10 },
          { label: 'Other', y: 5 }
        ]
    }]
  };
  getChartInstance(chart: object) {
    this.chart = chart;
  }
  navChangeEvent(e: any) {
    this.showChart = true;
  }
  navHiddenEvent(e: any) {
    this.showChart = false;
  }
  ngAfterViewInit() {
    this.showChart = true;
  }
}
