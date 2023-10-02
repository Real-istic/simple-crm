import { Component, ViewChild, inject } from '@angular/core';
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
export class DashboardBottomSectionComponent {
  dialog: MatDialog = inject(MatDialog);
  route: ActivatedRoute = inject(ActivatedRoute);
  transactionDataService: TransactionDataService = inject(TransactionDataService);

  displayedColumns: string[] = ['description', 'price', 'date'];
  dataSource: MatTableDataSource<Transaction> = new MatTableDataSource<Transaction>();
  dataSubscription: Subscription | undefined;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor() { }

  // data subscription is set and the table data gets sorted by the transaction date, also the dataSource for the MatTable gets updated with the sorted data.
  async ngOnInit() {
    this.dataSubscription = this.transactionDataService.allTransactions$.subscribe(transactions => {
      const sortedTransactionData = transactions.sort((a: any, b: any) => this.sortByLastTransactionDate(a, b));
      this.dataSource.data = sortedTransactionData;
    });
  }

  // the paginator is set after the view is initialized to ensure that the paginator is available when the data is loaded.
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  // the data gets sorted by the transaction date. The data is sorted in descending order, so the most recent transaction is at the top.
  sortByLastTransactionDate(a: any, b: any) {
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
  ngOnDestroy() {
    this.dataSubscription?.unsubscribe();
  }
}

