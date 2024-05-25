import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export class Product {
    constructor(
        public id: number,
        public title: string,
        public image: string,
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
    private apiUrl = 'http://localhost:8000/products'; 

    constructor(private http: HttpClient) {}

    getProducts(): Observable<Product[]> {
        return this.http.get<Product[]>(this.apiUrl);
    }

    getProductById(id: number): Observable<Product> {
        return this.http.get<Product>(`${this.apiUrl}/${id}`);
    }

    updateProduct(id: number, formData: FormData): Observable<any> {
        return this.http.put(`${this.apiUrl}/${id}`, formData);
    }
    
    addProduct(productData: FormData): Observable<any> {
        return this.http.post<any>(this.apiUrl, productData);
    }

    deleteProduct(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}
