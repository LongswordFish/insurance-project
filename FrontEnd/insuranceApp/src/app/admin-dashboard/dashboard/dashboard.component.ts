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
      text: 'Companies Joined This Week',
    },
    data: [{
        type: 'column',
        dataPoints: [
          { label: 'apple', y: 10 },
          { label: 'orange', y: 15 },
          { label: 'banana', y: 25 },
          { label: 'mango', y: 30 },
          { label: 'grape', y: 28 }
        ]
    }]
  };
  lineChartOptions = {
    animationEnabled: true,
    title: {
      text: 'Products Purchased this Last Year',
    },
    data: [{
        type: 'line',
        dataPoints: [
          { label: 'apple', y: 10 },
          { label: 'orange', y: 15 },
          { label: 'banana', y: 25 },
          { label: 'mango', y: 30 },
          { label: 'grape', y: 28 }
        ]
      }]
  };
  pieChartOptions = {
    animationEnabled: true,
    title: {
      text: 'Feedback Ratings',
    },
    data: [{
        type: 'pie',
        dataPoints: [
          { label: 'apple', y: 10 },
          { label: 'orange', y: 15 },
          { label: 'banana', y: 25 },
          { label: 'mango', y: 30 },
          { label: 'grape', y: 28 }
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
