import { AuthService } from './../../../../services/auth/auth.service';
import { TourService } from './../../../../services/tour.service';
import { Tour } from './../../../../models/tour';
import { Location } from './../../../../models/location';
import { LocationService } from './../../../../services/location.service';
import { CategoryService } from './../../../../services/category.service';
import { tileLayer, latLng } from 'leaflet';
import { Category } from './../../../../models/category';
import * as L from 'leaflet';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, Input, NgZone } from '@angular/core';

@Component({
  selector: 'app-tour-edit',
  templateUrl: './tour-edit.component.html',
  styleUrls: ['./tour-edit.component.css']
})
export class TourEditComponent implements OnInit {

  editMode: boolean = false;
  @Input() modal;
  tourForm;
  editTour: Tour = null;
  categories: Category[] = [];
  selectedLocations: Location[] = [];
  layers = [];

  //edit mode
  addedLocationsIds: number[] = [];
  removedLocationIds: number[] = [];


  options: L.MapOptions = {
    layers: [
      tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' }),
    ],
    zoom: 12,
    center: latLng(53.06995302374976, 8.834999024215396)
  };


  constructor(private tourService: TourService, private route: ActivatedRoute, private formBuilder: FormBuilder,
    private categoryService: CategoryService, private locationService: LocationService, private ngZone: NgZone,
    private authService: AuthService) {
    this.tourForm = this.formBuilder.group({
      tourname: new FormControl('', [Validators.required, Validators.minLength(3)]),
      tourdescription: new FormControl(null, [Validators.required, Validators.minLength(5)]),
      tourlength: new FormControl(0),
      tourcategory: new FormControl(null, [Validators.required])
    });
  }

  ngOnInit(): void {
    this.route.firstChild.firstChild.params.subscribe(params => {
      if (params.id) {
        this.editMode = true;
      }
      this.categoryService.getCategories().subscribe(result => {
        this.categories = result;
      });

      this.locations.forEach(element => {
        this.drawMarker(element);
      });

      if (this.editMode) {
        this.tourService.getTourByIdAPI(params.id).subscribe(result => {
          this.editTour = result;

          if (!this.canEdit()) {
            this.modal.close();
          }
          this.selectedLocations = this.editTour.locations;
          this.tourForm.controls['tourname'].setValue(this.editTour.name);
          this.tourForm.controls['tourdescription'].setValue(this.editTour.description);
          this.tourForm.controls['tourlength'].setValue(this.editTour.length);
          this.categories.forEach(cat => {
            if (cat.id === this.editTour.category.id) {
              this.tourForm.controls['tourcategory'].setValue(cat);
            }
          });
        });
      }
    });

  }

  drawMarker(location: Location) {
    const circle = L.circle([location.latitude, location.longitude], { radius: 100, color: location.category.hexcolor });

    circle.on('click', (e) => {
      if (!(this.selectedLocations.filter(loc => loc.id === location.id).length > 0)) {
        this.ngZone.run(() => {
          this.selectedLocations.unshift(location);
          if (this.editMode) {
            this.addedLocationsIds.unshift(location.id);
          }
        });
      }

    });

    circle.bindTooltip(location.name);
    this.layers.push(circle);
  }

  onSubmit(value) {
    if (!this.editMode) { //Insert new location
      const tour: Tour = new Tour(value.tourname, value.tourdescription, value.tourlength, value.tourcategory as Category,
        null, this.authService.currentUser);
      const locationIds = [];
      this.selectedLocations.forEach(loc => {
        locationIds.push(loc.id);
      });
      tour['locations'] = locationIds;

      if (this.selectedLocations.length >= 2) {
        this.tourService.insertTourAPI(tour).subscribe(result => {
          this.modal.close();
        });
      }
    } else { //update location

      const updateTour: Tour = this.editTour;
      updateTour.name = value.tourname;
      updateTour.description = value.tourdescription;
      updateTour.length = value.tourlength;
      updateTour.category = value.tourcategory;
      updateTour['addedLocations'] = this.addedLocationsIds;
      updateTour['removedLocations'] = this.removedLocationIds;
      this.tourService.editTourAPI(this.editTour.id, updateTour).subscribe(result => {
        this.modal.close();
      });
    }
  }

  removeFromSelectedLocations(location: Location) {
    if (this.selectedLocations.length > 2) {
      this.selectedLocations.splice(this.selectedLocations.indexOf(location), 1);
      this.removedLocationIds.push(location.id);
    }
  }

  deleteTour() {
    this.tourService.deleteTourAPI(this.editTour.id).subscribe(result => {
      this.modal.close();
    });
  }

  canEdit(): boolean {
    if (this.editMode) {
      if (this.authService.currentUser) {

        if (this.editTour.createUser.id === this.authService.currentUser.id ||
          this.authService.currentUser.role === 3) {
          return true;
        }
      } else {
        return false;
      }
    } else {
      return true;
    }
  }


  get locations() {
    return this.locationService.locations;
  }
}
