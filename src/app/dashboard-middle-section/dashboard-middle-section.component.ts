import { AfterViewInit, Component, OnDestroy, OnInit, inject } from '@angular/core';
import * as ApexCharts from 'apexcharts';
import { UserDataService } from '../user-data.service';
import { TransactionDataService } from '../transaction-data.service';
import { Subscription, merge } from 'rxjs';

@Component({
  selector: 'app-dashboard-middle-section',
  templateUrl: './dashboard-middle-section.component.html',
  styleUrls: ['./dashboard-middle-section.component.scss']
})
export class DashboardMiddleSectionComponent implements OnInit, AfterViewInit, OnDestroy {
  private userDataService: UserDataService = inject(UserDataService);
  private transactionDataService: TransactionDataService = inject(TransactionDataService);
  private chart?: ApexCharts;
  private chartOptions = {};
  private dataSubscription?: Subscription;
  private monthsForChart: number[] = [];
  private categories: string[] = [];

  ngOnInit(): void {
    this.setSubscription();
    this.updateMonthsForChartAndCategories();
    this.setChartOptions();
  }

  /**
   * initializes the subscription
   */
  setSubscription(): void {
    const allUsers$ = this.userDataService.allUsers$;
    const allTransactions$ = this.transactionDataService.allTransactions$;
    this.dataSubscription = merge(allUsers$, allTransactions$).subscribe(() => {
      this.updateChartSeries();
    });
  }

  /**
   * the chart series are updated with the new data.
   */
  private updateChartSeries(): void {
    this.chart?.updateSeries([
      {
        name: "New Users",
        data: this.getUserCountPerMonth()
      },
      {
        name: "Revenue",
        data: this.getRevenuePerMonth()
      },
      {
        name: "Transactions",
        data: this.getTransactionCountPerMonth()
      }
    ]);
  }

  /**
   * chart options and data are set, they define the different chart
   * properties and more importantly the data that is displayed in the chart.
   */
  private setChartOptions(): void {
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
          data: this.getUserCountPerMonth()
        },
        {
          name: "Revenue",
          data: this.getRevenuePerMonth()
        },
        {
          name: "Transactions",
          data: this.getTransactionCountPerMonth()
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

  /**
   * sets the last 6 months for the chart and the categories for (month names) the x-axis.
   */
  private updateMonthsForChartAndCategories(): void {
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

  /**
   * returns the month name for a given month number. 
   * 
   * @param month the specific month as a number (0 = Jan, 1 = Feb, ...)
   * @returns the name of the month
   */
  private getMonthName(month: number): string {
    const monthNames = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
    return monthNames[month];
  }

  /**
   * analyses the registered users per month (for the last 6 months) and
   * returns an array with the number of registered users per month.
   * 
   * @returns the user count per month
   */
  private getUserCountPerMonth(): number[] {
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

  /**
   * analyses the revenue per month (for the last 6 months ()) and returns
   * an array with the revenue per month.
   * 
   * @returns the revenue per month
   */
  private getRevenuePerMonth(): number[] {
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

  /**
   * analyses the transactions per month (for the last 6 months) and returns
   * an array with the number of transactions per month.
   * 
   * @returns the transaction count per month
   */
  private getTransactionCountPerMonth(): number[] {
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

  /**
   * renders the Chart with the specific options
   */
  ngAfterViewInit(): void {
    this.chart = new ApexCharts(document.querySelector("#chart"), this.chartOptions);
    this.chart.render();
  }

  /**
   * unsubscribe and chart destroy to avoid memory leaks.
   */
  ngOnDestroy(): void {
    this.chart?.destroy();
    this.dataSubscription?.unsubscribe();
  }
}
