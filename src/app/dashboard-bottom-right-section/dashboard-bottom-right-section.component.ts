import { Component, inject } from '@angular/core';
import * as ApexCharts from 'apexcharts';
import { UserDataService } from '../user-data.service';
import { TransactionDataService } from '../transaction-data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard-bottom-right-section',
  templateUrl: './dashboard-bottom-right-section.component.html',
  styleUrls: ['./dashboard-bottom-right-section.component.scss']
})
export class DashboardBottomRightSectionComponent {
  userDataService: UserDataService = inject(UserDataService);
  transactionDataService: TransactionDataService = inject(TransactionDataService);
  chart: ApexCharts | undefined;
  chartOptions: any = {};
  dataSubscription: Subscription | undefined;

  constructor() { }


  async ngOnInit() {
    await this.setChartOptions();
    this.chart = new ApexCharts(document.querySelector("#chart3"), this.chartOptions);
    this.chart.render();
  }

  async setChartOptions() {
    this.chartOptions = {
      series: [{
        name: 'Bronze Package',
        data: [44, 55, 41, 37, 22, 43, 21]
      }, {
        name: 'Silver Package',
        data: [53, 32, 33, 52, 13, 43, 32]
      }, {
        name: 'Gold Package',
        data: [12, 17, 11, 9, 15, 11, 20]
      }, {
        name: 'Platinum Package',
        data: [9, 7, 5, 8, 6, 9, 4]
      }],
      chart: {
        type: 'bar',
        height: 420,
        stacked: true,
      },
      colors: ["#cc6600", "#C0C0C0", "#ffcc00", "#a0b2c6"],
      plotOptions: {
        bar: {
          horizontal: true,
          dataLabels: {
            total: {
              enabled: true,
              offsetX: -3,
              style: {
                fontSize: '13px',
                fontWeight: 900
              }
            }
          }
        },
      },
      stroke: {
        width: 1,
        colors: ['#fff']
      },
      title: {
        text: 'Fiction Books Sales'
      },
      xaxis: {
        categories: [2008, 2009, 2010, 2011, 2012],
        labels: {

        }
      },
      yaxis: {
        title: {
          text: undefined
        },
      },
      tooltip: {
        y: {

        }
      },
      fill: {
        opacity: 1
      },
      legend: {
        position: 'top',
        horizontalAlign: 'left',
        offsetX: 40
      }
    };
  };
}







