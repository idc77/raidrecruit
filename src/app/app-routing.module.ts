import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {AboutComponent} from './components/about/about.component';
import {WhoamiComponent} from './components/whoami/whoami.component';
import {AuthGuard} from './guards/auth.guard';
import {NewraidComponent} from './components/newraid/newraid.component';
import {RaidlistComponent} from './components/raidlist/raidlist.component';
import {RaiddetailComponent} from './components/raiddetail/raiddetail.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'about', component: AboutComponent},
  {path: 'whoami', component: WhoamiComponent, canActivate: [AuthGuard]},
  {path: 'raids', component: RaidlistComponent},
  {path: 'raids/new', component: NewraidComponent, canActivate: [AuthGuard]},
  {path: 'raid/:id', component: RaiddetailComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
