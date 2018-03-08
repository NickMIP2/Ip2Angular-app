import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './components/kandoe/dashboard/dashboard.component';
import {ThemesComponent} from './components/kandoe/themes/themes.component';
import {NewThemeComponent} from './components/kandoe/new-theme/new-theme.component';
import {ThemedetailCardsComponent} from './components/kandoe/themedetail/components/themedetail-cards/themedetail-cards.component';
import {CardEditComponent} from './components/kandoe/themedetail/components/themedetail-cards/card-edit/card-edit.component';
import {ThemedetailOrganiserComponent} from './components/kandoe/themedetail/components/themedetail-organiser/themedetail-organiser.component';
import {ThemedetailCategoriesComponent} from './components/kandoe/themedetail/components/themedetail-categories/themedetail-categories.component';
import {ThemedetailOverviewComponent} from './components/kandoe/themedetail/components/themedetail-overview/themedetail-overview.component';
import {ThemedetailComponent} from './components/kandoe/themedetail/themedetail.component';
import {CardNewComponent} from './components/kandoe/themedetail/components/themedetail-cards/card-new/card-new.component';
import {LoginComponent} from './components/authentication/login/login.component';
import {NewSessionComponent} from './components/kandoe/session/new-session/new-session.component';
import {RegisterComponent} from './components/authentication/register/register.component';
import {KandoeComponent} from './components/kandoe/kandoe.component';
import {ChatComponent} from './components/kandoe/chat/chat.component';

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'chat', component: ChatComponent},
  {
    path: 'kandoe', component: KandoeComponent,
    children: [
      {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
      {path: 'dashboard', component: DashboardComponent},
      {path: 'themes', component: ThemesComponent},
      {path: 'themes/thema-toevoegen', component: NewThemeComponent},
      {path: 'new-session', component: NewSessionComponent},
      {
        path: 'themes/:themeId', component: ThemedetailComponent,
        children: [
          {path: '', redirectTo: 'overview', pathMatch: 'full'},
          {path: 'overview', component: ThemedetailOverviewComponent},
          {path: 'cards', component: ThemedetailCardsComponent},
          {path: 'cards/card-new', component: CardNewComponent},
          {path: 'cards/:cardId', component: CardEditComponent},
          {path: 'organisers', component: ThemedetailOrganiserComponent},
          {path: 'categories', component: ThemedetailCategoriesComponent}
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
