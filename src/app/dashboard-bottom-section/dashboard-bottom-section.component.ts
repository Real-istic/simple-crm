import { Component, ViewChild, inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/models/user.class';
import { Transaction } from 'src/models/transaction.class';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { UserDataService } from '../user-data.service';
import { TransactionDataService } from '../transaction-data.service';



@Component({
  selector: 'app-dashboard-bottom-section',
  templateUrl: './dashboard-bottom-section.component.html',
  styleUrls: ['./dashboard-bottom-section.component.scss']
})
export class DashboardBottomSectionComponent {
  dialog: MatDialog = inject(MatDialog);
  route: ActivatedRoute = inject(ActivatedRoute);
  userDataService: UserDataService = inject(UserDataService);
  transactionDataService: TransactionDataService = inject(TransactionDataService);

  displayedColumns: string[] = ['description', 'price', 'date'];
  dataSource!: MatTableDataSource<User>;

  allTransactions: any[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() { }

  async ngOnInit() {
    await this.transactionDataService.initialize();

    this.transactionDataService.allTransactions$.subscribe(() => {
      this.allTransactions = this.transactionDataService.allTransactions;
    });

    this.allTransactions.sort((a: any, b: any) => this.sortByLastTransactionDate(a, b));
    this.dataSource = new MatTableDataSource(this.allTransactions);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  sortByLastTransactionDate(a: any, b: any) {
    const aDate = new Date(a.date);
    const bDate = new Date(b.date);
    return bDate.getTime() - aDate.getTime();
  }

  formatDate(timestamp: number): string {
    const date = new Date(timestamp);
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  }
}

