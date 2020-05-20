import { ModalContainerComponent } from './components/dialog/modal/modal-container/modal-container.component';
import { LocationDetailComponent } from './components/dialog/location-dialog/location-detail/location-detail.component';
import { TestComponent } from './components/test/test.component';
import { LocationEditComponent } from './components/dialog/location-dialog/location-edit/location-edit.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './services/auth/auth-guard.service';


const routes: Routes = [
  { path: '', component: TestComponent },
  {
    path: 'location', component: ModalContainerComponent, children: [
      { path: 'create', component: LocationEditComponent },
      { path: ':id', component: LocationDetailComponent },
      { path: 'edit/:id', component: LocationEditComponent },

    ]
  },
  { path: 'login', component: LocationEditComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

