import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

export interface Promotion {
    product: number;
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
    promotion:{
        id:number,
        discount_percentage:number,
        start_date:string,
        end_date:string
    }
}

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    private apiUrl = 'http://localhost:3000/products'; 

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
