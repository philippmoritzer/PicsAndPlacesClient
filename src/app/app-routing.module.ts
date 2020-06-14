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


const routes: Routes = [
  { path: '', component: MiscComponent },
  {
    path: 'location', component: ModalContainerComponent, children: [
      { path: 'create', component: LocationEditComponent },
      { path: ':id', component: LocationDetailComponent },
      { path: 'edit/:id', component: LocationEditComponent },

    ]
  },
  {
    path: 'tour', component: ModalContainerComponent, children: [
      { path: 'create', component: TourEditComponent },
      { path: ':id', component: TourDetailComponent },
      { path: 'edit/:id', component: TourEditComponent },

    ]
  },
  {
    path: 'auth', component: ModalContainerAuthComponent, children: [
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignupComponent }
    ]
  },
  {
    path: 'dialog', component: ModalContainerComponent, children: [
      { path: 'dashboard', component: DashboardComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

