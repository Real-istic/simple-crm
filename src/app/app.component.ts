import { Component, inject, OnInit } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { UserDataService } from './user-data.service';
import { TransactionDataService } from './transaction-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  firestore: Firestore = inject(Firestore);
  userDataService: UserDataService = inject(UserDataService);
  transactionDataService: TransactionDataService = inject(TransactionDataService);
  title = 'simple-crm';
  isLoggedIn: boolean = false;


  async ngOnInit() {
    await this.userDataService.initialize();
    await this.transactionDataService.initialize();
    console.log('APP COMPONENTS ACTIVATED')
  }
}


