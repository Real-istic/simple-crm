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
  // monthsForChart: number[] = [4, 5, 6, 7, 8]; // 4 = May, 5 = June, 6 = July, 7 = August, 8 = September (remember that January = 0, February = 1, etc.)
  monthsForChart: number[] = []; // Dies wird dynamisch aktualisiert
  categories: string[] = []; // Dies wird dynamisch aktualisiert

  constructor() { }

  async ngOnInit() {
    const allUsers$ = this.userDataService.allUsers$;
    const allTransactions$ = this.transactionDataService.allTransactions$;
    this.dataSubscription = merge(allUsers$, allTransactions$).subscribe(() => {
      this.updateChartSeries();
    });
    this.updateMonthsForChartAndCategories();
    await this.setChartOptions();
    this.chart = new ApexCharts(document.querySelector("#chart"), this.chartOptions);
    this.chart.render();
  }

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
        // height: '250px',
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
            width: '100%',
          }
        },
    }]
    }
  }

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

        if (userRegistrationMonth === targetMonth && userRegistrationYear === 2023) {
          sum += 1;
        }
      }
      userCountPerMonth.push(sum);
    }
    return userCountPerMonth;
  }

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
        if (transactionMonth === targetMonth && transactionYear === new Date().getFullYear()) {
          sum += value;
        }
      }
      revenuePerMonth.push(sum);
    }
    return revenuePerMonth;
  }

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
        if (transactionMonth === targetMonth && transactionYear === 2023) {
          sum += 1;
        }
      }
      transactionCountPerMonth.push(sum);
    }
    return transactionCountPerMonth;
  }

  updateMonthsForChartAndCategories() {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();

    this.monthsForChart = [];
    this.categories = [];

    for (let i = 5; i >= 0; i--) {
      const targetMonth = (currentMonth - i + 12) % 12; // rember the Year can change
      this.monthsForChart.push(targetMonth);
      const monthName = this.getMonthName(targetMonth);
      this.categories.push(`${monthName} ${currentYear}`);
    }
  }

  getMonthName(month: number): string {
    const monthNames = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
    return monthNames[month];
  }

  ngOnDestroy() {
    this.chart?.destroy();
    this.dataSubscription?.unsubscribe();
  }

}
