import { NgModule } from '@angular/core';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { firebase, firebaseui, FirebaseUIModule } from 'firebaseui-angular';
import { environment } from 'src/environments/environment';

const firebaseUiAuthConfig: firebaseui.auth.Config = {
  signInFlow: 'popup',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    {
      requireDisplayName: false,
      provider: firebase.auth.EmailAuthProvider.PROVIDER_ID
    },
    firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID
  ],
  tosUrl: '<your-tos-link>',
  privacyPolicyUrl: '<your-privacyPolicyUrl-link>',
  credentialHelper: firebaseui.auth.CredentialHelper.GOOGLE_YOLO
};

@NgModule({
  declarations: [],
  imports: [
    FirebaseUIModule.forRoot(firebaseUiAuthConfig),
  ],
  exports: [
    FirebaseUIModule,
  ],
  providers: [{ provide: FIREBASE_OPTIONS, useValue: environment.firebase }]
})
export class FirebaseAuthModule {
  isLoggedIn: boolean = false;
}
