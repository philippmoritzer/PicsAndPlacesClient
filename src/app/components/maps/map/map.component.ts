import { MapService } from './../../../services/maps/map.service';
import { LocationTooltipComponent } from './../../tooltips/location-tooltip/location-tooltip.component';
import { Location } from './../../../models/location';
import { LocationService } from './../../../services/location.service';
import { tileLayer, latLng } from 'leaflet';
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

  options: L.MapOptions = {
    layers: [
      tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' }),
    ],
    zoom: 12,
    center: latLng(53.06995302374976, 8.834999024215396)
  };



  constructor(private locationService: LocationService, private router: Router, private mapService: MapService) { }


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
    this.router.navigateByUrl(`/location/create?lat=${event.latlng.lat}&lng=${event.latlng.lng}`)
    console.log(event);
  }

  get layers() {
    return this.mapService.layers;
  }

  get locations(): Location[] {
    return this.locationService.locations;
  }

}
