import { Location } from './../models/location';
import { Observable } from 'rxjs';
import { ConfigService } from './config.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  locations: Location[];

  constructor(private http: HttpClient, private config: ConfigService) {

  }

  public getLocationsAPI(): Observable<Location[]> {
    return this.http.get<Location[]>('http://localhost:3001/location');
  }

  private getLocationByIdAPI() { }
  private insertLocationAPI() { }
  private updateLocationAPI() { }
  private deleteLocationAPI() { }

  public getLocations() {
    this.getLocationsAPI().subscribe((result: Location[]) => {
      this.locations = result;
    });
  }

}
