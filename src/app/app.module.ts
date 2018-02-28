import {BrowserModule} from '@angular/platform-browser';
import {NgModule, LOCALE_ID} from '@angular/core';
import {AuthConfig, AuthHttp} from 'angular2-jwt';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {AppRoutingModule} from './app-routing.module';
import {HttpClientInMemoryWebApiModule} from 'angular-in-memory-web-api';
import {AppComponent} from './app.component';
import {DashboardComponent} from './components/kandoe/dashboard/dashboard.component';
import {ThemesComponent} from './components/kandoe/themes/themes.component';
import {NewThemeComponent} from './components/kandoe/new-theme/new-theme.component';
import {AlertModule} from 'ngx-bootstrap';
import {ThemedetailOverviewComponent} from './components/kandoe/themedetail/themedetail-overview/themedetail-overview.component';
import {ThemedetailCardsComponent} from './components/kandoe/themedetail/themedetail-cards/themedetail-cards.component';
import {ThemedetailOrganiserComponent} from './components/kandoe/themedetail/themedetail-organiser/themedetail-organiser.component';
import {ThemedetailCategoriesComponent} from './components/kandoe/themedetail/themedetail-categories/themedetail-categories.component';
import {ThemedetailNavbarComponent} from './components/kandoe/themedetail/themedetail-navbar/themedetail-navbar.component';
import {HomeComponent} from './components/kandoe/home/home.component';
import {NavbarComponent} from './components/kandoe/navbar/navbar.component';
import {LoginComponent} from './components/login/login.component';
import {AuthenticationService} from './services/authentication.service';
import {KandoeComponent} from './components/kandoe/kandoe.component';
import {RegisterComponent} from './components/register/register.component';
import {InMemoryDataService} from './services/in-memory-data.service';
import {ThemeService} from './services/theme.service';
import {RouterLinkDirectiveStub} from './testing/router-link-directive-stub';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    DashboardComponent,
    ThemesComponent,
    NewThemeComponent,
    ThemedetailNavbarComponent,
    ThemedetailOverviewComponent,
    ThemedetailCardsComponent,
    ThemedetailOrganiserComponent,
    ThemedetailCategoriesComponent,
    LoginComponent,
    KandoeComponent,
    RegisterComponent,
    RouterLinkDirectiveStub
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AlertModule.forRoot(),
    HttpClientModule
  ],

  bootstrap: [AppComponent]
})
export class AppModule {
}
