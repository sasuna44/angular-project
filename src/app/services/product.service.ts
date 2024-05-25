import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export class Product {
    constructor(
      public id: number,
      public title: string,
      public image: string | File,
      public price: number,
      public details: string,
      public created_at: string,
      public updated_at: string
    ) {}
  }
  
  
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseurl = 'http://localhost:3000/products';

  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseurl);
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.baseurl}/${id}`);
  }

  createProduct(formData: FormData): Observable<Product> {
    return this.http.post<Product>(this.baseurl, formData);
  }

  updateProduct(id: number, formData: FormData): Observable<Product> {
    return this.http.put<Product>(`${this.baseurl}/${id}`, formData);
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseurl}/${id}`);
  }

  getImageUrl(): Observable<string> {
    return this.http.get<string>(this.baseurl);
  }
}