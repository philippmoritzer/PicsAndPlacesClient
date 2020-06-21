import { MapService } from './../../../services/maps/map.service';
import { Location } from './../../../models/location';
import { LocationService } from './../../../services/location.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notification-box',
  templateUrl: './notification-box.component.html',
  styleUrls: ['./notification-box.component.css']
})
export class NotificationBoxComponent implements OnInit {

  constructor(private locationService: LocationService, private mapService: MapService) { }

  ngOnInit(): void {
  }


  panMapToLocation(location: Location) {
    this.mapService.panMapToLocation(location);
  }

  get tempLocations() {
    return this.locationService.tempLocations;
  }



}
