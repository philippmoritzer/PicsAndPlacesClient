import { MapService } from './../../../../services/maps/map.service';
import { CategoryService } from './../../../../services/category.service';
import { Category } from './../../../../models/category';
import { MediaService } from './../../../../services/media.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from './../../../../models/location';
import { LocationService } from './../../../../services/location.service';
import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { FormBuilder, FormControl, Validator, Validators } from '@angular/forms';
import { Address } from 'src/app/models/address';
import { City } from 'src/app/models/city';
import { Country } from 'src/app/models/country';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-location-edit',
  templateUrl: './location-edit.component.html',
  styleUrls: ['./location-edit.component.css']
})
export class LocationEditComponent implements OnInit, AfterViewInit {

  @Input() modal;
  files: File[] = [];
  latlng = { lat: 0.0, lng: 0.0 };
  fetchedAddressDetails: any = {};
  editMode: boolean = false;
  editLocation: Location;
  locationForm;
  categories: Category[] = [];

  constructor(private route: ActivatedRoute, private router: Router, private locationService: LocationService,
    private mediaService: MediaService, private categoryService: CategoryService, private formBuilder: FormBuilder,
    private mapService: MapService) {
    this.locationForm = this.formBuilder.group({
      locationname: new FormControl('', [Validators.required, Validators.minLength(3)]),
      locationdescription: new FormControl(null, [Validators.required, Validators.minLength(5)]),
      locationlat: new FormControl({ value: this.latlng.lat, disabled: true }, [Validators.required]),
      locationlng: new FormControl({ value: this.latlng.lng, disabled: true }, [Validators.required]),
      locationcategory: new FormControl(null, [Validators.required])
    })

  }

  ngOnInit(): void {
    this.route.firstChild.firstChild.queryParams.subscribe(queryParams => {
      if (!this.editMode) {
        this.latlng = { lat: queryParams.lat, lng: queryParams.lng };
        this.locationForm.controls['locationlat'].setValue(this.latlng.lat);
        this.locationForm.controls['locationlng'].setValue(this.latlng.lng);
        this.mapService.getAddressDetailsByCoordinates(this.latlng.lat, this.latlng.lng).subscribe(result => {
          console.log(result);
          this.fetchedAddressDetails = result.address;
        });

      }
    });
    this.categoryService.getCategories().subscribe(result => {

      this.categories = result;
    });
  }

  ngAfterViewInit(): void {

  }

  onSubmit(data) {

    console.log(data);

    if (!this.editMode) { //if editMode = false, create dialog is open

      const newLocation: Location = new Location(data.locationname,
        data.locationdescription,
        this.latlng.lat,
        this.latlng.lng,
        data.locationcategory,
        new Address(this.fetchedAddressDetails.road, this.fetchedAddressDetails.house_number ? this.fetchedAddressDetails.house_number : 0, this.fetchedAddressDetails.postcode,
          new City(this.fetchedAddressDetails.city, this.fetchedAddressDetails.postcode), new Country(this.fetchedAddressDetails.country)),
        { "id": 1 } as User,
        []);

      console.log(newLocation);
      this.locationService.insertLocationAPI(newLocation).subscribe(result => {
        this.files.forEach((file) => {
          this.mediaService.uploadImageAPI(file, (result as any).insertId).subscribe(result => {
            console.log("images inserted successfully");
          });
        })

        this.modal.close();
      })


      //this.locationService.insertLocationAPI(newLocation);
    } else {            //edit dialog
      //   this.locationService.updateLocationAPI(this.editLocation.id, this.editLocation);
      // }
      this.modal.close();
      this.router.navigateByUrl('');
    }
  }
  onSelect(event) {
    console.log(event);
    this.files.push(...event.addedFiles);
  }

  onRemove(event) {
    this.files.splice(this.files.indexOf(event), 1);
  }
}
