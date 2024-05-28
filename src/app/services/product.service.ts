import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

export interface Promotion {
    id: number;
    discount_percentage: number;
    start_date: string;
    end_date: string;
}
export interface Product {
    id: number;
    title: string;
    image: string;
    price: number;
    details: string;
    created_at: string;
    updated_at: string;
    quantity:number;
    promotion?:Promotion
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseurl = 'http://127.0.0.1:8000/api/products';
 
  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseurl);
  }
  
  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.baseurl}/${id}`);
  }

  createProduct(formData: FormData,token: string): Observable<Product> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<Product>(this.baseurl, formData,{ headers });
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
