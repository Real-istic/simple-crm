import { Injectable, inject } from '@angular/core';
import { Firestore, onSnapshot, collection } from '@angular/fire/firestore';
import { User } from 'src/models/user.class';
import { TransactionDataService } from './transaction-data.service';
import { BehaviorSubject, Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  firestore: Firestore = inject(Firestore);
  transactionDataService: TransactionDataService = inject(TransactionDataService);

  allUsers: User[] = [];
  monthsForChart: number[] = [4, 5, 6, 7, 8]; // 4 = May, 5 = June, 6 = July, 7 = August, 8 = September (remember that January = 0, February = 1, etc.)

  allUsersSubject = new BehaviorSubject<User[]>([]);
  allUsers$: Observable<User[]> = this.allUsersSubject.asObservable();

  constructor() { }

  // initializes the user data from the firestore database and delivers it to the app
  async initialize() {
    const userCollection = collection(this.firestore, 'users');
    await new Promise<void>((resolve) => {
      onSnapshot(userCollection, (snapshot) => {
        this.allUsers = [];
        snapshot.docs.forEach((doc) => {
          this.allUsers.push(new User({ ...doc.data(), id: doc.id }));
        });
        this.allUsersSubject.next(this.allUsers);
        resolve();
      });
    });
    // console.log('Initialized user data', this.allUsers);
  }

  // returns the user with the specific id
  getUser(id: string): Observable<User | undefined> {
    return this.allUsers$.pipe(
      map(users => users.find(user => user.id === id))
    );
  }
}
