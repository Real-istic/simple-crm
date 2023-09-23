import { Component, inject } from '@angular/core';
import { UserDataService } from './user-data.service';
import { TransactionDataService } from './transaction-data.service';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { FirebaseAuthModule } from './firebase-auth/firebase-auth.module';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  userDataService: UserDataService = inject(UserDataService);
  transactionDataService: TransactionDataService = inject(TransactionDataService);
  auth: Auth = inject(Auth);
  router: Router = inject(Router);
  firebaseAuthModule: FirebaseAuthModule = inject(FirebaseAuthModule);
  mobileQuery: MediaQueryList;

  constructor() {
    this.mobileQuery = matchMedia('(max-width: 950px)');
  }


  async ngOnInit() {
    await this.userDataService.initialize();
    await this.transactionDataService.initialize();
    this.auth.onAuthStateChanged(async (user) => {
      if (user) {
        this.firebaseAuthModule.isLoggedIn = true;
      } else {
        this.firebaseAuthModule.isLoggedIn = false;
      }
    });
  }

  logout() {
    this.auth.signOut();
    this.router.navigate(['/login']);
    console.log('LOGGED OUT', this.auth.currentUser)
  }

  isUserDataActive() {
    return this.router.url.includes('/user-data') || this.router.url.includes('/user');
  }

  isDrawerOpened(): boolean {
    return !this.mobileQuery.matches;
  }
}


