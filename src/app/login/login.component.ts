import { Router } from '@angular/router'
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FirebaseUISignInFailure } from 'firebaseui-angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})

export class LoginComponent implements OnInit {
  constructor(private afAuth: AngularFireAuth, private router: Router) { }

  ngOnInit(): void {}

  // redirect to home page after login
  successCallback() {
    this.router.navigate(['/']);
  }

  // error behavior if login fails
  errorCallback(data: FirebaseUISignInFailure) {
    console.warn('errorCallback', data);
  }
}
