import { Media } from './../../../../models/media';
import { ConfigService } from './../../../../services/config.service';
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
  images: Media[] = [];
  showNavigationArrows = true;
  showNavigationIndicators = true;

  constructor(private route: ActivatedRoute, private modalService: NgbModal, private locationService: LocationService,
    private config: ConfigService) { }

  ngOnInit(): void {

    this.route.firstChild.firstChild.params.subscribe(params => {
      const locationId = params.id;
      this.locationService.getLocationByIdAPI(locationId).subscribe(result => {
        this.location = result;
        console.log(this.location);
        this.images = this.location.mediaList;
      });
    });
  }

  get apiUrl() {
    return this.config.apiUrl;
  }

}
