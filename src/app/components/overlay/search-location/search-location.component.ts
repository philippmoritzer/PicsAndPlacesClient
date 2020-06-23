import { MapService } from './../../../services/maps/map.service';
import { LocationService } from './../../../services/location.service';
import { ConfigService } from './../../../services/config.service';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
    selector: 'app-search-location',
    templateUrl: './search-location.component.html',
    styleUrls: ['./search-location.component.css']
})



export class SearchLocationComponent {

    constructor(private http: HttpClient, private config: ConfigService, private locationService: LocationService,
        private mapService: MapService) { }

    searchInput = "";
    showAllLocations;

    onSubmit() {
        if (this.searchInput != "") {
            /* locations nach name suchen und anzeigen */
            this.locationService.getLocationsByNameAPI(this.searchInput).subscribe(result => {
                this.locationService.filteredLocations = result;
                this.mapService.layers = [];
                this.locationService.filteredLocations.forEach(location => {
                    this.mapService.drawMarker(location);
                });
                this.showAllLocations = false;
            });
        } else if (this.showAllLocations == false) {
            /* alle locations anzeigen */
            this.locationService.filteredLocations = this.locationService.locations;
            this.locationService.filteredLocations.forEach(location => {
                this.mapService.drawMarker(location);
            });
            this.showAllLocations = true;
        }
    }
}