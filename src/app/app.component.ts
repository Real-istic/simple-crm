import { Component, HostListener, inject } from '@angular/core';
import { UserDataService } from './user-data.service';
import { TransactionDataService } from './transaction-data.service';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { FirebaseAuthModule } from './firebase-auth/firebase-auth.module';
import { MatDrawer } from '@angular/material/sidenav';
import { ViewChild } from '@angular/core';

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
  @ViewChild(MatDrawer) drawer: MatDrawer | undefined;

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

  @HostListener('window:resize')
  onResize() {
    if (this.mobileQuery.matches) {
      this.drawer?.close();
    } else {
      this.drawer?.open();
    }
  }

  closeDrawerIfMobile() {
    if (this.drawer && window.innerWidth < 950) {
      this.drawer.close();
    }
  }
}


