import { Component, inject } from '@angular/core';
import * as ApexCharts from 'apexcharts';
import { TransactionDataService } from '../transaction-data.service';

@Component({
  selector: 'app-dashboard-right-section',
  templateUrl: './dashboard-right-section.component.html',
  styleUrls: ['./dashboard-right-section.component.scss']
})
export class DashboardRightSectionComponent {
  transactionDataService: TransactionDataService = inject(TransactionDataService);
  chart: ApexCharts | undefined;

  constructor() { }

  async ngOnInit() {
    this.transactionDataService.allTransactions$.subscribe(() => {
      this.updateChartSeries();
    });

    let options = {
      title: {
        text: 'Product Sales',
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
        height: '1050px',
        type: 'donut',
        dropShadow: {
          enabled: true,
          enabledOnSeries: false,
          top: 3,
          left: 3,
          blur: 3,
          color: 'black',
          opacity: 0.33
        }
      },
      colors: ["#cc6600", "#cccccc", "#ffcc00", " #e0e0e0"],
      series: await this.transactionDataService.getTransactionAmountPerDescription(),
      labels: ["Bronze Package", "Silver Package", "Gold Package", "Platinum Package"],
      dataLabels: {
        enabled: true,
        enabledOnSeries: undefined,
        textAnchor: 'middle',
        distributed: false,
        offsetX: 0,
        offsetY: 0,
        style: {
          fontSize: '14px',
          fontFamily: 'Helvetica, Arial, sans-serif',
          fontWeight: 'bold',
          colors: ["white"]
        },
        background: {
          enabled: true,
          foreColor: 'black',
          padding: 5,
          opacity: 0.66,
          dropShadow: {
            enabled: true,
            top: 4,
            left: 4,
            blur: 1,
            color: '#000',
            opacity: 0.33
          }
        },
        dropShadow: {
          enabled: true,
          top: 0.2,
          left: 0.2,
          blur: 0.5,
          color: '#000',
          opacity: 0.35
        }
      },
      plotOptions: {
        pie: {
          donut: {
            size: '40%'
          }
        }
      },
      tooltip: {
        enabled: true,
        shared: true,
        fillSeriesColor: false,
        theme: 'dark',
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
    };

    this.chart = new ApexCharts(document.querySelector("#chart2"), options);
    this.chart.render();
  }

  async updateChartSeries() {
    if (this.chart) {
      this.chart.updateSeries(await this.transactionDataService.getTransactionAmountPerDescription());
    }
  }

}
