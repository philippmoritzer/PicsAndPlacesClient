import { Location } from './../../models/location';
import { Router } from '@angular/router';
import { ConfigService } from './../config.service';
import { LocationTooltipComponent } from './../../components/tooltips/location-tooltip/location-tooltip.component';
import { NgElement, WithProperties } from '@angular/elements';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as L from 'leaflet';


@Injectable({
  providedIn: 'root'
})
export class MapService {

  constructor(private http: HttpClient, private configService: ConfigService, private router: Router) { }

  layers: any[] = [];
  locationLayer: LocationLayer[] = [];


  getAddressDetailsByCoordinates(lat, lng): Observable<any> {
    return this.http.get<any>('https://nominatim.openstreetmap.org/reverse?lat=' + lat + '&lon=' + lng + '&format=json');
  }

  updateMapLayers(newLocationId?: number) {
    if (newLocationId) {
      this.http.get<Location>(this.configService.apiUrl + `location/${newLocationId}`).subscribe(result => {
        let location: Location = result;
        console.log(location);
        this.drawMarker(location);
      });
    }
  }

  drawMarker(location: Location) {
    const circle = L.circle([location.latitude, location.longitude], { radius: 100, color: location.category.hexcolor });

    circle.on('click', (e) => {
      this.router.navigateByUrl(`/location/${location.id}`);
    });

    circle.bindPopup(layer => {
      const tooltipEl: NgElement & WithProperties<LocationTooltipComponent>
        = document.createElement('location-tooltip-element') as any;
      tooltipEl.location = location;
      return tooltipEl;
    });
    circle.on('mouseover', (e) => {
      circle.openPopup();
    });
    circle.on('mouseout', (e) => {
      circle.closePopup();
    });


    this.locationLayer.push(new LocationLayer(location.id, circle));
    this.layers.push(circle);
  }

  deleteMarker(locationId: number) {
    this.locationLayer = this.locationLayer.filter(locationLayer => locationLayer.locationId === locationId); //get the circle
    // mapped with locationId
    this.locationLayer[0].circle; //extract the circle

    const index = this.layers.indexOf(this.locationLayer[0].circle, 0);
    if (index > -1) {
      this.layers.splice(index, 1);
    }
  }
}

class LocationLayer {
  locationId;
  circle;

  constructor(locationId, circle) {
    this.locationId = locationId;
    this.circle = circle;
  }
}
