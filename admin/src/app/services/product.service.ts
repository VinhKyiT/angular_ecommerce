import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Products, Product } from '../shared/models/product.model';
import { environment } from '../../environments/environment';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private url = environment.apiUrl;

  constructor(private http: HttpClient, private _api: ApiService) {}

  getAllProducts(): Observable<Products> {
    return this.http.get<Products>(this.url + 'products/all');
  }

  getProductsByCategory(category: string): Observable<Products> {
    const url =
      category === 'Tất cả' ? 'products/all' : 'products/category/' + category;
    return this.http.get<Products>(this.url + url);
  }

  getSingleProduct(id: Number): Observable<any> {
    return this._api.getTypeRequest('products/' + id);
  }

  updateProduct(product: Product, cateId: String): Observable<any> {
    return this.http.put<Product>(this.url + 'products/update/' + product.id, {
      product: {
        ...product,
        cat_id: cateId,
      },
    });
  }

  addProduct(product: any): Observable<any> {
    return this.http.post<Product>(this.url + 'products/add', {
      ...product,
    });
  }
}
