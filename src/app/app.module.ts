import { JwtHelperService, JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';
import { AuthService } from './services/auth/auth.service';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MapComponent } from './components/maps/map/map.component';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from './components/navigation/navbar/navbar.component';
import { LocationDetailComponent } from './components/dialog/location-dialog/location-detail/location-detail.component';
import { ModalContainerComponent } from './components/modal/modal-container/modal-container.component';
import { LocationEditComponent } from './components/dialog/location-dialog/location-edit/location-edit.component';
import { TestComponent } from './components/test/test.component';
import { LocationDetailContentComponent } from './components/dialog/location-dialog/location-detail/location-detail-content/location-detail-content.component';


@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    NavbarComponent,
    LocationDetailComponent,
    ModalContainerComponent,
    LocationEditComponent,
    TestComponent,
    LocationDetailContentComponent
  ],
  imports: [
    LeafletModule,
    FormsModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,

  ],
  providers: [JwtHelperService, { provide: JWT_OPTIONS, useValue: JWT_OPTIONS }],
  bootstrap: [AppComponent]
})
export class AppModule { }
