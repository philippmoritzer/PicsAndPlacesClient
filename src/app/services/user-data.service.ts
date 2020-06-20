import { User } from 'src/app/models/user';
import { Tour } from './../models/tour';
import { Observable } from 'rxjs';
import { AuthService } from './auth/auth.service';
import { Location } from './../models/location';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from './config.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  constructor(private config: ConfigService, private http: HttpClient,
    private authService: AuthService) { }

  public getLocationsByUserAPI(): Observable<Location[]> {
    return this.http.get<Location[]>(this.config.apiUrl + 'user/' + this.authService.currentUser.id + '/location');
  }

  public getToursByUserAPI(): Observable<Tour[]> {
    return this.http.get<Tour[]>(this.config.apiUrl + 'user/' + this.authService.currentUser.id + '/tour');
  }

  public getUserInfoAPI(): Observable<User> {
    return this.http.get<User>(this.config.apiUrl + `${this.authService.currentUser.id}`);
  }
}
