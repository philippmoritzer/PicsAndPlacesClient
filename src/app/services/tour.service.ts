import { Observable } from 'rxjs';
import { ConfigService } from './config.service';
import { HttpClient } from '@angular/common/http';
import { Tour } from './../models/tour';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TourService {

  activeTour: Tour;
  constructor(private http: HttpClient, private config: ConfigService) {

  }

  getRandomTourAPI(): Observable<Tour> {
    return this.http.get<Tour>(this.config.apiUrl + 'tour/rnd/1');
  }


}
