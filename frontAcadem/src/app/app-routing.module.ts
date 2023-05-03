import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuardService} from "./helper/auth-guard.service";
import {LoginComponent} from "./auth/login/login.component";
import {TeacherGuardService} from "./helper/teacher-guard.service";
import {TrenLayoutComponent} from "./views/common/trenajer/tren-layout/tren-layout.component";
import {ErrorPageComponent} from "./views/error-page/error-page.component";
import {MainComponent} from "./views/main/main.component";

const routes: Routes = [
  {path: 'main', component: MainComponent, canActivate: [AuthGuardService]},
  {path: 'login', component: LoginComponent},
  {path: 'trenajer', component: TrenLayoutComponent},
  {path: '', redirectTo: 'main', pathMatch: 'full'},
  {path: 'errorPage', component: ErrorPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
