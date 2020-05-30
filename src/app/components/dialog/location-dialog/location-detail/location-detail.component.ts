import { User } from './../../../../models/user';
import { FormControl, FormBuilder, Validators } from '@angular/forms';
import { Rating } from './../../../../models/rating';
import { RatingService } from './../../../../services/rating.service';
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
  ratings: Rating[] = [];
  images: Media[] = [];
  showNavigationArrows = true;
  showNavigationIndicators = true;
  ratingForm;

  constructor(private route: ActivatedRoute, private modalService: NgbModal, private locationService: LocationService,
    private config: ConfigService, private ratingService: RatingService, private formBuilder: FormBuilder) {

    this.ratingForm = this.formBuilder.group({
      ratingcomment: new FormControl('', [Validators.required, Validators.minLength(3)]),
      ratingvalue: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {

    this.route.firstChild.firstChild.params.subscribe(params => {
      const locationId = params.id;
      this.locationService.getLocationByIdAPI(locationId).subscribe(result => {
        this.location = result;
        console.log(this.location);
        this.images = this.location.mediaList;

        this.ratingService.getRatingForLocationAPI(this.location.id).subscribe(resultRating => {
          this.ratings = resultRating;
        })

      });
    });
  }

  onSubmit() {

    const value = this.ratingForm.value.ratingvalue;
    const comment = this.ratingForm.value.ratingcomment;
    const user = { id: 2 } as User;
    const rating: Rating = new Rating(value, comment, user);

    this.ratingService.insertLocationAPI(this.location.id, rating).subscribe(result => {
      this.ratings.push(result);
      this.ratingForm.reset(this.ratingForm.value);
    });


  }

  get mediaUrl() {
    return this.config.mediaUrl;
  }

}
