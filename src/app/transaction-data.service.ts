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
  revenuePerMonth: number[] = [];
  monthsForChart: number[] = [4, 5, 6, 7, 8]; // 4 = May, 5 = June, 6 = July, 7 = August, 8 = September

  constructor() {
  }

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

  getAllRevenue() {
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

async getRevenuePerMonth() {
  this.revenuePerMonth = []; // Clear the array before populating

  for (let i = 0; i < this.monthsForChart.length; i++) {
    const targetMonth = this.monthsForChart[i];
    let sum = 0;

    for (let j = 0; j < this.allTransactions.length; j++) {
      const transaction = this.allTransactions[j];
      const value = transaction.price;
      const transactionDate = new Date(transaction.date);
      console.log('transaction date: ', transactionDate);

      // Extract year and month from the transaction date
      const transactionYear = transactionDate.getFullYear();
      console.log('transaction year: ', transactionYear);
      const transactionMonth = transactionDate.getMonth();
      console.log('transaction month: ', transactionMonth);

      if (transactionMonth === targetMonth && transactionYear === new Date().getFullYear()) {
        sum += value;
      }
    }

    this.revenuePerMonth.push(sum);
  }

  console.log('revenue per month: ', this.revenuePerMonth);
}


}


