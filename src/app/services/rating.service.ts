import { Rating } from './../models/rating';
import { Observable } from 'rxjs';
import { ConfigService } from './config.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  constructor(private http: HttpClient, private configService: ConfigService) { }

  getRatingForLocationAPI(locationId: number): Observable<Rating[]> {
    return this.http.get<Rating[]>(this.configService.apiUrl + 'location/' + locationId + '/rating');
  }
}
