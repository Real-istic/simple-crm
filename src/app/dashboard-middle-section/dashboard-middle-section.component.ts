import { Component, inject } from '@angular/core';
import * as ApexCharts from 'apexcharts';
import { UserDataService } from '../user-data.service';
import { TransactionDataService } from '../transaction-data.service';
import { Subscription, merge } from 'rxjs';

@Component({
  selector: 'app-dashboard-middle-section',
  templateUrl: './dashboard-middle-section.component.html',
  styleUrls: ['./dashboard-middle-section.component.scss']
})
export class DashboardMiddleSectionComponent {
  userDataService: UserDataService = inject(UserDataService);
  transactionDataService: TransactionDataService = inject(TransactionDataService);
  chart: ApexCharts | undefined;
  chartOptions: any = {};
  dataSubscription: Subscription | undefined;
  monthsForChart: number[] = [];
  categories: string[] = [];

  constructor() { }

  // allUsers and allTransactions are subscribed to and the chart gets updated when the data changes also the chart options are set and the chart is rendered.
  async ngOnInit() {
    const allUsers$ = this.userDataService.allUsers$;
    const allTransactions$ = this.transactionDataService.allTransactions$;
    this.dataSubscription = merge(allUsers$, allTransactions$).subscribe(async () => {
     await this.updateChartSeries();
    });
    this.updateMonthsForChartAndCategories(); // sets the last 6 months for the chart
    await this.setChartOptions();
    this.chart = new ApexCharts(document.querySelector("#chart"), this.chartOptions);
    this.chart.render();
  }

  // the chart series are updated with the new data.
  async updateChartSeries() {
    this.chart?.updateSeries([
      {
        name: "New Users",
        data: await this.getUserCountPerMonth()
      },
      {
        name: "Revenue",
        data: await this.getRevenuePerMonth()
      },
      {
        name: "Transactions",
        data: await this.getTransactionCountPerMonth()
      }
    ]);
  }

  // chart options and data are set, they define the different chart properties and more importantly the data that is displayed in the chart.
  async setChartOptions() {
    this.chartOptions = {
      title: {
        text: 'History',
        align: 'left',
        margin: 10,
        offsetX: 0,
        offsetY: 0,
        floating: false,
        style: {
          fontSize: '16px',
          fontWeight: '500',
          fontFamily: 'Roboto, sans-serif',
          color: '#263238'
        },
      },
      stroke: {
        curve: 'smooth',
      },
      chart: {
        type: 'line',
        animations: {
          enabled: true,
          easing: 'easeinout',
          speed: 1000,
          animateGradually: {
            enabled: true,
            delay: 0
          },
          dynamicAnimation: {
            enabled: true,
            speed: 1000
          }
        }
      },
      colors: ["#447AE7", "#ffa200", "#00df77"],
      series: [
        {
          name: "New Users",
          data: await this.getUserCountPerMonth()
        },
        {
          name: "Revenue",
          data: await this.getRevenuePerMonth()
        },
        {
          name: "Transactions",
          data: await this.getTransactionCountPerMonth()
        }
      ],
      xaxis: {
        categories: this.categories
      },
      responsive: [{
        breakpoint: 700,
        options: {
          chart: {

          },
          legend: {
            fontSize: '8px',
          },
          xaxis: {
            labels: {
              style: {
                fontSize: '8px',
              },
            },
          },
          yaxis: {
            labels: {
              style: {
                fontSize: '8px',
              },
            },
          }
        },
      }]

    }
  }

  // sets the last 6 months for the chart and the categories for (month names) the x-axis.
  updateMonthsForChartAndCategories() {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();

    this.monthsForChart = [];
    this.categories = [];

    for (let i = 5; i >= 0; i--) {
      const targetMonth = (currentMonth - i + 12) % 12; // remember the Year can change
      this.monthsForChart.push(targetMonth);
      const monthName = this.getMonthName(targetMonth);
      this.categories.push(`${monthName}`);
    }
  }

  // returns the month name for a given month number. (0 = Jan, 1 = Feb, ...)
  getMonthName(month: number): string {
    const monthNames = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
    return monthNames[month];
  }

  // analyses the registered users per month (for the last 6 months) and returns an array with the number of registered users per month.
  async getUserCountPerMonth() {
    let userCountPerMonth: number[] = [];
    for (let i = 0; i < this.monthsForChart.length; i++) {
      const targetMonth = this.monthsForChart[i];
      let sum = 0;
      for (let j = 0; j < this.userDataService.allUsers.length; j++) {
        const user = this.userDataService.allUsers[j];
        const userRegistrationDate = new Date(user.registrationDate);
        const userRegistrationYear = userRegistrationDate.getFullYear();
        const userRegistrationMonth = userRegistrationDate.getMonth();
        const currentYear = new Date().getFullYear();
        if (userRegistrationMonth === targetMonth && userRegistrationYear === currentYear) {
          sum += 1;
        }
      }
      userCountPerMonth.push(sum);
    }
    return userCountPerMonth;
  }

  // analyses the revenue per month (for the last 6 months ()) and returns an array with the revenue per month.
  async getRevenuePerMonth() {
    let revenuePerMonth: number[] = [];
    for (let i = 0; i < this.monthsForChart.length; i++) {
      const targetMonth = this.monthsForChart[i];
      let sum = 0;
      for (let j = 0; j < this.transactionDataService.allTransactions.length; j++) {
        const transaction = this.transactionDataService.allTransactions[j];
        const value = transaction.price;
        const transactionDate = new Date(transaction.date);
        const transactionYear = transactionDate.getFullYear();
        const transactionMonth = transactionDate.getMonth();
        const currentYear = new Date().getFullYear();
        if (transactionMonth === targetMonth && transactionYear === currentYear) {
          sum += value;
        }
      }
      revenuePerMonth.push(sum);
    }
    return revenuePerMonth;
  }

  // analyses the transactions per month (for the last 6 months) and returns an array with the number of transactions per month.
  async getTransactionCountPerMonth() {
    let transactionCountPerMonth: number[] = [];
    for (let i = 0; i < this.monthsForChart.length; i++) {
      const targetMonth = this.monthsForChart[i];
      let sum = 0;
      for (let j = 0; j < this.transactionDataService.allTransactions.length; j++) {
        const transaction = this.transactionDataService.allTransactions[j];
        const transactionDate = new Date(transaction.date);
        const transactionYear = transactionDate.getFullYear();
        const transactionMonth = transactionDate.getMonth();
        const currentYear = new Date().getFullYear();
        if (transactionMonth === targetMonth && transactionYear === currentYear) {
          sum += 1;
        }
      }
      transactionCountPerMonth.push(sum);
    }
    return transactionCountPerMonth;
  }

  // the chart gets destroyed and the data subscription gets unsubscribed to avoid memory leaks.
  ngOnDestroy() {
    this.chart?.destroy();
    this.dataSubscription?.unsubscribe();
  }

}
