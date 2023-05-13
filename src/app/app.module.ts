import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { BodyComponent } from './body/body.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from 'src/environments/environment';
import { ClassScheduleComponent } from './class-schedule/class-schedule.component';
import { StuffComponent } from './stuff/stuff.component';
import { StuffService } from './services/stuff.service';
import { A11yModule } from '@angular/cdk/a11y';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { CdkTableModule } from '@angular/cdk/table';
import { CdkTreeModule } from '@angular/cdk/tree';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { StuffDialogComponent } from './dialogs/stuff-dialog/stuff-dialog.component';
import { MembersComponent } from './members/members.component';
import { MembersDialogComponent } from './dialogs/members-dialog/members-dialog.component';
import { MembersService } from './services/members.service';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MembershipComponent } from './membership/membership.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MembershipService } from './services/membership.service';
import { MembershipDialogComponent } from './dialogs/membership-dialog/membership-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSortModule } from '@angular/material/sort';
import { HttpClientModule } from '@angular/common/http';
import { NgxImageCompressService } from 'ngx-image-compress';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ConfirmDeleteComponent } from './dialogs/confirm-delete/confirm-delete.component';
import { ClassScheduleService} from './services/class-schedule.service';
import { ClassScheduleDialogComponent } from './dialogs/class-schedule-dialog/class-schedule-dialog.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { SettingsComponent } from './settings/settings.component';
import { SettingsService } from './services/settings.service';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthService } from  './services/auth.service';
import { GuardService } from './services/guard.service'


@NgModule({
  declarations: [
    AppComponent,
    MembershipComponent,
    MembershipDialogComponent,
    SidenavComponent,
    BodyComponent,
    ClassScheduleComponent,
    StuffComponent,
    StuffDialogComponent,
    MembersComponent,
    MembersDialogComponent,
    DashboardComponent,
    ConfirmDeleteComponent,
    ClassScheduleDialogComponent,
    FooterComponent,
    HeaderComponent,
    SettingsComponent,
    LoginComponent,
    SignupComponent
  ],
  entryComponents: [MembershipDialogComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatSnackBarModule,
    MatSelectModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatNativeDateModule,
    A11yModule,
    CdkAccordionModule,
    CdkStepperModule,
    CdkTableModule,
    CdkTreeModule,
    MatTreeModule,
    MatIconModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRippleModule
  ],
  providers: [MembershipService, NgxImageCompressService, StuffService, MembersService, SettingsService, ClassScheduleService, AuthService, GuardService], 
  bootstrap: [AppComponent]
})
export class AppModule { }
