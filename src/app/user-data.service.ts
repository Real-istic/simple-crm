import { Injectable, inject } from '@angular/core';
import { Firestore, onSnapshot } from '@angular/fire/firestore';
import { collection } from '@firebase/firestore';
import { User } from 'src/models/user.class';
import { TransactionDataService } from './transaction-data.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  firestore: Firestore = inject(Firestore);
  transactionDataService: TransactionDataService = inject(TransactionDataService);
  userCountPerMonth: number[] = [];
  allUsers: User[] = [];
  user = new User();

  allUsersSubject = new BehaviorSubject<User[]>([]);
  allUsers$: Observable<User[]> = this.allUsersSubject.asObservable();

  userCountPerMonthSubject = new BehaviorSubject<number[]>([]);
  userCountPerMonth$: Observable<number[]> = this.userCountPerMonthSubject.asObservable();


  constructor() { }

  async initialize() {
    const userCollection = collection(this.firestore, 'users');

    await new Promise<void>((resolve) => {
      onSnapshot(userCollection, (snapshot) => {
        this.allUsers = [];
        snapshot.docs.forEach((doc) => {
          this.allUsers.push(new User({ ...doc.data(), id: doc.id }));
        });
        this.getUserCountPerMonth();
        this.allUsersSubject.next(this.allUsers);
        this.userCountPerMonthSubject.next(this.userCountPerMonth);
        resolve();
      });
    });
    console.log('USER DATA SERVICE:', this.allUsers);
    console.log('USER DATA SERVICE ACTIVATED')
  }

  async getUserCountPerMonth() {
    this.userCountPerMonth = [];
    for (let i = 0; i < this.transactionDataService.monthsForChart.length; i++) {
      const targetMonth = this.transactionDataService.monthsForChart[i];
      let sum = 0;
      for (let j = 0; j < this.allUsers.length; j++) {
        const user = this.allUsers[j];
        const userRegistrationDate = new Date(user.registrationDate * 1000);
        const userRegistrationYear = userRegistrationDate.getFullYear();
        const userRegistrationMonth = userRegistrationDate.getMonth();

        if (userRegistrationMonth === targetMonth && userRegistrationYear === 2023) {
          sum += 1;
        }
      }
      this.userCountPerMonth.push(sum);
    }
    console.log('USER COUNT PER MONTH:', this.userCountPerMonth);
    return this.userCountPerMonth;
  }

}
