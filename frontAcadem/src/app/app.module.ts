import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from "./material-module";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {authInterceptorProviders} from "./helper/auth-interceptor.service";
import {authErrorInterceptorProvider} from "./helper/error-interceptor.service";
import {LoginComponent} from './auth/login/login.component';
import {RegisterComponent} from './auth/register/register.component';
import {MainAdminComponent} from './views/admin/main-admin/main-admin.component';
import {MainTeacherComponent} from './views/teachers/main-teacher/main-teacher.component';
import {MainPupilComponent} from './views/pupils/main-pupil/main-pupil.component';
import {MainComponent} from './views/main/main.component';
import {GroupsViewerComponent} from './views/common/groups-viewer/groups-viewer.component';
import {GroupDetailsComponent} from "./views/common/group-details/group-details.component";
import {MatLegacyChipsModule} from "@angular/material/legacy-chips";
import {TrenLayoutComponent} from "./views/common/trenajer/tren-layout/tren-layout.component";
import {MatGridListModule} from "@angular/material/grid-list";
import {ErrorPageComponent} from './views/error-page/error-page.component';
import {OldViewComponent} from './view/old-view/old-view.component';
import {UserdetailsComponent} from './views/common/userdetails/userdetails.component';
import {CreateGroupModalComponent} from './views/admin/creations/create-group-modal/create-group-modal.component';
import {
  CreateTimetableModalComponent
} from './views/admin/creations/create-timetable-modal/create-timetable-modal.component';
import {SetTeacherModalComponent} from './views/admin/insertions/set-teacher-modal/set-teacher-modal.component';
import {MatLegacyProgressBarModule} from "@angular/material/legacy-progress-bar";
import { CreateUserComponent } from './views/admin/creations/create-user/create-user.component';
import {MatStepperModule} from "@angular/material/stepper";
import {MatRadioModule} from "@angular/material/radio";
import { UsersViewerComponent } from './views/admin/users-viewer/users-viewer.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    MainAdminComponent,
    MainTeacherComponent,
    MainPupilComponent,
    MainComponent,
    GroupsViewerComponent,
    GroupDetailsComponent,
    TrenLayoutComponent,
    ErrorPageComponent,
    OldViewComponent,
    UserdetailsComponent,
    CreateGroupModalComponent,
    CreateTimetableModalComponent,
    SetTeacherModalComponent,
    CreateUserComponent,
    UsersViewerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatLegacyChipsModule,
    MatGridListModule,
    MatLegacyProgressBarModule,
    MatStepperModule,
    MatRadioModule,
  ],
  providers: [authInterceptorProviders, authErrorInterceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule{}
