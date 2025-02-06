import { AfterViewInit, Component, HostListener, inject, OnInit } from '@angular/core';
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
export class AppComponent implements OnInit, AfterViewInit{
  private userDataService: UserDataService = inject(UserDataService);
  private transactionDataService: TransactionDataService = inject(TransactionDataService);
  private auth: Auth = inject(Auth);
  private router: Router = inject(Router);
  protected firebaseAuthModule: FirebaseAuthModule = inject(FirebaseAuthModule);
  @ViewChild(MatDrawer) drawer?: MatDrawer;


  async ngOnInit(): Promise<void> {
    this.checkAuthentication();
    await this.initializeData();
  }

  /**
   * checks the user authentication
   */
  private checkAuthentication(): void {
    this.auth.onAuthStateChanged((user) => {
      this.firebaseAuthModule.isLoggedIn = !!user;
    });
  }

  /**
   * initializes the data services
   */
  private async initializeData(): Promise<void> {
    await this.userDataService.initialize();
    await this.transactionDataService.initialize();
  }

  /**
   * logs the user out
   */
  protected logout(): void {
    void this.auth.signOut();
    void this.router.navigate(['/login']);
  }

  /**
   * checks the auth protected routes
   *
   * @returns true or false
   */
  protected isUserDataActive(): boolean {
    return this.router.url.includes('/user-data') || this.router.url.includes('/user');
  }

  /**
   * opens or closes the drawer depending on the screen size to make the app more mobile friendly
   */
  @HostListener('window:resize')
  protected onResize(): void {
    if (window.innerWidth < 950) {
      this.drawer?.close();
    } else {
      this.drawer?.open();
    }
  }

  /**
   * closes the drawer at a small screen size when navigating
   */
  protected closeDrawerIfMobile(): void {
    if (this.drawer && window.innerWidth < 950) {
      void this.drawer.close();
    }
  }

  ngAfterViewInit(): void {
    this.closeDrawerIfMobile();
  }
}


