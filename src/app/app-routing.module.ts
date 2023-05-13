import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MembersComponent } from './members/members.component';
import { MembershipComponent } from './membership/membership.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ClassScheduleComponent } from './class-schedule/class-schedule.component';
import { SettingsComponent } from './settings/settings.component';
import { StuffComponent } from './stuff/stuff.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent} from './auth/signup/signup.component';
import { GuardService} from './services/guard.service';

const routes: Routes = [

  {path: '', component: DashboardComponent},
  {path: 'membership', component: MembershipComponent},
  {path: 'class-schedule', component: ClassScheduleComponent},
  {path: 'settings', component: SettingsComponent, canActivate:[GuardService]},
  {path: 'members',  component: MembersComponent},
  {path: 'stuff', component: StuffComponent},
  {path: 'login', component: LoginComponent,canActivate:[GuardService]},
  {path: 'signup', component: SignupComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
