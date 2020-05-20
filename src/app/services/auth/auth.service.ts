import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public jwtHelperService: JwtHelperService) { }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('picsandplacestoken');
    return !this.jwtHelperService.isTokenExpired(token);
  }
}
