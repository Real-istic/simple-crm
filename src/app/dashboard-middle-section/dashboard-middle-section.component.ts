import { Component, inject } from '@angular/core';
import * as ApexCharts from 'apexcharts';
import { UserDataService } from '../user-data-service.service';

@Component({
  selector: 'app-dashboard-middle-section',
  templateUrl: './dashboard-middle-section.component.html',
  styleUrls: ['./dashboard-middle-section.component.scss']
})
export class DashboardMiddleSectionComponent {
  UserDataService: UserDataService = inject(UserDataService);

  userCount!: number[];
  userRevenue!: number[];
  userTransactions!: number[];

  constructor() { }

  async ngOnInit() {
    await this.UserDataService.initialize();
    this.userCount = this.UserDataService.userData;
    this.userRevenue = this.UserDataService.userRevenue;
    this.userTransactions = this.UserDataService.getUserTransactions();


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
          name: "Users",
          data: this.userCount
        },
        {
          name: "Revenue",
          data: this.userRevenue
        },
        {
          name: "Transactions",
          data: this.userTransactions
        }
      ],
      xaxis: {
        categories: [2017, 2018, 2019, 2018, 2019, 2020, 2021, 2022, 2023]
      }
    }

    var chart = new ApexCharts(document.querySelector("#chart"), options);

    chart.render();
  }

}
