import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainPupilComponent} from "./views/pupils/main-pupil/main-pupil.component";
import {AuthGuardService} from "./helper/auth-guard.service";
import {MainTeacherComponent} from "./views/teachers/main-teacher/main-teacher.component";
import {MainComponent} from "./views/main/main.component";
import {LoginComponent} from "./auth/login/login.component";
import {RegisterComponent} from "./auth/register/register.component";
import {TeacherGuardService} from "./helper/teacher-guard.service";
import {AdminGuardService} from "./helper/admin-guard.service";
import {MainAdminComponent} from "./views/admin/main-admin/main-admin.component";
import {TrenLayoutComponent} from "./views/common/trenajer/tren-layout/tren-layout.component";
import {ErrorPageComponent} from "./views/error-page/error-page.component";
import {GroupDetailsComponent} from "./views/common/group-details/group-details.component";

const routes: Routes = [
  {path: 'pupil',component: MainPupilComponent},
  {path: 'teacher',component: MainTeacherComponent,canActivate: [TeacherGuardService]},
  {path: 'admin',component: MainAdminComponent,canActivate: [AdminGuardService]},
  {path: 'main',component: MainPupilComponent,canActivate: [AuthGuardService]},
  {path: 'login',component: LoginComponent},
  {path: 'register', component: RegisterComponent,canActivate: [AdminGuardService]},
  {path: 'trenajer',component: TrenLayoutComponent},
  {path: '', redirectTo: 'main',pathMatch: 'full'},
  {path: 'errorPage', component: ErrorPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
