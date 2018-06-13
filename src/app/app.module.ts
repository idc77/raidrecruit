import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {AboutComponent} from './components/about/about.component';
import {HomeComponent} from './components/home/home.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {OAuthModule} from 'angular-oauth2-oidc';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AuthInterceptor} from './auth.interceptor';
import {AuthGuard} from './guards/auth.guard';
import { WhoamiComponent } from './components/whoami/whoami.component';
import { RaidlistComponent } from './components/raidlist/raidlist.component';
import { NewraidComponent } from './components/newraid/newraid.component';
import {FormsModule} from '@angular/forms';
import { RaiddetailComponent } from './components/raiddetail/raiddetail.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AboutComponent,
    HomeComponent,
    WhoamiComponent,
    RaidlistComponent,
    NewraidComponent,
    RaiddetailComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    OAuthModule.forRoot(),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
