import { Component, inject } from '@angular/core';
import * as ApexCharts from 'apexcharts';
import { UserDataService } from '../user-data.service';
import { TransactionDataService } from '../transaction-data.service';
import { merge } from 'rxjs';

@Component({
  selector: 'app-dashboard-middle-section',
  templateUrl: './dashboard-middle-section.component.html',
  styleUrls: ['./dashboard-middle-section.component.scss']
})
export class DashboardMiddleSectionComponent {
  userDataService: UserDataService = inject(UserDataService);
  transactionDataService: TransactionDataService = inject(TransactionDataService);
  chart: ApexCharts | undefined;

  constructor() { }

  async ngOnInit() {
    // await this.transactionDataService.initialize();

    const allUsers$ = this.userDataService.allUsers$;
    const allTransactions$ = this.transactionDataService.allTransactions$;

    merge(allUsers$, allTransactions$).subscribe(() => {
      this.updateChartSeries();
    });

    let options = {
      title: {
        text: 'History',
        align: 'left',
        margin: 10,
        offsetX: 0,
        offsetY: 0,
        floating: false,
        style: {
          fontSize: '14px',
          fontWeight: 'bold',
          fontFamily: undefined,
          color: '#263238'
        },
      },
      stroke: {
        curve: 'smooth',
      },
      chart: {
        height: '250px',
        type: 'line'
      },
      colors: ["#447AE7", "#ffa200", "#00df77"],
      series: [
        {
          name: "New Users",
          data: await this.userDataService.getUserCountPerMonth()
        },
        {
          name: "Revenue",
          data: await this.transactionDataService.getRevenuePerMonth()
        },
        {
          name: "Transactions",
          data: await this.transactionDataService.getTransactionCountPerMonth()
        }
      ],
      xaxis: {
        categories: ['May 2023', 'Jun 2023', 'Jul 2023', 'Aug 2023', 'Sep 2023']
      },
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 300,
        animateGradually: {
          enabled: true,
          delay: 150
        },
        dynamicAnimation: {
          enabled: true,
          speed: 150
        }
      }
    }

    this.chart = new ApexCharts(document.querySelector("#chart"), options);
    this.chart.render();
  }

  async updateChartSeries() {
    if (this.chart) {
      this.chart.updateSeries([
        {
          name: "New Users",
          data: await this.userDataService.getUserCountPerMonth()
        },
        {
          name: "Revenue",
          data: await this.transactionDataService.getRevenuePerMonth()
        },
        {
          name: "Transactions",
          data: await this.transactionDataService.getTransactionCountPerMonth()
        }
      ]);
    }
  }

}
