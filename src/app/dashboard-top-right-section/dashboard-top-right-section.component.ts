import { Component, inject } from '@angular/core';
import * as ApexCharts from 'apexcharts';
import { TransactionDataService } from '../transaction-data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard-top-right-section',
  templateUrl: './dashboard-top-right-section.component.html',
  styleUrls: ['./dashboard-top-right-section.component.scss']
})
export class DashboardRightSectionComponent {
  transactionDataService: TransactionDataService = inject(TransactionDataService);
  chart: ApexCharts | undefined;
  dataSubscription: Subscription | undefined;

  constructor() { }

  async ngOnInit() {
    this.dataSubscription = this.transactionDataService.allTransactions$.subscribe(() => {
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
      colors: ["#cc6600", "#D3D3D3", "#ffcc00", "#a0b2c6"],
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
          top: 0.1,
          left: 0.1,
          blur: 0.2,
          color: '#000',
          opacity: 0.1
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
    await this.chart.render();
  }

  ngOnDestroy() {
    if (this.chart) {
      this.chart.destroy();
    }
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
    }
  }

  async updateChartSeries() {
    if (this.chart) {
      this.chart.updateSeries(await this.transactionDataService.getTransactionAmountPerDescription());
    }
  }

}
