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
  chartOptions: any = {};

  constructor() { }

  async ngOnInit() {
    this.dataSubscription = this.transactionDataService.allTransactions$.subscribe(async () => {
      await this.setChartOptions();
      this.chart?.updateOptions(this.chartOptions);
    });
    await this.setChartOptions();
    this.chart = new ApexCharts(document.querySelector("#chart2"), this.chartOptions);
    this.chart.render();
  }

  async setChartOptions() {
    this.chartOptions = {
      title: {
        text: 'Product Sales',
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
        width: 600,
        height: 350,
        type: 'donut',
      },
      colors: ["#cc6600", "#C0C0C0", "#ffcc00", "#a0b2c6"],
      series: await this.getTransactionAmountPerDescription(),
      labels: ["Bronze Packages", "Silver Packages", "Gold Packages", "Platinum Packages"],
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
      },
      legend: {
        position: 'right',
        horizontalAlign: 'right',
        offsetX: -20,
        itemMargin: {
          horizontal: 0,
          vertical: 10
        },
      }
    };
  }

  async getTransactionAmountPerDescription() {
    const TransactionAmountPerDescription: number[] = [0, 0, 0, 0];
    for (const transaction of this.transactionDataService.allTransactions) {
      const transactionType = transaction.description;
      switch (transactionType) {
        case 'Bronze Package':
          TransactionAmountPerDescription[0] += 1;
          break;
        case 'Silver Package':
          TransactionAmountPerDescription[1] += 1;
          break;
        case 'Gold Package':
          TransactionAmountPerDescription[2] += 1;
          break;
        case 'Platinum Package':
          TransactionAmountPerDescription[3] += 1;
          break;
        default:
          break;
      }
    }
    return TransactionAmountPerDescription;
  }

  ngOnDestroy() {
    this.chart?.destroy();
    this.dataSubscription?.unsubscribe();
  }
}
