import { Component, OnInit, inject } from '@angular/core';
import { UserDataService } from '../user-data.service';
import { TransactionDataService } from '../transaction-data.service';

@Component({
  selector: 'app-dashboard-top-section',
  templateUrl: './dashboard-top-section.component.html',
  styleUrls: ['./dashboard-top-section.component.scss']
})
export class DashboardTopSectionComponent implements OnInit {

  userCount!: number[];
  allRevenue!: number;
  transactionCount!: number;
  userDataService: UserDataService = inject(UserDataService);
  transactionDataService: TransactionDataService = inject(TransactionDataService);


  constructor() {}

  async ngOnInit() {
    // await this.userDataService.initialize();
    // await this.transactionDataService.initialize();

    this.userDataService.initialized$.subscribe(async initialized => {
      if (initialized) {
        this.userCount = await this.userDataService.allUsers.length;
        this.allRevenue = await this.transactionDataService.getAllRevenue();
        this.transactionCount = await this.transactionDataService.getTransactionCount();
      }
    });

    // this.userCount = await this.userDataService.allUsers.length;
    // this.allRevenue = await this.transactionDataService.getAllRevenue();
    // this.transactionCount = await this.transactionDataService.getTransactionCount();
  }
}
