import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {NavbarComponent} from './navbar/navbar.component';
import {ThemeComponent} from './theme/theme.component';
import {NewThemeComponent} from './new-theme/new-theme.component';
import {ThemedetailComponent} from './themedetail/themedetail.component';

import {LoginComponent} from './login/login.component';
import {UserComponent} from './user/user.component';
import {AdminComponent} from './admin/admin.component';
import {AuthGuard} from './guards/auth-guard.service';
import {AdminAuthGuard} from './guards/admin-auth-guard.service';


const routes: Routes = [
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'thema', component: ThemeComponent},
  {path: 'thema-toevoegen', component: NewThemeComponent},
  {path: 'thema-detail', component: ThemedetailComponent},
  {path: 'login', component: LoginComponent},
  {path: 'admin', component: AdminComponent, canActivate: [AuthGuard, AdminAuthGuard]},
  {path: 'user', component: UserComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
