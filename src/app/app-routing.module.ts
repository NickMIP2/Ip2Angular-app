import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './components/kandoe/dashboard/dashboard.component';
import {ThemesComponent} from './components/kandoe/themes/themes.component';
import {NewThemeComponent} from './components/kandoe/new-theme/new-theme.component';
import {ThemedetailCardsComponent} from './components/kandoe/themedetail/components/themedetail-cards/themedetail-cards.component';
import {CardEditComponent} from './components/kandoe/themedetail/components/themedetail-cards/card-edit/card-edit.component';
import {ThemedetailOrganiserComponent} from './components/kandoe/themedetail/components/themedetail-organiser/themedetail-organiser.component';
import {ThemedetailCategoriesComponent} from './components/kandoe/themedetail/components/themedetail-categories/themedetail-categories.component';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {ThemedetailOverviewComponent} from './components/kandoe/themedetail/components/themedetail-overview/themedetail-overview.component';
import {ThemedetailComponent} from './components/kandoe/themedetail/themedetail.component';

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'themes', component: ThemesComponent},
  {path: 'thema-toevoegen', component: NewThemeComponent},
  {
    path: 'themes/:themeId', component: ThemedetailComponent,
    children: [
      {path: '', redirectTo: 'overview', pathMatch: 'full'},
      {path: 'overview', component: ThemedetailOverviewComponent},
      {path: 'cards', component: ThemedetailCardsComponent},
      {path: 'cards/:cardId', component: CardEditComponent}

      ,
      {path: 'organisers', component: ThemedetailOrganiserComponent},
      {path: 'categories', component: ThemedetailCategoriesComponent}
    ]
  },
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
