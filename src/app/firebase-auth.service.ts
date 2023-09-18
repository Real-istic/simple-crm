import { Injectable, inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Firestore, onSnapshot, collection } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthService {
  // firebase = require('firebase');
  firebase: Firestore = inject(Firestore);
  firebaseui = require('firebaseui');
  ui: any = new this.firebaseui.auth.AuthUI(this.firebase.auth());

  constructor() {
    this.ui.start('#firebaseui-auth-container', {
      autoUpgradeAnonymousUsers: true,
      signInOptions: [
        this.firebase.auth.EmailAuthProvider.PROVIDER_ID,
        this.firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      ],
      // Other config options...
    });

   }


}
