import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from "src/app/components/login/login.component";
import { DashboardComponent } from "src/app/components/dashboard/dashboard.component";
import { AuthGuardService } from "src/app/services/auth-guard/auth-guard.service";
import { AddRoomComponent } from "src/app/components/add-room/add-room.component";
import { NavBarComponent } from "src/app/components/nav-bar/nav-bar.component";
const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuardService],
    data: {
      title: 'Dashboard'
    }
  },
  {
    path:'add-room',
    component: AddRoomComponent,
    canActivate: [AuthGuardService],
    data: {
      title: 'Add Room'
    }
  },
  {
    path:'nav-bar',
    component: NavBarComponent,
    canActivate: [AuthGuardService],
    data: {
      title: 'Dashboard'
    }
  },
  {path: '**', component: LoginComponent,}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
