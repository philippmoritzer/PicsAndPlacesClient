import { Observable } from 'rxjs';
import { Category } from './../models/category';
import { ConfigService } from './config.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient, private configService: ConfigService) { }

  public getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.configService.apiUrl + 'category');
  }
}
