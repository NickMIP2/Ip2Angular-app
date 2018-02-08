import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {ThemesComponent} from './components/themes/themes.component';
import {NewThemeComponent} from './components/new-theme/new-theme.component';
import {ThemedetailComponent} from './components/themedetail/themedetail.component';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';

const routes: Routes = [
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'themas', component: ThemesComponent},
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
