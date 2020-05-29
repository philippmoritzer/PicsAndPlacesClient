import { Observable } from 'rxjs';
import { Media } from './../models/media';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from './config.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MediaService {

  constructor(private http: HttpClient, private configService: ConfigService) { }

  uploadImageAPI(image, locationId): Observable<Media> {
    let body = new FormData();
    body.append('media', image);
    return this.http.post<Media>(this.configService.apiUrl + 'location/' + locationId + '/media', body);
  }

}
