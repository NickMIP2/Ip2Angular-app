import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {AppRoutingModule} from './/app-routing.module';
import {ThemesComponent} from './components/themes/themes.component';
import {NewThemeComponent} from './components/new-theme/new-theme.component';
import {ThemedetailComponent} from './components/themedetail/themedetail.component';
import {FormsModule} from '@angular/forms';
import {AlertModule} from 'ngx-bootstrap';
import {ThemedetailOverviewComponent} from './components/themedetail/components/themedetail-overview/themedetail-overview.component';
import {ThemedetailCardsComponent} from './components/themedetail/components/themedetail-cards/themedetail-cards.component';
import {ThemedetailOrganiserComponent} from './components/themedetail/components/themedetail-organiser/themedetail-organiser.component';
import {ThemedetailCategoriesComponent} from './components/themedetail/components/themedetail-categories/themedetail-categories.component';
import {ThemedetailNavbarComponent} from './components/themedetail/components/themedetail-navbar/themedetail-navbar.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    DashboardComponent,
    ThemesComponent,
    NewThemeComponent,
    ThemedetailComponent,
    ThemedetailNavbarComponent,
    ThemedetailOverviewComponent,
    ThemedetailCardsComponent,
    ThemedetailOrganiserComponent,
    ThemedetailCategoriesComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AlertModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
