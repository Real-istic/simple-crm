import { Component } from '@angular/core';
import * as ApexCharts from 'apexcharts';

@Component({
  selector: 'app-dashboard-middle-section',
  templateUrl: './dashboard-middle-section.component.html',
  styleUrls: ['./dashboard-middle-section.component.scss']
})
export class DashboardMiddleSectionComponent {

  ngOnInit() {
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
          data: [66, 122, 333, 233, 554, 777, 987, 1337]
        },
        {
          name: "Revenue",
          data: [120, 329, 537, 436, 354, 945, 1450, 1158]
        },
        {
          name: "Transactions",
          data: [110, 220, 230, 440, 350, 760, 670, 1180]
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
