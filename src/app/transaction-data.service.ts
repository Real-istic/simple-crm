import { Injectable, inject } from '@angular/core';
import { Firestore, onSnapshot } from '@angular/fire/firestore';
import { collection } from '@firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class TransactionDataService {
  firestore: Firestore = inject(Firestore);
  allTransactions = [] as any;
  allRevenue: number = 0;
  transactionCount: number = 0;
  transactionCountPerMonth: number[] = [];
  revenuePerMonth: number[] = [];
  monthsForChart: number[] = [4, 5, 6, 7, 8]; // 4 = May, 5 = June, 6 = July, 7 = August, 8 = September (remember that January = 0, February = 1, etc.)

  constructor() { }

  async initialize() {
    const transactionCollection = collection(this.firestore, 'transactions');
    await new Promise<void>((resolve) => {
      onSnapshot(transactionCollection, (snapshot) => {
        this.allTransactions = [];
        snapshot.docs.forEach((doc) => {
          this.allTransactions.push(doc.data());
        });
        resolve();
      });
    });
    console.log('TRANSACTION DATA SERVICE:', this.allTransactions);
  }

  async getAllRevenue() {
    let sum = 0;
    let transactions = 0;
    for (let i = 0; i < this.allTransactions.length; i++) {
      const transaction = this.allTransactions[i];
      const value = transaction.price;
      sum += value;
      transactions += 1;
    }
    this.allRevenue = sum;
    return this.allRevenue;
  }

  getTransactionCount() {
    this.transactionCount = this.allTransactions.length;
    return this.transactionCount;
  }


  async getTransactionCountPerMonth() {
    this.transactionCountPerMonth = []; // Clear the array before populating
    for (let i = 0; i < this.monthsForChart.length; i++) {
      const targetMonth = this.monthsForChart[i];
      let sum = 0;
      for (let j = 0; j < this.allTransactions.length; j++) {
        const transaction = this.allTransactions[j];
        const transactionDate = new Date(transaction.date);
        const transactionYear = transactionDate.getFullYear();
        const transactionMonth = transactionDate.getMonth();
        if (transactionMonth === targetMonth && transactionYear === 2023) {
          sum += 1;
        }
      }
      this.transactionCountPerMonth.push(sum);
    }
    return this.transactionCountPerMonth;
  }

  async getRevenuePerMonth() {
    this.revenuePerMonth = [];
    for (let i = 0; i < this.monthsForChart.length; i++) {
      const targetMonth = this.monthsForChart[i];
      let sum = 0;
      for (let j = 0; j < this.allTransactions.length; j++) {
        const transaction = this.allTransactions[j];
        const value = transaction.price;
        const transactionDate = new Date(transaction.date);
        const transactionYear = transactionDate.getFullYear();
        const transactionMonth = transactionDate.getMonth();
        if (transactionMonth === targetMonth && transactionYear === new Date().getFullYear()) {
          sum += value;
        }
      }
      this.revenuePerMonth.push(sum);
    }
    return this.revenuePerMonth;
  }

}


