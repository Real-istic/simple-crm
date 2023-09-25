import { Injectable } from '@angular/core';
import { FirebaseAuthModule } from '../firebase-auth/firebase-auth.module';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {

  constructor(private firebaseAuthModule: FirebaseAuthModule) {}

  canActivate(): boolean {
    if (this.firebaseAuthModule.isLoggedIn) {
      return true;
    } else {
      alert('You must be logged in to access this page');
      return false;
    }
  }
}
