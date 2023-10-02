import { Injectable } from '@angular/core';
import { FirebaseAuthModule } from '../firebase-auth/firebase-auth.module';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {

  constructor(private firebaseAuthModule: FirebaseAuthModule) {}

  // canActivate() is called every time the user navigates to a different route. If the user is logged in, canActivate() returns true, otherwise it returns false.
  canActivate(): boolean {
    if (this.firebaseAuthModule.isLoggedIn) {
      return true;
    } else {
      alert('You must be logged in to access this page');
      return false;
    }
  }
}
