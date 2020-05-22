import { CategoryService } from './../../../../services/category.service';
import { Category } from './../../../../models/category';
import { MediaService } from './../../../../services/media.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from './../../../../models/location';
import { LocationService } from './../../../../services/location.service';
import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormControl, Validator, Validators } from '@angular/forms';

@Component({
  selector: 'app-location-edit',
  templateUrl: './location-edit.component.html',
  styleUrls: ['./location-edit.component.css']
})
export class LocationEditComponent implements OnInit {

  @Input() modal;
  files: File[] = [];
  latlng = {};
  editMode: boolean;
  editLocation: Location;
  locationForm;
  categories: Category[] = [];

  constructor(private route: ActivatedRoute, private router: Router, private locationService: LocationService,
    private mediaService: MediaService, private categoryService: CategoryService, private formBuilder: FormBuilder) {
    this.locationForm = this.formBuilder.group({
      locationname: new FormControl('', [Validators.required, Validators.minLength(3)]),
      locationdescription: new FormControl(null, [Validators.required, Validators.minLength(5)]),
      locationcategory: new FormControl(null, [Validators.required])
    })

  }

  ngOnInit(): void {
    this.route.firstChild.firstChild.queryParams.subscribe(queryParams => {
      if (!this.editMode) {
        this.latlng = { lat: queryParams.lat, lng: queryParams.lng };
      }
    });
    this.categoryService.getCategories().subscribe(result => {

      this.categories = result;
    });
  }

  onSubmit(data) {

    console.log(data);
    // if (!this.editMode) { //if editMode = false, create dialog is open
    //   let newLocation: Location;
    //   this.locationService.insertLocationAPI(newLocation);
    // } else {            //edit dialog
    //   this.locationService.updateLocationAPI(this.editLocation.id, this.editLocation);
    // }
    this.modal.close();
    this.router.navigateByUrl('');
  }

  onSelect(event) {
    console.log(event);
    this.files.push(...event.addedFiles);
  }

  onRemove(event) {
    this.files.splice(this.files.indexOf(event), 1);
  }
}
