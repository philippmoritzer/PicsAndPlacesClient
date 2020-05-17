import { Config } from './../models/config';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  public config: Config;

  constructor(private http: HttpClient) { }

  private getConfig() {
    return this.http.get('assets/config.json');
  }

  public exposeConfiguration() {
    this.getConfig().subscribe((data: Config) => {
      this.config = data;
    });
  }
}
