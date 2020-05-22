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
  locations: Location[] = [];

  options: L.MapOptions = {
    layers: [
      tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' }),
    ],
    zoom: 12,
    center: latLng(53.06995302374976, 8.834999024215396)
  };

  layers: any[] = [];

  constructor(private locationService: LocationService, private router: Router) { }


  ngOnInit(): void {
    this.locationService.getLocationsAPI().subscribe(result => {
      this.locations = result;
      this.locations.forEach(el => {
        const circle = L.circle([el.latitude, el.longitude], { radius: 100 });
        circle.on('click', (e) => {
          this.openDetailLocation(el);
        });

        circle.bindPopup(layer => {
          const tooltipEl: NgElement & WithProperties<LocationTooltipComponent>
            = document.createElement('location-tooltip-element') as any;
          tooltipEl.location = el;
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
    });
  }

  openDetailLocation(location) {
    this.router.navigateByUrl(`/location/${location.id}`);
  }

  onMapClick(event) {
    this.router.navigateByUrl(`/location/create?lat=${event.latlng.lat}&lng=${event.latlng.lng}`)
    console.log(event);
  }
}
