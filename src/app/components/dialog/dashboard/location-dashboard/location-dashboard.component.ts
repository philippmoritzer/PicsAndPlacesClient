import { Location } from './../../../../models/location';
import { UserDataService } from './../../../../services/user-data.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-location-dashboard',
  templateUrl: './location-dashboard.component.html',
  styleUrls: ['./location-dashboard.component.css']
})
export class LocationDashboardComponent implements OnInit {

  @Input() modal;
  userLocations: Location[] = [];
  constructor(private userDataService: UserDataService) { }

  ngOnInit(): void {
    this.userDataService.getLocationsByUserAPI().subscribe(result => {
      this.userLocations = result;
    });
  }

  navigateToEditLocation(locationId: number) {
    this.modal.close({ type: 'location', reason: 'edit', id: locationId });
  }
  navigateToDetailLocation(locationId: number) {
    this.modal.close({ type: 'location', reason: 'detail', id: locationId });
  }



}
