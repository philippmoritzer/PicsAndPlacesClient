import { Location } from './../models/location';
import { Observable } from 'rxjs';
import { ConfigService } from './config.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private http: HttpClient, private configService: ConfigService) {

  }

  public getLocationsAPI(): Observable<Location[]> {
    return this.http.get<Location[]>(this.configService.apiUrl + 'location');
  }

  public getLocationByIdAPI(id: number): Observable<Location> {
    return this.http.get<Location>(this.configService.apiUrl + `location/${id}`);
  }

  public insertLocationAPI(location: Location): Observable<Location> {
    return this.http.post<Location>(this.configService.apiUrl + 'location', { "location": location });
  }

  public updateLocationAPI(id: number, location: Location): Observable<Location> {
    return this.http.put<Location>(this.configService.apiUrl + `location/${id}`, location);
  }
  public deleteLocationAPI(id: number): Observable<Location> {
    return this.http.delete<Location>(this.configService.apiUrl + `location/${id}`);
  }



}
