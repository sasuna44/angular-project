import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from './product.service';

export interface Cart {
  id: number;
  user_id: number;
  created_at: string;
  updated_at: string;
}
export interface CartItem {
  id: number;
  cart_id: number;
  product_id: number;
  quantity: number;
}


@Injectable({
  providedIn: 'root'
})
export class CartService {
  
  private apiUrl = 'http://localhost:3001/carts'; 

  constructor(private http: HttpClient) {}
  getCarts(): Observable<Cart[]> {
    return this.http.get<Cart[]>(`${this.apiUrl}/cart`);
  }

  getCartById(id: number): Observable<Cart> {
    return this.http.get<Cart>(`${this.apiUrl}/cart/${id}`);
  }

  getCartItems(cartId: number): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(`${this.apiUrl}/cart/${cartId}/items`);
  }

  addCartItem(cartItem: CartItem): Observable<CartItem> {
    return this.http.post<CartItem>(`${this.apiUrl}/cartItem`, cartItem);
  }

  updateCartItem(cartItemId: number, cartItem: Partial<CartItem>): Observable<CartItem> {
    return this.http.put<CartItem>(`${this.apiUrl}/cartItem/${cartItemId}`, cartItem);
  }

  deleteCartItem(cartItemId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/cartItem/${cartItemId}`);
  }
}