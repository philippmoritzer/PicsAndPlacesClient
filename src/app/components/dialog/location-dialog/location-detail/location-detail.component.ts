import { AuthService } from './../../../../services/auth/auth.service';
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
  @Input() parent;
  location: Location;
  ratings: Rating[] = [];
  ratingEditViewHelper: RatingEditViewHelper[] = [];
  images: Media[] = [];
  showNavigationArrows = true;
  showNavigationIndicators = true;
  avgRating;
  ratingForm;
  canEdit;

  constructor(private route: ActivatedRoute, private router: Router, private modalService: NgbModal,
    private locationService: LocationService, private config: ConfigService, private ratingService: RatingService,
    private formBuilder: FormBuilder, private authService: AuthService) {

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
        this.images = this.location.mediaList;
        this.setCanEdit();

        this.ratingService.getRatingForLocationAPI(this.location.id).subscribe(resultRating => {
          this.ratings = resultRating;
          this.ratings.forEach(element => {
            this.ratingEditViewHelper.push(new RatingEditViewHelper(element));
          });

          this.ratingService.getAverageRatingAPI(this.location.id).subscribe(avgRatingObj => {
            this.avgRating = avgRatingObj.avgRatingValue;

          })
        })

      });
    });
  }

  onSubmit() {

    const value = this.ratingForm.value.ratingvalue;
    const comment = this.ratingForm.value.ratingcomment;
    const user = this.authService.currentUser;
    const rating: Rating = new Rating(value, comment, user);

    this.ratingService.insertRatingAPI(this.location.id, rating).subscribe(result => {
      this.ratings.unshift(result);
      this.ratingEditViewHelper.unshift(new RatingEditViewHelper(result));
      this.ratingForm.reset(this.ratingForm.value);
    });


  }

  deleteRating(ratingId) {
    this.ratingService.deleteRatingAPI(this.location.id, ratingId).subscribe(result => {
      this.ratings = this.ratings.filter(rating => rating.id !== ratingId);
      this.ratingEditViewHelper = this.ratingEditViewHelper.filter(editViewHelperRating => editViewHelperRating.rating.id !== ratingId);
    });
  }


  setCanEdit() {
    if (this.authService.currentUser) {
      if (this.location.createUser.id === this.authService.currentUser.id ||
        this.authService.currentUser.role === 3) {
        this.canEdit = true;
      }
    }
  }

  navigateToEdit() {
    this.modal.close(this.location.id);
  }

  get mediaUrl() {
    return this.config.mediaUrl;
  }

  get currentUser() {
    return this.authService.currentUser;
  }

  trackByIndex(index: number, obj: any): any {
    return index;
  }
  updateRating(editRatingView: RatingEditViewHelper) {
    const rating = editRatingView.rating;
    this.ratingService.editRatingAPI(this.location.id, rating.id, rating).subscribe(result => {
      editRatingView.editMode = false;
    })
  }

}



class RatingEditViewHelper {
  editMode: boolean = false;
  rating: Rating;

  constructor(rating: Rating) {
    this.rating = rating;
  }
}
