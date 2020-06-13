import { AuthService } from './../../../../services/auth/auth.service';
import { ConfigService } from './../../../../services/config.service';
import { Media } from './../../../../models/media';
import { MapService } from './../../../../services/maps/map.service';
import { CategoryService } from './../../../../services/category.service';
import { Category } from './../../../../models/category';
import { MediaService } from './../../../../services/media.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from './../../../../models/location';
import { LocationService } from './../../../../services/location.service';
import { Component, OnInit, Input } from '@angular/core';
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
export class LocationEditComponent implements OnInit {

  //both
  @Input() modal;
  locationForm;
  files: File[] = [];
  editMode: boolean = false;
  categories: Category[] = [];

  //create
  latlng = { lat: 0.0, lng: 0.0 };
  fetchedAddressDetails: any = {};

  //edit
  editLocation: Location = null;
  addedFiles: File[] = [];
  deletedFiles: Media[] = [];

  constructor(private route: ActivatedRoute, private router: Router, private locationService: LocationService,
    private mediaService: MediaService, private categoryService: CategoryService, private formBuilder: FormBuilder,
    private mapService: MapService, private configService: ConfigService, private authService: AuthService) {
    this.locationForm = this.formBuilder.group({
      locationname: new FormControl('', [Validators.required, Validators.minLength(3)]),
      locationdescription: new FormControl(null, [Validators.required, Validators.minLength(5)]),
      locationlat: new FormControl({ value: this.latlng.lat, disabled: true }, [Validators.required]),
      locationlng: new FormControl({ value: this.latlng.lng, disabled: true }, [Validators.required]),
      locationcategory: new FormControl(null, [Validators.required])
    });

  }

  ngOnInit(): void {
    this.route.firstChild.firstChild.params.subscribe(params => {
      if (params.id) {
        this.editMode = true;
      }

      this.route.firstChild.firstChild.queryParams.subscribe(queryParams => {
        this.categoryService.getCategories().subscribe(result => {

          this.categories = result;

          if (!this.editMode) {
            this.latlng = { lat: queryParams.lat, lng: queryParams.lng };
            this.locationForm.controls['locationlat'].setValue(this.latlng.lat);
            this.locationForm.controls['locationlng'].setValue(this.latlng.lng);
            this.mapService.getAddressDetailsByCoordinates(this.latlng.lat, this.latlng.lng).subscribe(result => {
              console.log(result);
              this.fetchedAddressDetails = result.address;
            });

          } else { //Edit mode -> fetch location to edit
            this.locationService.getLocationByIdAPI(params.id).subscribe(result => {
              this.editLocation = result;
              if (!this.canEdit()) {
                this.modal.close();
              }
              this.locationForm.controls['locationlat'].setValue(this.editLocation.latitude);
              this.locationForm.controls['locationlng'].setValue(this.editLocation.longitude);
              this.locationForm.controls['locationname'].setValue(this.editLocation.name);
              this.locationForm.controls['locationdescription'].setValue(this.editLocation.description);
              this.categories.forEach(cat => {
                if (cat.id === this.editLocation.category.id) {
                  this.locationForm.controls['locationcategory'].setValue(cat);
                }
              });
              this.getMediaFiles();

            })
          }
        });
      });
    });

  }

  onSubmit(data) {

    if (!this.editMode) { //if editMode = false, create dialog is open

      const newLocation: Location = new Location(data.locationname,
        data.locationdescription,
        this.latlng.lat,
        this.latlng.lng,
        data.locationcategory,
        new Address(this.fetchedAddressDetails.road,
          isNaN(this.fetchedAddressDetails.house_number) ? 0 : this.fetchedAddressDetails.house_number,
          this.fetchedAddressDetails.postcode,
          new City(this.fetchedAddressDetails.city, this.fetchedAddressDetails.postcode),
          new Country(this.fetchedAddressDetails.country)),
        this.authService.currentUser,
        []);

      this.locationService.insertLocationAPI(newLocation).subscribe(result => {
        const insertId = (result as any).insertId;
        if (this.files.length > 0) {
          this.files.forEach((file) => {
            this.mediaService.uploadImageAPI(file, insertId).subscribe(result => {
              this.mapService.updateMapLayers(insertId);
            });
          });
        } else {
          this.mapService.updateMapLayers(insertId);
        }
      });
    } else {            //edit dialog
      this.editLocation.name = data.locationname;
      this.editLocation.description = data.locationdescription;
      this.editLocation.category = data.locationcategory;
      this.locationService.updateLocationAPI(this.editLocation.id, this.editLocation).subscribe(result => {
        this.mapService.deleteMarker(this.editLocation.id);
        this.mapService.drawMarker(this.editLocation);
        if (this.addedFiles.length > 0) {
          this.addedFiles.forEach((file) => {
            this.mediaService.uploadImageAPI(file, this.editLocation.id).subscribe(result => {
            });
          });
        }
        if (this.deletedFiles.length > 0) {
          this.deletedFiles.forEach((media) => {
            this.mediaService.deleteImageAPI(this.editLocation.id, media).subscribe(result => {
              this.mapService.updateMapLayers(this.editLocation.id);
            });
          });
        }
      });

    }
    this.modal.close();
    this.router.navigateByUrl('');


  }
  onSelect(event) {
    console.log(event);
    if (this.editMode) {
      this.addedFiles.push(...event.addedFiles)
    }
    this.files.push(...event.addedFiles);
  }

  onRemove(event) {
    console.log(event);
    console.log(this.files.indexOf(event));
    if (!this.editMode) {
      this.files.splice(this.files.indexOf(event), 1);

    } else {
      if (this.files.indexOf(event) <= this.editLocation.mediaList.length - 1) {
        const fileToRemove: Media = this.editLocation.mediaList[this.files.indexOf(event)];
        this.editLocation.mediaList.splice(this.files.indexOf(event), 1);
        this.files.splice(this.files.indexOf(event), 1);
        this.deletedFiles.push(fileToRemove);
      }
    }
  }

  deleteLocation() {
    this.locationService.deleteLocationAPI(this.editLocation.id).subscribe(result => {
      this.mapService.deleteMarker(this.editLocation.id);
      this.modal.close();
    });
  }

  getMediaFiles() {

    this.editLocation.mediaList.forEach(media => {
      fetch(this.configService.mediaUrl + media.mediapath).then(res => {
        res.blob().then(blob => {
          const uriParts = media.mediapath.split('/');
          const filename = uriParts[uriParts.length - 1];
          this.files.push(this.blobToFile(blob, filename));
        }).catch(err => {
          console.log(err);
        });
      }).catch(err => {
        console.log(err);
      });
    });
  }

  canEdit(): boolean {
    if (this.editMode) {
      if (this.authService.currentUser) {
        if (this.editLocation.createUser.id === this.authService.currentUser.id ||
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

  blobToFile = (blob: Blob, fileName: string): File => {
    const b: any = blob;
    b.lastModifiedDate = new Date();
    b.name = fileName;

    return blob as File;
  }
}
