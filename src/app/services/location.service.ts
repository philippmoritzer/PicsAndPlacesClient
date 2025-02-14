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
  tempLocations: Location[] = [];

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
    });
    return this.http.get<Location[]>(this.configService.apiUrl + queryString);
  }

  public getLocationsByNameAPI(name: string): Observable<Location[]> {
    return this.http.get<Location[]>(this.configService.apiUrl + `location/search/${name}`);
  }

  public getLocationByIdAPI(id: number): Observable<Location> {
    return this.http.get<Location>(this.configService.apiUrl + `location/${id}`);
  }
  public getLocationForUserAPI(id: number): Observable<Location[]> {
    return this.http.get<Location[]>(this.configService.apiUrl + `location/user/${id}`);
  }
  public insertLocationAPI(location: Location): Observable<Location> {
    return this.http.post<Location>(this.configService.apiUrl + 'location', location);
  }

  public updateLocationAPI(id: number, location: Location): Observable<Location> {
    return this.http.put<Location>(this.configService.apiUrl + `location/${id}`, location);
  }
  public deleteLocationAPI(id: number): Observable<Location> {
    return this.http.delete<Location>(this.configService.apiUrl + `location/${id}`);
  }



}
