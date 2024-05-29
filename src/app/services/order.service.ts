import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from './product.service';

export interface Order {
    id: number;
    user_id : number;
    total_price: number;
    status: 'accepted' | 'pending' | 'rejected';

 }
 export interface OrderItem {
    id: number;
    order_id: number;
    product_id: number;
    quantity: number;
    price: number;
    created_at: string;
    updated_at: string;
    product?: Product;
}

export interface productOrder{
    product_id: number;
    quantity: number;
    price: number;
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

    createOrder(order: Order): Observable<Order> {
        return this.http.post<Order>(`${this.apiUrl}/order`, order);
    }
    createOrderItem(orderItem: OrderItem ): Observable<OrderItem> {
        return this.http.post<OrderItem>(`${this.apiUrl}/order-items`, orderItem);
      }

    getDetailedOrders(): Observable<Order[]> {
        return this.http.get<Order[]>(`${this.apiUrl}/orders-with-details`);
    }
    getOrderById(id: number): Observable<Order> {
        return this.http.get<Order>(`${this.apiUrl}/order/${id}`);
    }
    getOrderItems(id: number): Observable<OrderItem[]> {
        console.log(`${this.apiUrl}/order-items/${id}`)
        return this.http.get<OrderItem[]>(`${this.apiUrl}/order-items/${id}`);   
     }
     deleteOrderItem(id:number):Observable<OrderItem[]>{
        console.log(`${this.apiUrl}/order-items/${id}`)
        return this.http.delete<OrderItem[]>(`${this.apiUrl}/order-items/${id}`);   

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
