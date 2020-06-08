import { SearchLocationComponent } from './components/overlay/search-location/search-location.component';
import { JwtInterceptor } from './services/http/jwt.interceptor';
import { ModalContainerComponent } from './components/dialog/modal/modal-container/modal-container.component';
import { JwtHelperService, JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MapComponent } from './components/maps/map/map.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './components/navigation/navbar/navbar.component';
import { LocationDetailComponent } from './components/dialog/location-dialog/location-detail/location-detail.component';
import { LocationEditComponent } from './components/dialog/location-dialog/location-edit/location-edit.component';
import { TestComponent } from './components/test/test.component';
import { createCustomElement } from '@angular/elements';
import { LocationTooltipComponent } from './components/tooltips/location-tooltip/location-tooltip.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { CategoryFilterComponent } from './components/overlay/category-filter/category-filter.component';
import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { ModalContainerAuthComponent } from './components/dialog/modal/modal-container-auth/modal-container-auth.component';



@NgModule({
  declarations: [

    AppComponent,
    MapComponent,
    NavbarComponent,
    LocationDetailComponent,
    ModalContainerComponent,
    LocationEditComponent,
    TestComponent,
    LocationTooltipComponent,
    CategoryFilterComponent,
    SearchLocationComponent,
    LoginComponent,
    SignupComponent,
    ModalContainerAuthComponent
  ],
  imports: [
    NgxDropzoneModule,
    LeafletModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,

  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    JwtHelperService,
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
  ],
  bootstrap: [AppComponent],
  entryComponents: [LocationTooltipComponent]
})
export class AppModule {
  constructor(private injector: Injector) {
    const LocationTooltipElement = createCustomElement(LocationTooltipComponent, { injector });
    customElements.define('location-tooltip-element', LocationTooltipElement);
  }
}
