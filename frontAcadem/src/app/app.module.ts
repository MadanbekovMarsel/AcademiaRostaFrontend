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
import {MainComponent} from './views/main/main.component';
import {GroupsViewerComponent} from './views/common/groups-viewer/groups-viewer.component';
import {GroupDetailsComponent} from "./views/common/group-details/group-details.component";
import {MatLegacyChipsModule} from "@angular/material/legacy-chips";
import {TrenLayoutComponent} from "./views/common/trenajer/tren-layout/tren-layout.component";
import {MatGridListModule} from "@angular/material/grid-list";
import {ErrorPageComponent} from './views/error-page/error-page.component';
import {UserdetailsComponent} from './views/common/userdetails/userdetails.component';
import {CreateGroupModalComponent} from './views/admin/creations/create-group-modal/create-group-modal.component';
import {
  CreateTimetableModalComponent
} from './views/admin/creations/create-timetable-modal/create-timetable-modal.component';
import {SetTeacherModalComponent} from './views/admin/insertions/set-teacher-modal/set-teacher-modal.component';
import {MatLegacyProgressBarModule} from "@angular/material/legacy-progress-bar";
import {CreateUserComponent} from './views/admin/creations/create-user/create-user.component';
import {MatStepperModule} from "@angular/material/stepper";
import {MatRadioModule} from "@angular/material/radio";
import {UsersViewerComponent} from './views/admin/users-viewer/users-viewer.component';
import {MatLegacySlideToggleModule} from "@angular/material/legacy-slide-toggle";
import {OlimpComponent} from './views/common/trenajer/olimp/olimp.component';
import {MatSortModule} from "@angular/material/sort";
import {OldViewComponent} from "./view/old-view/old-view.component";
import {TranslationPipe} from './service/ translations/translation.pipe';
import { SubjectsViewerComponent } from './views/common/subjects-viewer/subjects-viewer.component';
import { SubjectCreateComponent } from './views/admin/creations/subject-create/subject-create.component';
import { StatPerDayComponent } from './views/common/statistics/stat-per-day/stat-per-day.component';
import { StatPerTopicComponent } from './views/common/statistics/stat-per-topic/stat-per-topic.component';
import { UserUpdateComponent } from './views/admin/updates/user-update/user-update.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
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
    OlimpComponent,
    TranslationPipe,
    SubjectsViewerComponent,
    SubjectCreateComponent,
    StatPerDayComponent,
    StatPerTopicComponent,
    UserUpdateComponent,
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
        MatLegacySlideToggleModule,
        MatSortModule,
    ],
  providers: [authInterceptorProviders, authErrorInterceptorProvider,TranslationPipe],
  bootstrap: [AppComponent]
})
export class AppModule{}
