import { Component, OnInit, inject } from '@angular/core';
import { UserDataService } from '../user-data.service';
import { TransactionDataService } from '../transaction-data.service';
import { Subscription, merge, Observable, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-dashboard-top-section',
  templateUrl: './dashboard-top-section.component.html',
  styleUrls: ['./dashboard-top-section.component.scss']
})
export class DashboardTopSectionComponent implements OnInit {
  userDataService: UserDataService = inject(UserDataService);
  transactionDataService: TransactionDataService = inject(TransactionDataService);
  userCount!: number[];
  transactionCount!: number;
  dataSubscription: Subscription | undefined;
  dataSubscription2: Subscription | undefined;
  allRevenueSubject = new BehaviorSubject<number>(0);
  allRevenue$: Observable<number> = this.allRevenueSubject.asObservable();


  constructor() {}

  // sets the allUser and allTransactions subscriptions and calls the getAllRevenue function if the data changes.
  async ngOnInit() {
    const allUsers$ = this.userDataService.allUsers$;
    const allTransactions$ = this.transactionDataService.allTransactions$;
    this.dataSubscription = merge(allUsers$, allTransactions$).subscribe(() => {
      this.getAllRevenue();
    });
  }

  // gets the revenue for all transactions and sets the allRevenueSubject.
  getAllRevenue() {
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

  // unsubscribes from the subscriptions when the component gets destroyed to avoid memory leaks.
  ngOnDestroy() {
    this.dataSubscription?.unsubscribe();
  }

}
