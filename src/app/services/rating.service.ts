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

  getAverageRatingAPI(locationId: number): Observable<any> {
    return this.http.get<any>(this.configService.apiUrl + 'location/' + locationId + '/rating/avg');
  }

  insertLocationAPI(locationId: number, body: Rating): Observable<Rating> {
    return this.http.post<Rating>(this.configService.apiUrl + 'location/' + locationId + '/rating', body);
  }
}
