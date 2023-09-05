import { Component, inject } from '@angular/core';
import { Firestore, collection, onSnapshot } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/models/user.class';
import { Transaction } from 'src/models/transaction.class';
import { DialogEditAddressComponent } from '../dialog-edit-address/dialog-edit-address.component';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';
import { DialogAddTransactionComponent } from '../dialog-add-transaction/dialog-add-transaction.component';
import { UserDataService } from '../user-data.service';
import { TransactionDataService } from '../transaction-data.service';
import { BehaviorSubject } from 'rxjs';


@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})



export class UserDetailComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  firestore: Firestore = inject(Firestore);
  dialog: MatDialog = inject(MatDialog);
  userDataService: UserDataService = inject(UserDataService);
  transactionDataService: TransactionDataService = inject(TransactionDataService);
  userId: string = '';
  user: User = new User();
  transactionId: string = '';
  transaction: Transaction = new Transaction();

  userTransactionsSubject = new BehaviorSubject<Transaction[]>([]);
  userTransactions$ = this.userTransactionsSubject.asObservable();

  userSubject = new BehaviorSubject<User>(new User());
  user$ = this.userSubject.asObservable();

  constructor() { }

  async ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.userId = params.get('id') || '';
      console.log('User-id: ', this.userId);
      this.getUser();
    });
    this.transactionDataService.allTransactions$.subscribe(() => {
      this.getUserTransactions();
    });
    this.userDataService.allUsers$.subscribe(() => {
      this.getUser();
    });
  }

  // async getUser() {
  //   const userCollection = collection(this.firestore, 'users');

  //   onSnapshot(userCollection, (snapshot) => {
  //     const userDoc = snapshot.docs.find((doc) => doc.id === this.userId);
  //     if (userDoc) {
  //       this.user = new User(null);
  //       this.user = new User({ ...userDoc.data(), id: userDoc.id });
  //       console.log('this user: ', this.user);
  //     } else {
  //       console.log('User not found');
  //     }
  //   });
  // }

  async getUser() {
    const userDoc = this.userDataService.allUsers.find((doc) => doc.id === this.userId);
    if (userDoc) {
      this.user = new User(null);
      this.user = new User({ ...userDoc, id: userDoc.id });
      this.userSubject.next(this.user);
      console.log('this user: ', this.user);
    } else {
      console.log('User not found');
    }
  }

  async getUserTransactions() {
    const userTransactions = this.transactionDataService.allTransactions.filter((transaction: Transaction) => transaction.userId === this.userId);
    console.log('User transactions: ', userTransactions);
    this.userTransactionsSubject.next(userTransactions);
  }

  openEditAddressDialog() {
    const dialog = this.dialog.open(DialogEditAddressComponent);
    dialog.componentInstance.user = new User(this.user);
    dialog.componentInstance.userId = this.userId;
  }

  openEditHeaderDialog() {
    const dialog = this.dialog.open(DialogEditUserComponent);
    dialog.componentInstance.user = new User(this.user);
    dialog.componentInstance.userId = this.userId;
  }

  openAddTransactionDialog() {
    const dialog = this.dialog.open(DialogAddTransactionComponent);
    dialog.componentInstance.transaction = new Transaction(this.transaction);
    dialog.componentInstance.transactionId = this.transactionId;
    dialog.componentInstance.user = new User(this.user);
    dialog.componentInstance.userId = this.userId;
  }

  formatDate(timestamp: number): string {
    const date = new Date(timestamp);
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  }

}
