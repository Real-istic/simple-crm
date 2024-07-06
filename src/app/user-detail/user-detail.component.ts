import { AfterViewInit, Component, ViewChild, inject } from '@angular/core';
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

export class UserDetailComponent implements AfterViewInit{
  private route: ActivatedRoute = inject(ActivatedRoute);
  private dialog: MatDialog = inject(MatDialog);
  private userDataService: UserDataService = inject(UserDataService);
  private transactionDataService: TransactionDataService = inject(TransactionDataService);
  protected dataSource: MatTableDataSource<Transaction> = new MatTableDataSource<Transaction>();
  protected displayedColumns: string[] = ['description', 'price', 'date', 'id'];
  private userId: string = '';
  private transactionId: string = '';
  private transaction: Transaction = new Transaction();
  protected user$!: Observable<User | undefined>;
  private userTransactions$!: Observable<Transaction[]>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  ngOnInit(): void {
    this.subscribeToRoute();
    this.getUserData();
    this.subscribeToTransactions();
  }

  /**
   * subscribes to the activated route
   */
  private subscribeToRoute(): void {
    this.route.paramMap.subscribe(params => {
      this.userId = params.get('id') || '';
    });
  }

  /**
   * gets the user data
   */
  private getUserData(): void {
    this.user$ = this.userDataService.getUser(this.userId);
    this.userTransactions$ = this.transactionDataService.getUserTransactions(this.userId);
  }

  /**
   * subscribes to the user transactions
   */
  private subscribeToTransactions(): void {
    this.userTransactions$.subscribe(transactions => {
      this.dataSource = new MatTableDataSource(transactions);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  /**
   * opens the edit address dialog
   */
  protected async openEditAddressDialog(): Promise<void> {
    const user = await firstValueFrom(this.user$);
    const dialog = this.dialog.open(DialogEditAddressComponent);
    dialog.componentInstance.user = new User(user);
    dialog.componentInstance.userId = this.userId;
  }

  /**
   * opens the edit header dialog
   */
  protected async openEditHeaderDialog(): Promise<void> {
    const user = await firstValueFrom(this.user$);
    const dialog = this.dialog.open(DialogEditUserComponent);
    dialog.componentInstance.user = new User(user);
    dialog.componentInstance.userId = this.userId;
  }

  /**
   * opens the add transaction dialog
   */
  protected async openAddTransactionDialog(): Promise<void> {
    const user = await firstValueFrom(this.user$);
    const dialog = this.dialog.open(DialogAddTransactionComponent);
    dialog.componentInstance.transaction = new Transaction(this.transaction);
    dialog.componentInstance.transactionId = this.transactionId;
    dialog.componentInstance.user = new User(user);
    dialog.componentInstance.userId = this.userId;
  }

  /**
   * formats the date to a readable format
   * 
   * @returns the formatted date
   */
  protected formatDate(timestamp: number): string {
    const date = new Date(timestamp);
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  }

  /**
   * handles the filter for the transaction table
   * 
   */
  protected applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dataSource.paginator?.firstPage();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
