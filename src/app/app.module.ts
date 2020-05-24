import { ModalContainerComponent } from './components/dialog/modal/modal-container/modal-container.component';
import { JwtHelperService, JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';
import { AuthService } from './services/auth/auth.service';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
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
  providers: [JwtHelperService, { provide: JWT_OPTIONS, useValue: JWT_OPTIONS }],
  bootstrap: [AppComponent],
  entryComponents: [LocationTooltipComponent]
})
export class AppModule {
  constructor(private injector: Injector) {
    const LocationTooltipElement = createCustomElement(LocationTooltipComponent, { injector });
    customElements.define('location-tooltip-element', LocationTooltipElement);
  }
}
