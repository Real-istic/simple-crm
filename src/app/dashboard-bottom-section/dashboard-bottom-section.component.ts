import { Component, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Transaction } from 'src/models/transaction.class';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { TransactionDataService } from '../transaction-data.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-dashboard-bottom-section',
  templateUrl: './dashboard-bottom-section.component.html',
  styleUrls: ['./dashboard-bottom-section.component.scss']
})
export class DashboardBottomSectionComponent implements OnInit, OnDestroy {
  private dialog: MatDialog = inject(MatDialog);
  private route: ActivatedRoute = inject(ActivatedRoute);
  private transactionDataService: TransactionDataService = inject(TransactionDataService);

  displayedColumns: string[] = ['description', 'price', 'date'];
  dataSource: MatTableDataSource<Transaction> = new MatTableDataSource<Transaction>();
  private dataSubscription?: Subscription;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  // data subscription is set and the table data gets sorted by the transaction date, also the dataSource for the MatTable gets updated with the sorted data.
  async ngOnInit(): Promise<void> {
    this.dataSubscription = this.transactionDataService.allTransactions$.subscribe(transactions => {
      const sortedTransactionData: Transaction[] = transactions.sort((a: Transaction, b: Transaction) => this.sortByLastTransactionDate(a, b));
      this.dataSource.data = sortedTransactionData;
    });
  }

  // the paginator is set after the view is initialized to ensure that the paginator is available when the data is loaded.
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  // the data gets sorted by the transaction date. The data is sorted in descending order, so the most recent transaction is at the top.
  private sortByLastTransactionDate(a: Transaction, b: Transaction): number {
    const aDate = new Date(a.date);
    const bDate = new Date(b.date);
    return bDate.getTime() - aDate.getTime();
  }

  // the date is formatted to a more readable format.
  formatDate(timestamp: number): string {
    const date = new Date(timestamp);
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  }

  // the data subscription gets unsubscribed to avoid memory leaks.
  ngOnDestroy(): void {
    this.dataSubscription?.unsubscribe();
  }
}

