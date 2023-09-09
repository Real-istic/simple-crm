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
    this.dataSubscription = this.transactionDataService.allTransactions$.subscribe(async () => {
      await this.setChartOptions();
      this.chart?.updateOptions(this.chartOptions);
    });
    await this.setChartOptions();
    this.chart = new ApexCharts(document.querySelector("#chart3"), this.chartOptions);
    this.chart.render();
  }

  async setChartOptions() {
    this.chartOptions = {
      series: [{
        name: 'Bronze Package',
        data: [44, 55, 41, 37, 22]
      }, {
        name: 'Silver Package',
        data: [53, 32, 33, 52, 13]
      }, {
        name: 'Gold Package',
        data: [12, 17, 11, 9, 15]
      }, {
        name: 'Platinum Package',
        data: [9, 7, 5, 8, 6]
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
        text: 'Most Valuable Customers',
      },
      xaxis: {
        categories: await this.getTopFiveUserNamesByMostRevenue(),
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

  async getTopFiveUserNamesByMostRevenue() {
    let usersByMostRevenue = await this.transactionDataService.getTopFiveUserByMostRevenue();
      console.log('UBMR', usersByMostRevenue)
      let usernamesByMostRevenue = [];
      for (let i = 0; i < usersByMostRevenue.length; i++) {
        const transactionUserId = usersByMostRevenue[i].userId;
        for (let j = 0; j < this.userDataService.allUsers.length; j++) {
          const userId = this.userDataService.allUsers[j].id;
          if (transactionUserId === userId) {
            usernamesByMostRevenue.push(this.userDataService.allUsers[j].firstName + ' ' + this.userDataService.allUsers[j].lastName)
          }
        }
      }
      console.log('ULBMR', usernamesByMostRevenue)
      return usernamesByMostRevenue;
  }

}







