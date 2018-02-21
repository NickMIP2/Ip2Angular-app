import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AuthConfig, AuthHttp} from 'angular2-jwt';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';

import {AppRoutingModule} from './app-routing.module';

import {AppComponent} from './app.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {ThemesComponent} from './components/themes/themes.component';
import {NewThemeComponent} from './components/new-theme/new-theme.component';
import {ThemedetailComponent} from './components/themedetail/themedetail.component';
import {AlertModule} from 'ngx-bootstrap';
import {ThemedetailOverviewComponent} from './components/themedetail/components/themedetail-overview/themedetail-overview.component';
import {ThemedetailCardsComponent} from './components/themedetail/components/themedetail-cards/themedetail-cards.component';
import {ThemedetailOrganiserComponent} from './components/themedetail/components/themedetail-organiser/themedetail-organiser.component';
import {ThemedetailCategoriesComponent} from './components/themedetail/components/themedetail-categories/themedetail-categories.component';
import {ThemedetailNavbarComponent} from './components/themedetail/components/themedetail-navbar/themedetail-navbar.component';
import {HomeComponent} from './home/home.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {UserComponent} from './user/user.component';
import {AdminComponent} from './admin/admin.component';
import {LoginComponent} from './login/login.component';
import {TOKEN_NAME} from './services/auth.constant';
import {AuthenticationService} from './services/authentication.service';
import {UserService} from './services/user.service';
import {AuthGuard} from './guards/auth-guard.service';
import {AdminAuthGuard} from './guards/admin-auth-guard.service';
import {AppDataService} from './services/app-data.service';

export function authHttpServiceFactory(http) {
  return new AuthHttp(new AuthConfig({
    headerPrefix: 'Bearer',
    tokenName: TOKEN_NAME,
    globalHeaders: [{'Content-Type': 'application/json'}],
    noJwtError: false,
    noTokenScheme: true,
    tokenGetter: (() => localStorage.getItem(TOKEN_NAME))
  }), http);
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    DashboardComponent,
    ThemesComponent,
    NewThemeComponent,
    ThemedetailComponent,
    ThemedetailNavbarComponent,
    ThemedetailOverviewComponent,
    ThemedetailCardsComponent,
    ThemedetailOrganiserComponent,
    ThemedetailCategoriesComponent,
    UserComponent,
    AdminComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AlertModule.forRoot(),
    HttpClientModule
  ],
  providers: [
    {provide: AuthHttp, useFactory: authHttpServiceFactory, deps: [HttpClient]},
    AuthenticationService,
    UserService,
    AuthGuard,
    AdminAuthGuard,
    AppDataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
