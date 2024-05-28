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
export class OrderService {
    private apiUrl = 'http://127.0.0.1:8000/api';

    constructor(private http: HttpClient) {}

    getOrders(): Observable<Order[]> {
        return this.http.get<Order[]>(`${this.apiUrl}/order`);
    }

    getDetailedOrders(): Observable<Order[]> {
        return this.http.get<Order[]>(`${this.apiUrl}/orders-with-details`);
    }

    getOrderById(id: number): Observable<Order> {
        return this.http.get<Order>(`${this.apiUrl}/order/${id}`);
    }
    getOrderItems(id: number): Observable<Order> {
        return this.http.get<Order>(`${this.apiUrl}/order-items/${id}`);
    }
// yara you will need to edit this part like the above /order for orders and /order-items for order-items 

    getOrdersByUserId(userId: number): Observable<Order[]> {
        return this.http.get<Order[]>(`${this.apiUrl}?user_id=${userId}`);
    }

    updateOrderStatus(id: number, status: 'accepted' | 'rejected'): Observable<any> {
        return this.http.put(`${this.apiUrl}/orders/update-with-items/${id}`, { status });
    }

    deleteOrder(id: number): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${id}`);
    }
    updateOrderWithItems(id: number, orderData: any): Observable<Order> {
        return this.http.put<Order>(`${this.apiUrl}/orders/update-with-items/${id}`, orderData);
    }
}
