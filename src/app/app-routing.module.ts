import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './components/kandoe/dashboard/dashboard.component';
import {ThemesComponent} from './components/kandoe/themes/themes.component';
import {NewThemeComponent} from './components/kandoe/new-theme/new-theme.component';
import {ThemedetailComponent} from './components/kandoe/themedetail/themedetail.component';
import {ThemedetailOverviewComponent} from './components/kandoe/themedetail/components/themedetail-overview/themedetail-overview.component';
import {ThemedetailCardsComponent} from './components/kandoe/themedetail/components/themedetail-cards/themedetail-cards.component';
import {ThemedetailOrganiserComponent} from './components/kandoe/themedetail/components/themedetail-organiser/themedetail-organiser.component';
import {ThemedetailCategoriesComponent} from './components/kandoe/themedetail/components/themedetail-categories/themedetail-categories.component';
import {LoginComponent} from './components/authentication/login/login.component';
import {UserComponent} from './components/authentication/user/user.component';
import {AdminComponent} from './components/authentication/admin/admin.component';
import {RegisterComponent} from './components/authentication/register/register.component';
import {AuthGuard} from './guards/auth-guard.service';
import {AdminAuthGuard} from './guards/admin-auth-guard.service';


const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'themas', component: ThemesComponent},
  {path: 'thema-toevoegen', component: NewThemeComponent},
  {path: 'thema-detail', component: ThemedetailComponent},
  {path: 'theme/:id', redirectTo: '/theme/:id/overview', pathMatch: 'full'},
  {path: 'theme/:id/overview', component: ThemedetailOverviewComponent},
  {path: 'theme/:id/cards', component: ThemedetailCardsComponent},
  {path: 'theme/:id/organisers', component: ThemedetailOrganiserComponent},
  {path: 'theme/:id/categories', component: ThemedetailCategoriesComponent},
  {path: 'themas:id', component: ThemedetailComponent},
  {path: 'login', component: LoginComponent},
  {path: 'admin', component: AdminComponent, canActivate: [AuthGuard, AdminAuthGuard]},
  {path: 'user', component: UserComponent, canActivate: [AuthGuard]},
  {path: 'register', component: RegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
