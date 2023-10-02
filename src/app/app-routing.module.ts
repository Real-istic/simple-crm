import { NgModule, inject } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { DataTableComponent } from './data-table/data-table.component';
import { LoginComponent } from './login/login.component';
import { LegalNoticeComponent } from './legal-notice/legal-notice.component';
import { AuthGuard } from './auth-guard/auth.guard';


const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'user/:id', component: UserDetailComponent, canActivate: [AuthGuard] }, // canActivate: [AuthGuard] is used to protect the route
  { path: 'user-data', component: DataTableComponent, canActivate: [AuthGuard] }, // canActivate: [AuthGuard] is used to protect the route
  { path: 'login', component: LoginComponent },
  { path: 'legal-notice', component: LegalNoticeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
  authGuard: AuthGuard = inject(AuthGuard);
}
