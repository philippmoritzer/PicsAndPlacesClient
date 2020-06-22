import { AuthService } from './../../../services/auth/auth.service';
import { Router } from '@angular/router';
import { Tour } from './../../../models/tour';
import { MapService } from './../../../services/maps/map.service';
import { TourService } from './../../../services/tour.service';
import { Component, OnInit, ApplicationRef } from '@angular/core';

@Component({
  selector: 'app-tour-settings',
  templateUrl: './tour-settings.component.html',
  styleUrls: ['./tour-settings.component.css']
})
export class TourSettingsComponent implements OnInit {

  constructor(private tourService: TourService, private mapService: MapService, private router: Router, ref: ApplicationRef,
    private authService: AuthService) {

  }

  ngOnInit(): void {

  }

  suggestTour() {
    this.tourService.getRandomTourAPI().subscribe(result => {
      this.tourService.activeTour = result[0];
      this.mapService.connectPoints(result[0]);
    });
  }

  openTourDetail() {
    this.router.navigateByUrl('tour/' + this.activeTour.id);
  }

  openTourEdit() {
    this.router.navigateByUrl('tour/create');
  }

  get activeTour(): Tour {
    return this.tourService.activeTour;
  }

  get isAuthenticated() {
    return this.authService.isAuthenticated();
  }

}
