import { Injectable, inject } from '@angular/core';
import { Firestore, onSnapshot, collection } from '@angular/fire/firestore';
import { User } from 'src/models/user.class';
import { BehaviorSubject, Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  private firestore: Firestore = inject(Firestore);
  allUsers: User[] = [];
  private allUsersSubject = new BehaviorSubject<User[]>([]);
  allUsers$: Observable<User[]> = this.allUsersSubject.asObservable();


  /**
   * initializes the user data from the firestore database and delivers it to the app
   */
  async initialize(): Promise<void> {
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
  }

  /**
   * gets the specific user id
   * 
   * @returns returns the user id
   */
  getUser(id: string): Observable<User | undefined> {
    return this.allUsers$.pipe(
      map(users => users.find(user => user.id === id))
    );
  }
}
