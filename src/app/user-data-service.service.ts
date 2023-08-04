import { Injectable, inject } from '@angular/core';
import { Firestore, onSnapshot } from '@angular/fire/firestore';
import { collection } from '@firebase/firestore';
import { User } from 'src/models/user.class';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  firestore: Firestore = inject(Firestore);
  userData: number[] = [15, 21, 14, 51, 35, 20, 44, 53];
  userRevenue: number[] = [25, 55, 40, 98, 40, 120, 170, 153];
  allRevenue: number = 0;
  userTransactions: number[] = [13, 6, 8, 10, 22, 33, 26, 61];
  allTransactions: number = 0;
  allUsers = [] as any;
  user = new User();
  private initializePromise: Promise<void>;

  constructor() {
    this.initializePromise = this.initialize();
  }

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
    // console.log('AllUsers SERVICE:', this.allUsers);
  }

  getUserData(): number[] {
    return this.userData;
  }

  getAllRevenue() {
    let sum = 0;
    let transactions = 0;
    for (let i = 0; i < this.allUsers.length; i++) {
      const user = this.allUsers[i];
      for (let j = 0; j < user.transactions.length; j++) {
        const value = user.transactions[j].description;
        if (value === 'Bronze Package') {
          sum += 5;
        } else if (value === 'Silver Package') {
          sum += 10;
        } else if (value === 'Gold Package') {
          sum += 15;
        } else if (value === 'Platinum Package') {
          sum += 30;
        } else if (value === 'Diamond Package') {
          sum += 50;
        }
        transactions += 1;
      }
    }
    this.allRevenue = sum;
    this.allTransactions = transactions;
    return this.allRevenue;
  }

  getUserTransactions(): number[] {
    return this.userTransactions;
  }

  getAllUsers(): any {
    return this.allUsers;
  }
}
