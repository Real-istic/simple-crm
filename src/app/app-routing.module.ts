import { NgModule, inject } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { DataTableComponent } from './data-table/data-table.component';
import { LoginComponent } from './login/login.component';
import { Router } from '@angular/router';
import { FirebaseAuthModule } from './firebase-auth/firebase-auth.module';
import { AuthGuard } from './auth-guard/auth.guard';


const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'user/:id', component: UserDetailComponent, canActivate: [AuthGuard] },
  { path: 'user-data', component: DataTableComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
  router = inject(Router);
  firebaseAuthModule: FirebaseAuthModule = inject(FirebaseAuthModule);
  authGuard: AuthGuard = inject(AuthGuard);

  ngOnInit() {
    // this.router.events.subscribe((event: any) => {
    //   if ((event.url === '/user/:id' || event.url === '/user-data') && !this.firebaseAuthModule.isLoggedIn) {
    //     this.router.navigate(['login']);
    //     alert('You must be logged in to view this page');
    //   }
    // });
  }
}
