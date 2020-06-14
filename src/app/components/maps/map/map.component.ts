import { AuthService } from './../../../services/auth/auth.service';
import { MapService } from './../../../services/maps/map.service';
import { LocationTooltipComponent } from './../../tooltips/location-tooltip/location-tooltip.component';
import { Location } from './../../../models/location';
import { LocationService } from './../../../services/location.service';
import * as L from 'leaflet';
import { Component, OnInit, Output } from '@angular/core';
import { NgElement, WithProperties } from '@angular/elements';
import { Router } from '@angular/router';



@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  constructor(private locationService: LocationService, private router: Router, private mapService: MapService,
    private authService: AuthService) { }


  ngOnInit(): void {
    this.locationService.getLocationsAPI().subscribe(result => {
      this.locationService.locations = result;
      this.locationService.locations.forEach(el => {
        this.mapService.drawMarker(el);
      });
    });
  }

  openDetailLocation(location) {
    this.router.navigateByUrl(`/location/edit/${location.id}`);
  }

  onMapClick(event) {
    if (this.authService.isAuthenticated()) {
      this.router.navigateByUrl(`/location/create?lat=${event.latlng.lat}&lng=${event.latlng.lng}`)
    }
  }

  onMapReady(map: L.Map) {
    this.mapService.map = map;
  }

  get layers() {
    return this.mapService.layers;
  }

  get options(): L.MapOptions {
    return this.mapService.options;

  }

  get locations(): Location[] {
    return this.locationService.locations;
  }

}
