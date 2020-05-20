import { LocationTooltipComponent } from './../../tooltips/location-tooltip/location-tooltip.component';
import { Location } from './../../../models/location';
import { LocationService } from './../../../services/location.service';
import { tileLayer, latLng } from 'leaflet';
import * as L from 'leaflet';
import { Component, OnInit, Output } from '@angular/core';
import { NgElement, WithProperties } from '@angular/elements';



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

        circle.bindTooltip(layer => {
          const tooltipEl: NgElement & WithProperties<LocationTooltipComponent> = document.createElement('location-tooltip-element') as any;
          // Listen to the close event
          tooltipEl.addEventListener('closed', () => document.body.removeChild(tooltipEl));
          tooltipEl.locationTitle = `halloxd`;
          // Add to the DOM
          document.body.appendChild(tooltipEl);
          return tooltipEl;
        });

        // circle.bindTooltip(layer => {
        //   const popupEl: NgElement & WithProperties<LocationPopupComponent> = document.createElement('popup-element') as any;
        //   document.createElement('popup-element') as any; popupEl.locationTitle = el.name; return popupEl;
        // }, this.options
        // );

        // circle.bindTooltip(el.name, {
        //   permanent: false,
        //   opacity: 1,
        //   direction: 'top'
        // });
        this.layers.push(circle);
      });
    });
  }

  openDetailLocation(location) {
    console.log(location);
  }

  circlePopover(event: Event) {
  }

  onMapClick(map) {
    console.log(map);
  }
}
