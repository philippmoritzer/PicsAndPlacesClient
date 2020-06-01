import { Constants } from './../../misc/constants';
import { Observable } from 'rxjs';
import { AuthService } from './../auth/auth.service';
import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';


/**
 * HTTP-Interceptor that makes sure that the JWT-Token is sent when user is logged in
 */
@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) {
    }

    /**
     * implementation of intercept-Method, adds Bearer-Token to the header
     * @param request 
     * @param next 
     */
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.authService.isAuthenticated()) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${localStorage.getItem(Constants.TOKENKEY)}`
                }
            })
        }

        return next.handle(request);
    }
}