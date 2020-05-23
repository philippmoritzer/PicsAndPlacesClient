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


  getAddressDetailsByCoordinates(lat, lng): Observable<any> {
    return this.http.get<any>('https://nominatim.openstreetmap.org/reverse?lat=' + lat + '&lon=' + lng + '&format=json');
  }

  updateMapLayers(newLocationId?: number) {
    if (newLocationId) {
      this.http.get<Location>(this.configService.apiUrl + `location/${newLocationId}`).subscribe(result => {
        let location: Location = result;
        const circle = L.circle([location.latitude, location.longitude], { radius: 100 });

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

        this.layers.push(circle);

      });
    }


  }


}
