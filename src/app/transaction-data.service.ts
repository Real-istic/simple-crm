import { Injectable, inject } from '@angular/core';
import { Firestore, onSnapshot, collection } from '@angular/fire/firestore';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Transaction } from 'src/models/transaction.class';

@Injectable({
  providedIn: 'root'
})
export class TransactionDataService {
  private firestore: Firestore = inject(Firestore);
  allTransactions: any[] = [];
  private allTransactionsSubject = new BehaviorSubject<Transaction[]>([]);
  allTransactions$: Observable<Transaction[]> = this.allTransactionsSubject.asObservable();


  /**
   * initializes the transaction data from the firestore database and delivers it to the app
   */
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
  }

  /**
   * returns all transactions for the specific user
   * 
   * @returns the user transactions
   */
  getUserTransactions(userId: string): Observable<Transaction[]> {
    return this.allTransactions$.pipe(
      map(transactions => transactions.filter(transaction => transaction.userId === userId))
    );
  }
}