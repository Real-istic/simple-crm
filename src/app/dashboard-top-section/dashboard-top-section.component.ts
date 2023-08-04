import { Component, OnInit } from '@angular/core';
import { UserDataService } from '../user-data-service.service';

@Component({
  selector: 'app-dashboard-top-section',
  templateUrl: './dashboard-top-section.component.html',
  styleUrls: ['./dashboard-top-section.component.scss']
})
export class DashboardTopSectionComponent implements OnInit {

  userCount!: number[];
  allRevenue!: number;
  allTransactions!: number;

  constructor(private userDataService: UserDataService) {}

  async ngOnInit() {
    await this.userDataService.initialize();
    this.userCount = this.userDataService.allUsers.length;
    this.allRevenue = this.userDataService.getAllRevenue();
    this.allTransactions = this.userDataService.allTransactions;
  }
}
