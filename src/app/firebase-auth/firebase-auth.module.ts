import { NgModule } from '@angular/core';
import { firebase, firebaseui, FirebaseUIModule } from 'firebaseui-angular';

const firebaseUiAuthConfig: firebaseui.auth.Config = {
  signInFlow: 'popup',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    {
      scopes: [
        'public_profile',
        'email',
        'user_likes',
        'user_friends'
      ],
      customParameters: {
        'auth_type': 'reauthenticate'
      },
      provider: firebase.auth.FacebookAuthProvider.PROVIDER_ID
    },
    {
      requireDisplayName: false,
      provider: firebase.auth.EmailAuthProvider.PROVIDER_ID
    },
    {
      provider: firebase.auth.GithubAuthProvider.PROVIDER_ID,
      clientId: 'd35c49791b812baef3bc'
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
  ]
})
export class FirebaseModule { }