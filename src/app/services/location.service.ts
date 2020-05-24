import { Location } from './../models/location';
import { Observable } from 'rxjs';
import { ConfigService } from './config.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  locations: Location[] = [];
  filteredLocations: Location[] = [];

  constructor(private http: HttpClient, private configService: ConfigService) {

  }

  public getLocationsAPI(): Observable<Location[]> {
    return this.http.get<Location[]>(this.configService.apiUrl + 'location');
  }
  public getLocationsFilterByCategoryAPI(categoryIds: number[]): Observable<Location[]> {
    let queryString: string = 'location?category=';
    categoryIds.forEach((id, index, array) => {
      queryString = queryString + id;
      if (!(index === categoryIds.length - 1)) {
        queryString = queryString + ",";
      }
    })
    console.log(queryString);
    return this.http.get<Location[]>(this.configService.apiUrl + queryString);
  }

  public getLocationByIdAPI(id: number): Observable<Location> {
    return this.http.get<Location>(this.configService.apiUrl + `location/${id}`);
  }

  public insertLocationAPI(location: Location): Observable<Location> {
    return this.http.post<Location>(this.configService.apiUrl + 'location', location);
  }

  public updateLocationAPI(id: number, location: Location): Observable<Location> {
    console.log(location);
    return this.http.put<Location>(this.configService.apiUrl + `location/${id}`, location);
  }
  public deleteLocationAPI(id: number): Observable<Location> {
    return this.http.delete<Location>(this.configService.apiUrl + `location/${id}`);
  }



}
