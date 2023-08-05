import { Injectable, inject } from '@angular/core';
import { Firestore, onSnapshot } from '@angular/fire/firestore';
import { collection } from '@firebase/firestore';
import { User } from 'src/models/user.class';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  firestore: Firestore = inject(Firestore);
  userData: number[] = [25, 31, 24, 51, 45, 30, 44, 53];
  userRevenue: number[] = [25, 35, 20, 68, 40, 88, 120, 113];
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
    console.log('AllUsers SERVICE:', this.allUsers);
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
        sum += this.packageValue(value);
        transactions += 1;
      }
    }
    this.allRevenue = sum;
    this.allTransactions = transactions;
    return this.allRevenue;
  }

  packageValue(description: string) {
    const packagePrices: {[key: string]: number } = {
      'Bronze Package': 5,
      'Silver Package': 10,
      'Gold Package': 15,
      'Platinum Package': 30,
      'Diamond Package': 50
    }
    return packagePrices[description];
  };

  getUserTransactions() {
    let transactions = 0;
    for (let i = 0; i < this.allUsers.length; i++) {
      const user = this.allUsers[i];
      for (let j = 0; j < user.transactions.length; j++) {
        transactions += 1;
      }
    }
    this.allTransactions = transactions;
    return this.allTransactions;
  }

  getAllUsers(): any {
    return this.allUsers;
  }
}
