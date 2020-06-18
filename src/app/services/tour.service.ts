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

  getToursAPI() {
    return this.http.get<Tour>(this.config.apiUrl + 'tour');
  }

  getTourByIdAPI(id: number): Observable<Tour> {
    return this.http.get<Tour>(this.config.apiUrl + `tour/${id}`);
  }

  getRandomTourAPI(): Observable<Tour[]> {
    return this.http.get<Tour[]>(this.config.apiUrl + 'tour/rnd/1');
  }

  insertTourAPI(tour: Tour): Observable<Tour> {
    return this.http.post<Tour>(this.config.apiUrl + 'tour', tour);
  }

  editTourAPI(tourId: number, tour: Tour) {
    return this.http.put<Tour>(this.config.apiUrl + `tour/${tourId}`, tour);
  }

  deleteTourAPI(tourId: number): Observable<Tour> {
    return this.http.delete<Tour>(this.config.apiUrl + `tour/${tourId}`);
  }


}
