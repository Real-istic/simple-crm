import { Component, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Transaction } from 'src/models/transaction.class';
import { TransactionDataService } from '../transaction-data.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-dashboard-bottom-section',
  templateUrl: './dashboard-bottom-section.component.html',
  styleUrls: ['./dashboard-bottom-section.component.scss']
})
export class DashboardBottomSectionComponent implements OnInit, OnDestroy {
  private transactionDataService: TransactionDataService = inject(TransactionDataService);
  protected displayedColumns: string[] = ['description', 'price', 'date'];
  protected dataSource: MatTableDataSource<Transaction> = new MatTableDataSource<Transaction>();
  private dataSubscription?: Subscription;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  async ngOnInit(): Promise<void> {
    this.setSubscription();
  }

  /**
   * initializes the subscription
   */
  setSubscription(): void {
    this.dataSubscription = this.transactionDataService.allTransactions$.subscribe(transactions => {
      const sortedTransactionData: Transaction[] = transactions.sort((a: Transaction, b: Transaction) => this.sortByLatestTransactionDate(a, b));
      this.dataSource.data = sortedTransactionData;
    });
  }

  /**
   * the data gets sorted by the transaction date. The data is sorted 
   * in descending order, so the most recent transaction is at the top.
   * 
   * @returns the latest transactions
   */
  private sortByLatestTransactionDate(a: Transaction, b: Transaction): number {
    const aDate = new Date(a.date);
    const bDate = new Date(b.date);
    return bDate.getTime() - aDate.getTime();
  }

  /**
   * the date is formatted to a more readable format.
   * 
   * @returns the formatted Date
   */
  formatDate(timestamp: number): string {
    const date = new Date(timestamp);
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  }

  /**
 * the paginator is set after the view is initialized to ensure that the paginator is available when the data is loaded.
 */
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy(): void {
    this.dataSubscription?.unsubscribe();
  }
}

