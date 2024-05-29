import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Order {
    id: number;
    user_id: number;
    username: string;
    date: string;
    img: string;
    total_price: number;
    status: 'pending' | 'accepted' | 'rejected';
    products: {
        id: number;
        title: string;
        price: number;
        quantity: number;
    }[];
}

@Injectable({
    providedIn: 'root'
})
export class OrderAdminService {
    private apiUrl = 'http://127.0.0.1:8000/api';

    constructor(private http: HttpClient) {}

    getOrders(): Observable<Order[]> {
        return this.http.get<Order[]>(`${this.apiUrl}/order`);
    }

    getDetailedOrders(): Observable<Order[]> {
        return this.http.get<Order[]>(`${this.apiUrl}/orders-with-details`);
    }

    updateOrderStatus(id: number, status: 'accepted' | 'rejected'): Observable<any> {
        return this.http.put(`${this.apiUrl}/orders/update-with-items/${id}`, { status });
    }


    updateOrderWithItems(id: number, orderData: any): Observable<Order> {
        return this.http.put<Order>(`${this.apiUrl}/orders/update-with-items/${id}`, orderData);
    }
}
