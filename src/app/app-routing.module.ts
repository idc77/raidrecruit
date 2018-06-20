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

const routes: Routes = [
  {path: '', redirectTo: 'raids', pathMatch: 'full'},
  {path: 'about', component: AboutComponent},
  {path: 'raiders', component: WhoamiComponent, canActivate: [AuthGuard]},
  {path: 'raiders/add', component: AddraiderComponent, canActivate: [AuthGuard]},
  {path: 'raids', component: RaidlistComponent},
  {path: 'raids/:id', component: RaiddetailComponent},
  {path: 'raids/:id/edit', component: RaideditComponent},
  {path: 'new', component: NewraidComponent, canActivate: [AuthGuard]},
  {path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
