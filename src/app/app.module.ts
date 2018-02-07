import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {NavbarComponent} from './navbar/navbar.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {AppRoutingModule} from './/app-routing.module';
import {ThemeComponent} from './theme/theme.component';
import {NewThemeComponent} from './new-theme/new-theme.component';
import { ThemedetailComponent } from './themedetail/themedetail.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    DashboardComponent,
    ThemeComponent,
    NewThemeComponent,
    ThemedetailComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
