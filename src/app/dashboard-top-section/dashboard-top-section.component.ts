import { Component, OnInit, inject } from '@angular/core';
import { UserDataService } from '../user-data.service';
import { TransactionDataService } from '../transaction-data.service';
import { Subscription, merge, Observable, BehaviorSubject } from 'rxjs';
import { User } from 'src/models/user.class';
import { Transaction } from 'src/models/transaction.class';

@Component({
  selector: 'app-dashboard-top-section',
  templateUrl: './dashboard-top-section.component.html',
  styleUrls: ['./dashboard-top-section.component.scss']
})
export class DashboardTopSectionComponent implements OnInit {
  private userDataService: UserDataService = inject(UserDataService);
  private transactionDataService: TransactionDataService = inject(TransactionDataService);
  private dataSubscription?: Subscription;
  private allRevenueSubject = new BehaviorSubject<number>(0);
  private allRevenue$: Observable<number> = this.allRevenueSubject.asObservable();

  ngOnInit(): void {
    this.setSubcription();
  }

  /**
   * 
   * @returns the actual user count
   */
  protected getUserCount(): Observable<User[]> {
    return this.userDataService.allUsers$;
  }

  /**
   * 
   * @returns the actual transaction count
   */
  protected getTransactionCount(): Observable<Transaction[]> {
    return this.transactionDataService.allTransactions$;
  }

  /**
   * 
   * @returns the actual revenue
   */
  protected getAllRevenue(): Observable<number> {
    return this.allRevenue$;
  }

  /**
   * sets the allUser and allTransactions subscriptions and calls the getAllRevenue function if the data changes.
   */
  private setSubcription(): void {
    const allUsers$ = this.userDataService.allUsers$;
    const allTransactions$ = this.transactionDataService.allTransactions$;
    this.dataSubscription = merge(allUsers$, allTransactions$).subscribe(() => {
      this.calculateAllRevenue();
    });
  }

  /**
   * gets the revenue for all transactions and sets the allRevenueSubject.
   */
  private calculateAllRevenue(): void {
    let sum = 0;
    let transactions = 0;
    for (let i = 0; i < this.transactionDataService.allTransactions.length; i++) {
      const transaction = this.transactionDataService.allTransactions[i];
      const value = transaction.price;
      sum += value;
      transactions += 1;
    }
    this.allRevenueSubject.next(sum);
  }

  ngOnDestroy(): void {
    this.dataSubscription?.unsubscribe();
  }
}
