import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './components/kandoe/dashboard/dashboard.component';
import {ThemesComponent} from './components/kandoe/themes/themes.component';
import {NewThemeComponent} from './components/kandoe/new-theme/new-theme.component';
import {CardEditComponent} from './components/kandoe/themedetail/components/cards/card-edit/card-edit.component';
import {ThemedetailOrganiserComponent} from './components/kandoe/themedetail/components/themedetail-organiser/themedetail-organiser.component';
import {ThemedetailCategoriesComponent} from './components/kandoe/themedetail/components/themedetail-categories/themedetail-categories.component';
import {ThemedetailOverviewComponent} from './components/kandoe/themedetail/components/themedetail-overview/themedetail-overview.component';
import {ThemedetailComponent} from './components/kandoe/themedetail/themedetail.component';
import {CardNewComponent} from './components/kandoe/themedetail/components/cards/card-new/card-new.component';
import {LoginComponent} from './components/authentication/login/login.component';
import {NewSessionComponent} from './components/kandoe/session/new-session/new-session.component';
import {RegisterComponent} from './components/authentication/register/register.component';
import {KandoeComponent} from './components/kandoe/kandoe.component';
import {ChatComponent} from './components/kandoe/chat/chat.component';
import {SessionOverviewComponent} from './components/kandoe/session/session-overview/session-overview.component';
import {Phase1Component} from './components/kandoe/session/phase1/phase1.component';
import {Phase2Component} from './components/kandoe/session/phase2/phase2.component';
import {CardOverviewComponent} from './components/kandoe/themedetail/components/cards/card-overview/card-overview.component';
import {UsersComponent} from './components/kandoe/users/users.component';
import {WinningCardComponent} from './components/kandoe/winning-card/winning-card.component';

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'chat', component: ChatComponent},
  {path: 'viktory', component: WinningCardComponent},
  {
    path: 'kandoe', component: KandoeComponent,
    children: [
      {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
      {path: 'dashboard', component: DashboardComponent},
      {path: 'themes', component: ThemesComponent},
      {path: 'themes/thema-toevoegen', component: NewThemeComponent},
      {path: 'users/:userId', component: UsersComponent},
      {path: 'new-session', component: NewSessionComponent},
      {
        path: 'themes/:themeId', component: ThemedetailComponent,
        children: [
          {path: '', redirectTo: 'overview', pathMatch: 'full'},
          {path: 'overview', component: ThemedetailOverviewComponent},
          {path: 'categories/:categoryId/cards/new-card', component: CardNewComponent},
          {path: 'categories/:categoryId/cards/:cardId/edit-card', component: CardEditComponent},
          {path: 'organisers', component: ThemedetailOrganiserComponent},
          {path: 'categories', component: ThemedetailCategoriesComponent},
          {path: 'categories/:categoryId/overview', component: CardOverviewComponent}
        ]
      },
      {
        path: 'sessions/:sessionId', component: SessionOverviewComponent,
        children: [
          {path: 'phase1', component: Phase1Component},
          {path: 'phase2', component: Phase2Component}
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
