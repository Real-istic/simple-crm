import { Injectable, inject } from '@angular/core';
import { Firestore, onSnapshot, collection } from '@angular/fire/firestore';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Transaction } from 'src/models/transaction.class';

@Injectable({
  providedIn: 'root'
})
export class TransactionDataService {
  firestore: Firestore = inject(Firestore);
  allTransactions: any[] = [];
  allTransactionsSubject = new BehaviorSubject<Transaction[]>([]);
  allTransactions$: Observable<Transaction[]> = this.allTransactionsSubject.asObservable();

  constructor() { }

  // initializes the transaction data from the firestore database and delivers it to the app
  async initialize() {
    const transactionCollection = collection(this.firestore, 'transactions');
    await new Promise<void>((resolve) => {
      onSnapshot(transactionCollection, (snapshot) => {
        this.allTransactions = [];
        snapshot.docs.forEach((doc) => {
          this.allTransactions.push(doc.data());
        });
        this.allTransactionsSubject.next(this.allTransactions);
        resolve();
      });
    });
    console.log('TRANSACTION DATA SERVICE:', this.allTransactions);
  }

  // returns all transactions for the specific user
  getUserTransactions(userId: string): Observable<Transaction[]> {
    return this.allTransactions$.pipe(
      map(transactions => transactions.filter(transaction => transaction.userId === userId))
    );
  }
}



