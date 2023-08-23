import { Component, inject } from '@angular/core';
import * as ApexCharts from 'apexcharts';
import { UserDataService } from '../user-data.service';
import { TransactionDataService } from '../transaction-data.service';

@Component({
  selector: 'app-dashboard-middle-section',
  templateUrl: './dashboard-middle-section.component.html',
  styleUrls: ['./dashboard-middle-section.component.scss']
})
export class DashboardMiddleSectionComponent {
  UserDataService: UserDataService = inject(UserDataService);
  TransactionDataService: TransactionDataService = inject(TransactionDataService);

  userCount!: number[];
  userRevenue!: number[];
  TransactionCount!: number[];

  constructor() { }

  async ngOnInit() {
    await this.UserDataService.initialize();
    await this.TransactionDataService.initialize();
    this.userCount = await this.UserDataService.getUserCountPerMonth();
    this.userRevenue = await this.TransactionDataService.getRevenuePerMonth();
    this.TransactionCount = await this.TransactionDataService.getTransactionCountPerMonth();

    let options = {
      title: {
        text: 'HISTORY',
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
          data: this.userCount
        },
        {
          name: "Revenue",
          data: this.userRevenue
        },
        {
          name: "Transactions",
          data: this.TransactionCount
        }
      ],
      xaxis: {
        categories: ['Mar 2023', 'Jun 2023', 'Jul 2023', 'Aug 2023', 'Sep 2023']
      }
    }

    var chart = new ApexCharts(document.querySelector("#chart"), options);

    chart.render();
  }

}
