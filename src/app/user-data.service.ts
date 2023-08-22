import { Injectable, inject } from '@angular/core';
import { Firestore, onSnapshot } from '@angular/fire/firestore';
import { collection } from '@firebase/firestore';
import { User } from 'src/models/user.class';
import { TransactionDataService } from './transaction-data.service';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  firestore: Firestore = inject(Firestore);
  transactionDataService: TransactionDataService = inject(TransactionDataService);
  userCountPerMonth: number[] = [5, 10, 7, 8, 15];
  userRevenuePerMonth: number[] = [25, 35, 20, 68, 100];
  userTransactionsPerMonth: number[] = [4, 7, 2, 8, 10];
  allUsers = [] as any;
  allRevenue: number = 0;
  allTransactions: number = 0;
  user = new User();

  constructor() { }

  async initialize() {
    const userCollection = collection(this.firestore, 'users');

    await new Promise<void>((resolve) => {
      onSnapshot(userCollection, (snapshot) => {
        this.allUsers = [];
        snapshot.docs.forEach((doc) => {
          this.allUsers.push(new User({ ...doc.data(), id: doc.id }));
        });
        resolve();
      });
    });
    console.log('USER DATA SERVICE:', this.allUsers);
  }

  getUserData(): number[] {
    return this.userCountPerMonth;
  }

  // getAllRevenue() {
  //   let sum = 0;
  //   let transactions = 0;
  //   for (let i = 0; i < this.allUsers.length; i++) {
  //     const user = this.allUsers[i];
  //     for (let j = 0; j < user.transactions.length; j++) {
  //       const value = user.transactions[j].price;
  //       sum += value;
  //       transactions += 1;
  //     }
  //   }
  //   this.allRevenue = sum;
  //   return this.allRevenue;
  // }

  // getUserTransactions() {
  //   let transactions = 0;
  //   for (let i = 0; i < this.allUsers.length; i++) {
  //     const user = this.allUsers[i];
  //     for (let j = 0; j < user.transactions.length; j++) {
  //       transactions += 1;
  //     }
  //   }
  //   this.allTransactions = transactions;
  //   console.log('all transactions: ', this.allTransactions);
  //   return this.allTransactions;
  // }

}