import { Component, ViewChild, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/models/user.class';
import { Transaction } from 'src/models/transaction.class';
import { DialogEditAddressComponent } from '../dialog-edit-address/dialog-edit-address.component';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';
import { DialogAddTransactionComponent } from '../dialog-add-transaction/dialog-add-transaction.component';
import { UserDataService } from '../user-data.service';
import { TransactionDataService } from '../transaction-data.service';
import { Observable, firstValueFrom, Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';


@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})

export class UserDetailComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  dialog: MatDialog = inject(MatDialog);
  userDataService: UserDataService = inject(UserDataService);
  transactionDataService: TransactionDataService = inject(TransactionDataService);
  dataSource: MatTableDataSource<Transaction> = new MatTableDataSource<Transaction>();
  displayedColumns: string[] = ['description', 'price', 'date', 'id'];
  userId: string = '';
  transactionId: string = '';
  transaction: Transaction = new Transaction();
  user$!: Observable<User | undefined>;
  userTransactions$!: Observable<Transaction[]>;
  dataSubscription: Subscription | undefined;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor() { }

  async ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.userId = params.get('id') || '';
      console.log('User-id: ', this.userId);
    });

    this.user$ = this.userDataService.getUser(this.userId);
    this.userTransactions$ = this.transactionDataService.getUserTransactions(this.userId);

    this.userTransactions$.subscribe(transactions => {
      this.dataSource = new MatTableDataSource(transactions);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  async openEditAddressDialog() {
    const user = await firstValueFrom(this.user$);
    const dialog = this.dialog.open(DialogEditAddressComponent);
    dialog.componentInstance.user = new User(user);
    dialog.componentInstance.userId = this.userId;
  }

  async openEditHeaderDialog() {
    const user = await firstValueFrom(this.user$);
    const dialog = this.dialog.open(DialogEditUserComponent);
    dialog.componentInstance.user = new User(user);
    dialog.componentInstance.userId = this.userId;
  }

  async openAddTransactionDialog() {
    const user = await firstValueFrom(this.user$);
    const dialog = this.dialog.open(DialogAddTransactionComponent);
    dialog.componentInstance.transaction = new Transaction(this.transaction);
    dialog.componentInstance.transactionId = this.transactionId;
    dialog.componentInstance.user = new User(user);
    dialog.componentInstance.userId = this.userId;
  }

  formatDate(timestamp: number): string {
    const date = new Date(timestamp);
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dataSource.paginator?.firstPage();
  }

}
