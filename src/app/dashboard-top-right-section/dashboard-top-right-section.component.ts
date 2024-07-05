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
  private transactionDataService: TransactionDataService = inject(TransactionDataService);
  private chart?: ApexCharts;
  private chartOptions: any = {};
  private dataSubscription?: Subscription;

  ngOnInit(): void {
    this.setSubscription();
  }

  /**
   * chart Subscriptions is set
   */
  private setSubscription(): void {
    this.dataSubscription = this.transactionDataService.allTransactions$.subscribe(() => {
      this.updateChartSeries();
    });
  }

  /**
   * updates the chart series with the new data.
   */
  private updateChartSeries(): void {
    this.chart?.updateSeries(
      this.getTransactionAmountPerDescription()
    );
  }

  /**
   * chart options and data are set, they define the different chart
   * properties and more importantly the data that is displayed in the chart.
   */
  private setChartOptions(): void {
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
        type: 'donut',
        maxHeight: 200,
      },
      colors: ["#cc6600", "#C0C0C0", "#ffcc00", "#a0b2c6"],
      series: this.getTransactionAmountPerDescription(),
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
      },
      responsive: [{
        breakpoint: 480,
        options: {
          legend: {
            itemMargin: {
              horizontal: -10,
              vertical: 5
            },
            fontSize: '10px',
          },
          dataLabels: {
            style: {
              fontSize: '12px',
            }
          },
        },
      }]
    };
  }

  /**
   * returns an array with the amount of transactions per description.
   * 
   * @returns the transaction amount per description
   */
  private getTransactionAmountPerDescription(): number[] {
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

  /**
   * initializes and Renders the Chart
   */
  ngAfterViewInit(): void {
    this.setChartOptions();
    this.chart = new ApexCharts(document.querySelector("#chart2"), this.chartOptions);
    this.chart.render();
  }

  /**
   * the chart gets destroyed and the data subscription gets unsubscribed to avoid memory leaks.
   */
  ngOnDestroy(): void {
    this.chart?.destroy();
    this.dataSubscription?.unsubscribe();
  }
}
