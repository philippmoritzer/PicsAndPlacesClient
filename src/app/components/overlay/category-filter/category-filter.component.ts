import { MapService } from './../../../services/maps/map.service';
import { LocationService } from './../../../services/location.service';
import { Category } from './../../../models/category';
import { ConfigService } from './../../../services/config.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-category-filter',
  templateUrl: './category-filter.component.html',
  styleUrls: ['./category-filter.component.css']
})
export class CategoryFilterComponent implements OnInit {

  categories: Category[] = [];
  selectedCategories: CategoryChecked[] = [];

  constructor(private http: HttpClient, private config: ConfigService, private locationService: LocationService,
    private mapService: MapService) { }

  ngOnInit(): void {
    this.http.get<Category[]>(this.config.apiUrl + 'category').subscribe(result => {
      this.categories = result;
      this.categories.forEach(cat => {
        this.selectedCategories.push(new CategoryChecked(cat, false));
      })
    });
  }

  checkboxChanged(event, category: CategoryChecked) {
    category.checked = event.target.checked;
    console.log(this.selectedCategories);
    console.log(this.selectedCategories.filter(cat => cat.checked));
    const categoryIds: number[] = [];
    const filteredCats = this.selectedCategories.filter(cat => cat.checked);
    if (filteredCats.length === 0) {
      this.locationService.filteredLocations = this.locationService.locations;
      this.locationService.filteredLocations.forEach(location => {
        this.mapService.drawMarker(location);
      });
    } else {
      filteredCats.forEach(cat => {
        categoryIds.push(cat.category.id);
      })
      this.locationService.getLocationsFilterByCategoryAPI(categoryIds).subscribe(result => {
        console.log(result);
        this.locationService.filteredLocations = result;
        this.mapService.layers = [];
        this.locationService.filteredLocations.forEach(location => {
          this.mapService.drawMarker(location);
        });
      });
    }

  }

}
/**
 * Boolean value neeeded for checkbox => wrapping into new Category Object as view helper
 */
class CategoryChecked {
  constructor(public category: Category, public checked: boolean) {
    this.category = category;
    this.checked = checked;
  }
}
