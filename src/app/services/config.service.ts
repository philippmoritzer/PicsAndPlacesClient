import { Config } from './../models/config';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  apiUrl: string = 'http://localhost:3001/api/';
  mediaUrl: string = 'http://localhost:3001/';

  constructor(private http: HttpClient) { }

  private getConfigAsset(): Observable<any> {
    return this.http.get('assets/config.json');
  }

  public getConfiguration(): Config {
    this.getConfigAsset().subscribe((data: Config) => {
      return data;
    });
    return null;
  }
}
