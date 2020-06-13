import { AuthService } from './../../../services/auth/auth.service';
import { User } from './../../../models/user';
import { FormControl, FormBuilder, Validators } from '@angular/forms';
import { Rating } from './../../../models/rating';
import { RatingService } from './../../../services/rating.service';
import { Media } from './../../../models/media';
import { ConfigService } from './../../../services/config.service';
import { Location } from './../../../models/location';
import { LocationService } from './../../../services/location.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Component, OnInit, Host, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  @Input() modal;
  @Input() parent;
  locations: Location[] = [];
  ratings: Rating[] = [];
  images: Media[] = [];
  avgRating;
  ratingForm;


  constructor(private route: ActivatedRoute, private router: Router, private modalService: NgbModal,
    private locationService: LocationService, private config: ConfigService, private ratingService: RatingService,
    private formBuilder: FormBuilder, private authService: AuthService) {

    this.ratingForm = this.formBuilder.group({
      ratingcomment: new FormControl('', [Validators.required, Validators.minLength(3)]),
      ratingvalue: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.locationService.getLocationForUserAPI(1).subscribe(result => {
      console.log(result);
      this.locations = result;
    });
  }

  get mediaUrl() {
    return this.config.mediaUrl;
  }

  get currentUser() {
    return this.authService.currentUser;
  }

}
