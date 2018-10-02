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
import {WhoamiComponent} from './components/whoami/whoami.component';
import {RaidlistComponent} from './components/raidlist/raidlist.component';
import {NewraidComponent} from './components/newraid/newraid.component';
import {FormsModule} from '@angular/forms';
import {RaiddetailComponent} from './components/raiddetail/raiddetail.component';
import {RaideditComponent} from './components/raidedit/raidedit.component';
import {AddraiderComponent} from './components/addraider/addraider.component';
import {PrivacypolicyComponent} from './components/privacypolicy/privacypolicy.component';
import {RaidnotesComponent} from './components/raidnotes/raidnotes.component';
import {RaidWorldFilterPipe} from './pipes/raid-world-filter.pipe';
import {FooterComponent} from './components/footer/footer.component';
import {TermsofserviceComponent} from './components/termsofservice/termsofservice.component';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';
import {Angulartics2Module} from 'angulartics2';
import {Angulartics2GoogleTagManager} from 'angulartics2/gtm';
import {AdsenseModule} from 'ng2-adsense';
import { NotFoundComponent } from './components/not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AboutComponent,
    HomeComponent,
    WhoamiComponent,
    RaidlistComponent,
    NewraidComponent,
    RaiddetailComponent,
    RaideditComponent,
    AddraiderComponent,
    PrivacypolicyComponent,
    RaidnotesComponent,
    RaidWorldFilterPipe,
    FooterComponent,
    TermsofserviceComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    OAuthModule.forRoot(),
    Angulartics2Module.forRoot([Angulartics2GoogleTagManager]),
    AdsenseModule.forRoot({
      adClient: 'ca-pub-2407608926817305',
      adFormat: 'auto',
      display: 'block',
    }),
    ServiceWorkerModule.register('/ngsw-worker.js', {enabled: environment.production}),
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
