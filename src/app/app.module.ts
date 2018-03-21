import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AlertModule} from 'ngx-bootstrap';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {DashboardComponent} from './components/kandoe/dashboard/dashboard.component';
import {ThemesComponent} from './components/kandoe/themes/themes.component';
import {NewThemeComponent} from './components/kandoe/new-theme/new-theme.component';
import {ThemedetailOverviewComponent} from './components/kandoe/themedetail/components/themedetail-overview/themedetail-overview.component';
import {ThemedetailOrganiserComponent} from './components/kandoe/themedetail/components/themedetail-organiser/themedetail-organiser.component';
import {ThemedetailCategoriesComponent} from './components/kandoe/themedetail/components/themedetail-categories/themedetail-categories.component';
import {ThemedetailNavbarComponent} from './components/kandoe/themedetail/components/themedetail-navbar/themedetail-navbar.component';
import {HomeComponent} from './components/kandoe/home/home.component';
import {NavbarComponent} from './components/kandoe/navbar/navbar.component';
import {LoginComponent} from './components/authentication/login/login.component';
import {AuthenticationService} from './services/authentication.service';
import {KandoeComponent} from './components/kandoe/kandoe.component';
import {RegisterComponent} from './components/authentication/register/register.component';
import {ThemeService} from './services/theme.service';
import {NewSessionComponent} from './components/kandoe/session/new-session/new-session.component';
import {RouterLinkDirectiveStub} from './testing/router-link-directive-stub';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {Interceptor} from './interceptor';
import {TokenStorage} from './sessionStorage/token-storage';

import {CardEditComponent} from './components/kandoe/themedetail/components/cards/card-edit/card-edit.component';
import {CardService} from './services/card.service';
import {CategoryService} from './services/category.service';
import {ThemedetailComponent} from './components/kandoe/themedetail/themedetail.component';
import {UseridStorage} from './sessionStorage/userid-storage';
import {CardNewComponent} from './components/kandoe/themedetail/components/cards/card-new/card-new.component';
import {ChatComponent} from './components/kandoe/session/chat/chat.component';
import {FileUploadComponent} from './file-upload/file-upload.component';
import {MessageService} from './services/message.service';
import {CircleComponent} from './components/kandoe/session/circle/circle.component';
import {
  MatButtonModule, MatCardModule, MatCheckboxModule, MatInputModule, MatNativeDateModule, MatRadioModule, MatSelectModule, MatSliderModule,
  MatSnackBar,
  MatTabsModule
} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SessionService} from './services/session.service';
import {Phase1Component} from './components/kandoe/session/phase1/phase1.component';
import {Phase2Component} from './components/kandoe/session/phase2/phase2.component';
import {SessionOverviewComponent} from './components/kandoe/session/session-overview/session-overview.component';
import {CardOverviewComponent} from './components/kandoe/themedetail/components/cards/card-overview/card-overview.component';
import {MatFormFieldModule} from '@angular/material';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatSnackBarModule} from '@angular/material';
import { SnapshotsComponent } from './components/kandoe/session/snapshots/snapshots.component';
import { UsersComponent } from './components/kandoe/users/users.component';
import {UserService} from './services/user.service';
import { WinningCardComponent } from './components/kandoe/session/winning-card/winning-card.component';
import { PhaseReviewComponent } from './components/kandoe/session/phase-review/phase-review.component';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

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
    ThemedetailOrganiserComponent,
    ThemedetailCategoriesComponent,
    LoginComponent,
    KandoeComponent,
    RegisterComponent,
    NewSessionComponent,
    RouterLinkDirectiveStub,
    CardEditComponent,
    ThemedetailComponent,
    CardNewComponent,
    ChatComponent,
    FileUploadComponent,

    CircleComponent,
    Phase1Component,
    Phase2Component,
    SessionOverviewComponent,
    CardOverviewComponent,
    UsersComponent,
    WinningCardComponent,
    SnapshotsComponent,
    PhaseReviewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AlertModule.forRoot(),
    MatTabsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatSnackBarModule,
    MatNativeDateModule,
    MatCardModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatSliderModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    TokenStorage,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi: true
    },
    AuthenticationService,
    ThemeService,
    CardService,
    CategoryService,
    SessionService,
    Interceptor,
    UseridStorage,
    MessageService,
    UserService
  ],

  bootstrap: [AppComponent]
})
export class AppModule {
}
