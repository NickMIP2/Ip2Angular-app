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
import {ThemedetailComponent} from './components/kandoe/themedetail/themedetail.component';
import {AlertModule} from 'ngx-bootstrap';
import {ThemedetailOverviewComponent} from './components/kandoe/themedetail/components/themedetail-overview/themedetail-overview.component';
import {ThemedetailCardsComponent} from './components/kandoe/themedetail/components/themedetail-cards/themedetail-cards.component';
import {ThemedetailOrganiserComponent} from './components/kandoe/themedetail/components/themedetail-organiser/themedetail-organiser.component';
import {ThemedetailCategoriesComponent} from './components/kandoe/themedetail/components/themedetail-categories/themedetail-categories.component';
import {ThemedetailNavbarComponent} from './components/kandoe/themedetail/components/themedetail-navbar/themedetail-navbar.component';
import {HomeComponent} from './components/kandoe/home/home.component';
import {NavbarComponent} from './components/kandoe/navbar/navbar.component';
import {UserComponent} from './components/authentication/user/user.component';
import {AdminComponent} from './components/authentication/admin/admin.component';
import {LoginComponent} from './components/authentication/login/login.component';
import {TOKEN_NAME} from './services/auth.constant';
import {AuthenticationService} from './services/authentication.service';
import {UserService} from './services/user.service';
import {AuthGuard} from './guards/auth-guard.service';
import {AdminAuthGuard} from './guards/admin-auth-guard.service';
import {AppDataService} from './services/app-data.service';
import { KandoeComponent } from './components/kandoe/kandoe.component';
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { RegisterComponent } from './components/authentication/register/register.component';
import {InMemoryDataService} from './services/in-memory-data.service';
import {ThemeService} from './services/theme.service';

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
    LoginComponent,
    KandoeComponent,
    AuthenticationComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AlertModule.forRoot(),
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, {dataEncapsulation: false}
    )
  ],
  providers: [
    {provide: AuthHttp, useFactory: authHttpServiceFactory, deps: [HttpClient]},
    AuthenticationService,
    UserService,
    AuthGuard,
    AdminAuthGuard,
    AppDataService,
    ThemeService
  ],

  bootstrap: [AppComponent]
})
export class AppModule {
}
