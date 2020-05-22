import { Location } from './../../../../models/location';
import { LocationService } from './../../../../services/location.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Component, OnInit, Host, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-location-detail',
  templateUrl: './location-detail.component.html',
  styleUrls: ['./location-detail.component.css']
})
export class LocationDetailComponent implements OnInit {

  @Input() modal;
  location: Location;

  constructor(private route: ActivatedRoute, private locationService: LocationService) { }

  ngOnInit(): void {
    this.route.firstChild.firstChild.params.subscribe(params => {
      const locationId = params.id;
      this.locationService.getLocationByIdAPI(locationId).subscribe(result => {
        this.location = result;
      });
    });
  }

}
