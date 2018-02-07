import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {NavbarComponent} from './navbar/navbar.component';
import {ThemeComponent} from './theme/theme.component';
import {NewThemeComponent} from './new-theme/new-theme.component';
import {ThemedetailComponent} from './themedetail/themedetail.component';

const routes: Routes = [
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'thema', component: ThemeComponent},
  {path: 'thema-toevoegen', component: NewThemeComponent},
  {path: 'thema-detail', component: ThemedetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
