import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/models/user.class';
import { Transaction } from 'src/models/transaction.class';
import { DialogEditAddressComponent } from '../dialog-edit-address/dialog-edit-address.component';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';
import { DialogAddTransactionComponent } from '../dialog-add-transaction/dialog-add-transaction.component';
import { UserDataService } from '../user-data.service';
import { TransactionDataService } from '../transaction-data.service';
import { Observable, firstValueFrom } from 'rxjs';


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
  userId: string = '';
  transactionId: string = '';
  transaction: Transaction = new Transaction();

  user$!: Observable<User | undefined>;
  userTransactions$!: Observable<Transaction[]>;


  constructor() { }

  async ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.userId = params.get('id') || '';
      console.log('User-id: ', this.userId);
    });

    this.user$ = this.userDataService.getUser(this.userId);
    this.userTransactions$ = this.transactionDataService.getUserTransactions(this.userId);
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

}
