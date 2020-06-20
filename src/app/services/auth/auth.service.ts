import { ConfigService } from './../config.service';
import { User } from 'src/app/models/user';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Constants } from './../../misc/constants';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentUser: User;

  constructor(public jwtHelperService: JwtHelperService, private http: HttpClient, private config: ConfigService) {
    if (localStorage.getItem(Constants.TOKENKEY)) {
      const user = this.decodeToken();
      this.currentUser = user;

    }
  }

  public isAuthenticated(): boolean {
    return localStorage.getItem(Constants.TOKENKEY) ?
      !this.jwtHelperService.isTokenExpired(localStorage.getItem(Constants.TOKENKEY))
      : false;
  }

  public loginAPI(credentials): Observable<User> {
    return this.http.post<User>(this.config.apiUrl + 'auth', credentials);
  }

  public signupAPI(user: User): Observable<User> {
    return this.http.post<User>(this.config.apiUrl + 'auth/signup', user);
  }

  public changePasswordAPI(userPwObj): Observable<any> {
    return this.http.put<any>(this.config.apiUrl + 'auth/password', userPwObj, { observe: 'response' });
  }

  public decodeToken(): any {
    const token = localStorage.getItem(Constants.TOKENKEY);
    if (token) {
      return this.jwtHelperService.decodeToken(token);
    }
  }

  public login(user: User) {
    localStorage.setItem(Constants.TOKENKEY, user.token);
    this.currentUser = user;
  }

  public logout() {
    localStorage.removeItem(Constants.TOKENKEY);
  }



}
