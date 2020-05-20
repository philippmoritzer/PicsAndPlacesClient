import { Location } from './../../../models/location';
import { LocationService } from './../../../services/location.service';
import { tileLayer, latLng } from 'leaflet';
import * as L from 'leaflet';
import { Component, OnInit, Output } from '@angular/core';
import { EventEmitter } from 'protractor';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  locations: Location[] = [];

  options = {
    layers: [
      tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' }),
    ],
    zoom: 12,
    center: latLng(53.06995302374976, 8.834999024215396)
  };

  layers: any[] = [];

  constructor(private locationService: LocationService) { }


  ngOnInit(): void {
    this.locationService.getLocationsAPI().subscribe(result => {
      this.locations = result;
      console.log(result);
      this.locations.forEach(el => {
        const circle = L.circle([el.latitude, el.longitude], { radius: 100 });
        circle.on('click', (e) => {
          this.openDetailLocation(el);
        });
        this.layers.push(circle);
      });
    });
  }

  openDetailLocation(location) {
    console.log(location);
  }

  onMapClick(map) {
    console.log(map);
  }
}
