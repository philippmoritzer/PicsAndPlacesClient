import { Tour } from './../../models/tour';
import { Location } from './../../models/location';
import { Router } from '@angular/router';
import { ConfigService } from './../config.service';
import { LocationTooltipComponent } from './../../components/tooltips/location-tooltip/location-tooltip.component';
import { NgElement, WithProperties } from '@angular/elements';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import * as L from 'leaflet';
import { tileLayer, latLng } from 'leaflet';



@Injectable({
  providedIn: 'root'
})
export class MapService {

  constructor(private http: HttpClient, private configService: ConfigService, private router: Router,
    private ngZone: NgZone) { }

  options: L.MapOptions = {
    layers: [
      tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' }),
    ],
    zoom: 12,
    center: latLng(53.06995302374976, 8.834999024215396)
  };
  layers: any[] = [];
  locationLayer: LocationLayer[] = [];
  map: L.Map;


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
      this.ngZone.run(() => {
        this.router.navigateByUrl(`/location/${location.id}`);
      });
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

  connectPoints(tour: Tour) {
    const connectingLayers: LocationLayer[] = [];

    tour.locations.forEach((element) => {
      this.locationLayer.forEach((element2) => {
        if (element.id === element2.locationId) {
          connectingLayers.push(element2);
          console.log(element2);
        }
      });
    });
    const coords = [];
    for (let i = 0; i < connectingLayers.length; i++) {
      const x = connectingLayers[i].circle.getLatLng().lat;
      const y = connectingLayers[i].circle.getLatLng().lng;
      coords.push([x, y]);
    }

    const polyline = L.polyline(coords, { color: 'yellow', weight: 7 });
    polyline.on('click', (e) => {
      L.DomEvent.stopPropagation(e);
      this.ngZone.run(() => {
        this.router.navigateByUrl('tour/' + tour.id);
      });

    });
    polyline.bindTooltip(tour.name);

    this.layers.push(polyline);

    this.map.panTo(new L.LatLng(coords[0][0], coords[0][1]));
    this.map.setZoom(12);
    this.layers.forEach((element) => {
      if (element instanceof L.polyline) {
        this.layers.splice(this.layers.indexOf(element), 1);
      }
    });
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
