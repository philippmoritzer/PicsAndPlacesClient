import { Tour } from './../../../../models/tour';
import { Location } from './../../../../models/location';
import { AuthService } from './../../../../services/auth/auth.service';
import { tileLayer, latLng } from 'leaflet';
import { ActivatedRoute } from '@angular/router';
import { TourService } from './../../../../services/tour.service';
import { ConfigService } from './../../../../services/config.service';
import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-tour-detail',
  templateUrl: './tour-detail.component.html',
  styleUrls: ['./tour-detail.component.css']
})
export class TourDetailComponent implements OnInit, AfterViewInit {
  @Input() modal;
  @Input() parent;
  tour: Tour;
  canEdit: boolean = false;
  map;
  polyline: L.Polyline;

  options: L.MapOptions = {
    layers: [
      tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' }),
    ],
    zoom: 12,
    center: latLng(53.06995302374976, 8.834999024215396)
  };

  layers = [];
  coords = [];

  constructor(private config: ConfigService, private tourService: TourService,
    private route: ActivatedRoute, private authService: AuthService) { }

  ngOnInit(): void {
    this.route.firstChild.firstChild.params.subscribe(params => {
      const tourId: number = params.id;

      this.tourService.getTourByIdAPI(tourId).subscribe(result => {
        this.tour = result;
        this.setCanEdit();

        this.tour.locations.forEach(element => {
          this.drawLocation(element);

        });
      });
    });
  }

  ngAfterViewInit(): void {
  }

  drawLocation(location: Location) {
    const circle = L.circle([location.latitude, location.longitude], { radius: 100, color: location.category.hexcolor });
    circle.bindTooltip(location.name);
    this.coords.push([location.latitude, location.longitude]);
    this.layers.push(circle);
  }


  onMapReady(map) {
    this.map = map;
    this.polyline = L.polyline(this.coords, { color: this.tour.category.hexcolor, weight: 5 });
    this.map.addLayer(this.polyline);
    this.map.panTo(this.polyline.getCenter());
  }

  setCanEdit() {
    if (this.authService.currentUser) {
      if (this.tour.createUser.id === this.authService.currentUser.id ||
        this.authService.currentUser.role === 3) {
        this.canEdit = true;
      }
    }
  }

  navigateToEdit() {
    this.modal.close(this.tour.id);
  }



}
