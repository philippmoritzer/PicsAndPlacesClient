import { Tour } from './../../../models/tour';
import { MapService } from './../../../services/maps/map.service';
import { TourService } from './../../../services/tour.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tour-settings',
  templateUrl: './tour-settings.component.html',
  styleUrls: ['./tour-settings.component.css']
})
export class TourSettingsComponent implements OnInit {

  constructor(private tourService: TourService, private mapService: MapService) { }

  ngOnInit(): void {

  }

  suggestTour() {
    this.tourService.getRandomTourAPI().subscribe(result => {
      console.log(result);
      this.tourService.activeTour = result[0];
      this.mapService.connectPoints(result[0].locations);
    });
  }

  get activeTour(): Tour {
    return this.tourService.activeTour;
  }

}
