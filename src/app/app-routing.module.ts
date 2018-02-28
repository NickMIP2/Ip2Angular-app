import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './components/kandoe/dashboard/dashboard.component';
import {ThemesComponent} from './components/kandoe/themes/themes.component';
import {NewThemeComponent} from './components/kandoe/new-theme/new-theme.component';
import {RegisterComponent} from './components/register/register.component';
import {LoginComponent} from './components/login/login.component';
import {ThemedetailOverviewComponent} from './components/kandoe/themedetail/themedetail-overview/themedetail-overview.component';
import {ThemedetailCardsComponent} from './components/kandoe/themedetail/themedetail-cards/themedetail-cards.component';
import {ThemedetailOrganiserComponent} from './components/kandoe/themedetail/themedetail-organiser/themedetail-organiser.component';
import {ThemedetailCategoriesComponent} from './components/kandoe/themedetail/themedetail-categories/themedetail-categories.component';


const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'themas', component: ThemesComponent},
  {path: 'thema-toevoegen', component: NewThemeComponent},
  {path: 'theme/:id', redirectTo: '/theme/:id/overview', pathMatch: 'full'},
  {path: 'theme/:id/overview', component: ThemedetailOverviewComponent},
  {path: 'theme/:id/cards', component: ThemedetailCardsComponent},
  {path: 'theme/:id/organisers', component: ThemedetailOrganiserComponent},
  {path: 'theme/:id/categories', component: ThemedetailCategoriesComponent},
  {path: 'login', component: LoginComponent},
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
