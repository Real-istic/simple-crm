import { Injectable, inject } from '@angular/core';
import { Firestore, onSnapshot, collection } from '@angular/fire/firestore';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Transaction } from 'src/models/transaction.class';

@Injectable({
  providedIn: 'root'
})
export class TransactionDataService {
  private firestore: Firestore = inject(Firestore);
  allTransactions: Transaction[] = [];
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
          const data = doc.data();
          if (this.isValidTransaction(data)) this.allTransactions.push(doc.data() as Transaction);
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

  /**
   * Validates the Object regarding Transaction
   *
   * @param obj the given Object
   * @returns true if the Object is a valid Transaction
   */
  private isValidTransaction(obj: any): obj is Transaction {
    return obj &&
      typeof obj.userId === 'string' &&
      typeof obj.id === 'string' &&
      typeof obj.description === 'string' &&
      typeof obj.price === 'number' &&
      typeof obj.date === 'number';
  }
}

