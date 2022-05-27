import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private url = environment.apiUrl;

  constructor(private http: HttpClient, private _api: ApiService) {}
  getAllCategories(): Observable<any> {
    return this.http.get(this.url + 'categories');
  }
}
