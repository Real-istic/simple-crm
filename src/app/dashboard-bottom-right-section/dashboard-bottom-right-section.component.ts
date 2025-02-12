import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import * as ApexCharts from 'apexcharts';
import { UserDataService } from '../user-data.service';
import { TransactionDataService } from '../transaction-data.service';
import {
  asyncScheduler,
  combineLatest,
  first,
  Subscription,
  take,
  tap,
} from 'rxjs';
import { UserValue } from 'src/models/userValue.class';

@Component({
  selector: 'app-dashboard-bottom-right-section',
  templateUrl: './dashboard-bottom-right-section.component.html',
  styleUrls: ['./dashboard-bottom-right-section.component.scss'],
})
export class DashboardBottomRightSectionComponent implements OnInit, OnDestroy {
  private userDataService: UserDataService = inject(UserDataService);
  private transactionDataService: TransactionDataService = inject(
    TransactionDataService,
  );
  private chart?: ApexCharts;
  private chartOptions = {};
  private dataSubscription?: Subscription;

  ngOnInit(): void {
    combineLatest([
      this.transactionDataService.allTransactions$,
      this.userDataService.allUsers$,
    ])
      .pipe(
        first(
          ([transactions, users]) =>
            transactions.length > 0 && users.length > 0,
        ),
        take(1),
        tap(() => {
          void this.setSubscription();
          void this.setChartOptions();
          this.updateChart();
        }),
      )
      .subscribe();
  }

  /**
   * initializes the subscription
   */
  private async setSubscription() {
    this.dataSubscription =
      this.transactionDataService.allTransactions$.subscribe(() => {
        this.updateChartSeries();
      });
  }

  /**
   * updates the chart series
   */
  private async updateChartSeries() {
    this.chart?.updateSeries([
      {
        name: 'Bronze Packages',
        data: await this.getTopFiveUserRevenuePerPackage('Bronze Package'),
      },
      {
        name: 'Silver Packages',
        data: await this.getTopFiveUserRevenuePerPackage('Silver Package'),
      },
      {
        name: 'Gold Packages',
        data: await this.getTopFiveUserRevenuePerPackage('Gold Package'),
      },
      {
        name: 'Platinum Packages',
        data: await this.getTopFiveUserRevenuePerPackage('Platinum Package'),
      },
    ]);
  }

  /**
   * chart options and data are set, they define the different chart
   * properties and more importantly the data that is displayed in the chart.
   */
  private async setChartOptions() {
    this.chartOptions = {
      series: [
        {
          name: 'Bronze Packages',
          data: await this.getTopFiveUserRevenuePerPackage('Bronze Package'),
        },
        {
          name: 'Silver Packages',
          data: await this.getTopFiveUserRevenuePerPackage('Silver Package'),
        },
        {
          name: 'Gold Packages',
          data: await this.getTopFiveUserRevenuePerPackage('Gold Package'),
        },
        {
          name: 'Platinum Packages',
          data: await this.getTopFiveUserRevenuePerPackage('Platinum Package'),
        },
      ],
      chart: {
        type: 'bar',
        height: 440,
        stacked: true,
      },
      dataLabels: {
        enabled: false,
        offsetY: 8,
        offsetX: 4,
        formatter: function (value: number) {
          return value.toLocaleString('de-DE', {
            style: 'currency',
            currency: 'EUR',
            minimumFractionDigits: 0,
          });
        },
      },
      colors: ['#cc6600', '#C0C0C0', '#ffcc00', '#a0b2c6'],
      plotOptions: {
        bar: {
          horizontal: true,
          dataLabels: {
            total: {
              enabled: true,
              offsetX: -3,
              style: {
                fontSize: '14px',
                fontWeight: 900,
              },
            },
          },
        },
      },
      stroke: {
        width: 1,
        colors: ['#fff'],
      },
      title: {
        text: 'Most Valuable Customers',
        style: {
          fontSize: '16px',
          fontWeight: '500',
          fontFamily: 'Roboto, sans-serif',
          color: '#263238',
        },
      },
      xaxis: {
        categories: await this.getTopFiveUserNamesByMostRevenue(),
        labels: {
          show: true,
          formatter: function (value: any) {
            return value.toLocaleString('de-DE', {
              style: 'currency',
              currency: 'EUR',
              minimumFractionDigits: 0,
            });
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
          formatter: function (value: number) {
            return value.toLocaleString('de-DE', {
              style: 'currency',
              currency: 'EUR',
            });
          },
        },
      },
      fill: {
        opacity: 1,
      },
      legend: {
        position: 'top',
        horizontalAlign: 'left',
        offsetX: -25,
      },
      tooltip: {
        y: {
          formatter: function (value: number) {
            return value.toLocaleString('de-DE', {
              style: 'currency',
              currency: 'EUR',
            });
          },
        },
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              height: 340,
            },
            yaxis: {
              labels: {
                style: {
                  fontSize: '10px',
                  fontWeight: '700',
                },
              },
            },
            legend: {
              fontSize: '10px',
            },
            plotOptions: {
              bar: {
                dataLabels: {
                  total: {
                    style: {
                      fontSize: '12px',
                    },
                  },
                },
              },
            },
          },
        },
      ],
    };
  }

  /**
   * the top five users by most revenue are calculated by iterating over all
   * transactions and adding the price of each transaction to the user's total revenue.
   *
   * @returns the top five user listed by the most revenue
   */
  private async getTopFiveUserByMostRevenue() {
    const topFiveUserListByMostRevenue: UserValue[] = [];

    for (
      let i = 0;
      i < this.transactionDataService.allTransactions.length;
      i++
    ) {
      const transaction = this.transactionDataService.allTransactions[i];
      const userId = transaction.userId;
      const value = transaction.price;
      const userIndex = topFiveUserListByMostRevenue.findIndex(
        (user) => user.userId === userId,
      );
      if (userIndex === -1) {
        topFiveUserListByMostRevenue.push({ userId, value });
      } else {
        topFiveUserListByMostRevenue[userIndex].value += value;
      }
    }
    topFiveUserListByMostRevenue.sort((a, b) => b.value - a.value);
    return topFiveUserListByMostRevenue.slice(0, 5);
  }

  /**
   * the top five usernames by most revenue are calculated by iterating over the top
   * five users by most revenue and comparing their userId to the userId of all users.
   *
   * @returns the usernames by the most revenue
   */
  private async getTopFiveUserNamesByMostRevenue() {
    let usersByMostRevenue = await this.getTopFiveUserByMostRevenue();
    let usernamesByMostRevenue = [];

    for (let i = 0; i < usersByMostRevenue?.length; i++) {
      const transactionUserId = usersByMostRevenue[i].userId;
      for (let j = 0; j < this.userDataService.allUsers.length; j++) {
        const userId = this.userDataService.allUsers[j].id;
        if (transactionUserId === userId) {
          usernamesByMostRevenue.push(
            this.userDataService.allUsers[j].firstName +
              ' ' +
              this.userDataService.allUsers[j].lastName,
          );
        }
      }
    }
    return usernamesByMostRevenue;
  }

  /**
   * packageType is passed as an argument to this function to determine which package
   * type is being calculated. The top five user revenue per package is calculated by
   * iterating over all transactions and adding the price of each transaction to the
   * user's total revenue per package.
   *
   * @param packageType for example: Bronze Package, Silver Package etc.
   * @returns the top five revenue per package
   */
  private async getTopFiveUserRevenuePerPackage(packageType: string) {
    let topFiveUsersByMostRevenue: UserValue[] =
      await this.getTopFiveUserByMostRevenue();
    let topFiveUserRevenuePerPackage = [];

    for (let i = 0; i < topFiveUsersByMostRevenue.length; i++) {
      const topFiveUser = topFiveUsersByMostRevenue[i].userId;
      let sum = 0;
      for (
        let j = 0;
        j < this.transactionDataService.allTransactions.length;
        j++
      ) {
        const transaction = this.transactionDataService.allTransactions[j];
        const transactionUserId = transaction.userId;
        const transactionValue = transaction.price;
        const transactionPackage = transaction.description;
        if (
          topFiveUser === transactionUserId &&
          transactionPackage === packageType
        ) {
          sum += transactionValue;
        }
      }
      topFiveUserRevenuePerPackage.push(sum);
    }
    return topFiveUserRevenuePerPackage;
  }

  /**
   * renders the Chart
   */
  private updateChart(): void {
    asyncScheduler.schedule(() => {
      this.chart = new ApexCharts(
        document.querySelector('#chart3'),
        this.chartOptions,
      );
      this.chart?.render();
    }, 200);
  }

  /**
   * the chart gets destroyed and the data subscription gets unsubscribed to avoid memory leaks.
   */
  ngOnDestroy(): void {
    this.chart?.destroy();
    this.dataSubscription?.unsubscribe();
  }
}
