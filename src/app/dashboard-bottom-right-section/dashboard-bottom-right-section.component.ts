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
        name: 'Bronze Packages',
        data: await this.getTopFiveUserRevenuePerPackage('Bronze Package')
      }, {
        name: 'Silver Packages',
        data: await this.getTopFiveUserRevenuePerPackage('Silver Package')
      }, {
        name: 'Gold Packages',
        data: await this.getTopFiveUserRevenuePerPackage('Gold Package')
      }, {
        name: 'Platinum Packages',
        data: await this.getTopFiveUserRevenuePerPackage('Platinum Package')
      }],
      chart: {
        type: 'bar',
        height: 440,
        width: 600,
        stacked: true,
      },
      dataLabels:{
        enabled: false,
        offsetY: 8,
        offsetX: 15,
        formatter: function (value: any) {
          return value.toLocaleString('de-DE', { style: 'currency', currency: 'EUR', minimumFractionDigits: 0, });
        },
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
                fontSize: '14px',
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
        style: {
          fontSize: '16px',
          fontWeight: '500',
          fontFamily: 'Roboto, sans-serif',
          color: '#263238'
        },
      },
      xaxis: {
        categories: await this.getTopFiveUserNamesByMostRevenue(),
        labels: {
          show: true,
          formatter: function (value: any) {
            return value.toLocaleString('de-DE', { style: 'currency', currency: 'EUR', minimumFractionDigits: 0, });
          },
          style: {
            colors: [],
            fontSize: '13px',
            fontWeight: '500',
            fontFamily: 'Roboto, sans-serif',
            color: '#263238',
            cssClass: 'apexcharts-yaxis-label',
          },
        },
      },
      yaxis: {
        labels: {
          show: true,
          align: 'left',
          minWidth: 0,
          maxWidth: 200,
          style: {
            colors: [],
            fontSize: '14px',
            fontWeight: '500',
            fontFamily: 'Roboto, sans-serif',
            color: '#263238',
            cssClass: 'apexcharts-yaxis-label',
          },
          offsetX: -10,
          formatter: function (value: any) {
            return value.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' });
          }
        },
      },
      fill: {
        opacity: 1
      },
      legend: {
        position: 'top',
        horizontalAlign: 'left',
        offsetX: -25
      },
      tooltip: {
        y: {
          formatter: function (value: any) {
            return value.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' });
          }
        }
      }
    };
  };

  async getTopFiveUserByMostRevenue() {
    const topFiveUserListByMostRevenue: any[] = [];
    for (let i = 0; i < this.transactionDataService.allTransactions.length; i++) {
      const transaction = this.transactionDataService.allTransactions[i];
      const userId = transaction.userId;
      const value = transaction.price;
      const userIndex = topFiveUserListByMostRevenue.findIndex((user) => user.userId === userId);
      if (userIndex === -1) {
        topFiveUserListByMostRevenue.push({ userId, value });
      } else {
        topFiveUserListByMostRevenue[userIndex].value += value;
      }
    }
    topFiveUserListByMostRevenue.sort((a, b) => b.value - a.value);
    return topFiveUserListByMostRevenue.slice(0, 5);
  }


  async getTopFiveUserNamesByMostRevenue() {
    let usersByMostRevenue = await this.getTopFiveUserByMostRevenue();
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
    return usernamesByMostRevenue;
  }

  async getTopFiveUserRevenuePerPackage(packageType: string) {
    let topFiveUsersByMostRevenue: any = await this.getTopFiveUserByMostRevenue();
    let topFiveUserRevenuePerBronzePackage = [];
    for (let i = 0; i < topFiveUsersByMostRevenue.length; i++) {
      const topFiveUser = topFiveUsersByMostRevenue[i].userId;
      let sum = 0;
      for (let j = 0; j < this.transactionDataService.allTransactions.length; j++) {
        const transaction = this.transactionDataService.allTransactions[j];
        const transactionUserId = transaction.userId;
        const transactionValue = transaction.price;
        const transactionPackage = transaction.description;
        if (topFiveUser === transactionUserId && transactionPackage === packageType) {
          sum += transactionValue;
        }
      }
      topFiveUserRevenuePerBronzePackage.push(sum);
    }
    return topFiveUserRevenuePerBronzePackage;
  }

  ngOnDestroy() {
    this.chart?.destroy();
    this.dataSubscription?.unsubscribe();
  }
}
