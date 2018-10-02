import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AboutComponent} from './components/about/about.component';
import {WhoamiComponent} from './components/whoami/whoami.component';
import {AuthGuard} from './guards/auth.guard';
import {NewraidComponent} from './components/newraid/newraid.component';
import {RaidlistComponent} from './components/raidlist/raidlist.component';
import {RaiddetailComponent} from './components/raiddetail/raiddetail.component';
import {RaideditComponent} from './components/raidedit/raidedit.component';
import {AddraiderComponent} from './components/addraider/addraider.component';
import {HomeComponent} from './components/home/home.component';
import {PrivacypolicyComponent} from './components/privacypolicy/privacypolicy.component';
import {TermsofserviceComponent} from './components/termsofservice/termsofservice.component';
import {NotFoundComponent} from './components/not-found/not-found.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'about', component: AboutComponent},
  {path: 'raiders', component: WhoamiComponent, canActivate: [AuthGuard]},
  {path: 'raiders/add', component: AddraiderComponent, canActivate: [AuthGuard]},
  {path: 'raids', component: RaidlistComponent},
  {path: 'raids/:id', component: RaiddetailComponent},
  {path: 'raids/:id/edit', component: RaideditComponent},
  {path: 'new', component: NewraidComponent, canActivate: [AuthGuard]},
  {path: 'privacy-policy', component: PrivacypolicyComponent},
  {path: 'terms-of-service', component: TermsofserviceComponent},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
