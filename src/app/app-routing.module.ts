import { TourDashboardComponent } from './components/dialog/dashboard/tour-dashboard/tour-dashboard.component';
import { LocationDashboardComponent } from './components/dialog/dashboard/location-dashboard/location-dashboard.component';
import { UserDashboardComponent } from './components/dialog/dashboard/user-dashboard/user-dashboard.component';
import { ModalContainerTourComponent } from './components/dialog/modal/modal-container-tour/modal-container-tour.component';
import { TourDetailComponent } from './components/dialog/tour-dialog/tour-detail/tour-detail.component';
import { TourEditComponent } from './components/dialog/tour-dialog/tour-edit/tour-edit.component';
import { MiscComponent } from './components/misc/misc.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { LoginComponent } from './components/auth/login/login.component';
import { ModalContainerAuthComponent } from './components/dialog/modal/modal-container-auth/modal-container-auth.component';
import { ModalContainerComponent } from './components/dialog/modal/modal-container/modal-container.component';
import { LocationDetailComponent } from './components/dialog/location-dialog/location-detail/location-detail.component';
import { LocationEditComponent } from './components/dialog/location-dialog/location-edit/location-edit.component';
import { DashboardComponent } from './components/dialog/dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './services/auth/auth-guard.service';
import { ModalContainerDashboardComponent } from './components/dialog/modal/modal-container-dashboard/modal-container-dashboard.component';


const routes: Routes = [
  {
    path: 'location', component: ModalContainerComponent, children: [
      { path: 'create', component: LocationEditComponent, canActivate: [AuthGuardService] },
      { path: ':id', component: LocationDetailComponent },
      { path: 'edit/:id', component: LocationEditComponent, canActivate: [AuthGuardService] },

    ]
  },
  {
    path: 'tour', component: ModalContainerTourComponent, children: [
      { path: 'create', component: TourEditComponent, canActivate: [AuthGuardService] },
      { path: ':id', component: TourDetailComponent },
      { path: 'edit/:id', component: TourEditComponent, canActivate: [AuthGuardService] },

    ]
  },
  {
    path: 'auth', component: ModalContainerAuthComponent, children: [
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignupComponent }
    ]
  },
  {
    path: 'dashboard', component: ModalContainerDashboardComponent, canActivate: [AuthGuardService], children: [

      { outlet: 'sub', path: 'user', component: UserDashboardComponent },
      { path: 'location', component: LocationDashboardComponent, outlet: 'sub' },
      { path: 'tour', component: TourDashboardComponent, outlet: 'sub' }


    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

