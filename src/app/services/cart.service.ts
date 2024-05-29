import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Product, Promotion } from './product.service';

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
  product?:Product;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {}

  getCarts(): Observable<Cart[]> {
    return this.http.get<Cart[]>(`${this.apiUrl}/cart`);
  }

  getCartByUserId(userId: number): Observable<Cart[]>  {
    return this.http.get<Cart[]>(`${this.apiUrl}/cart/${userId}`);
  }

  createCart(userId: number): Observable<Cart> {
    const newCart = { user_id: userId, created_at: new Date().toISOString(), updated_at: new Date().toISOString() };
    return this.http.post<Cart>(`${this.apiUrl}/cart`, newCart);
  }

  getCartItems(cartid :number): Observable<CartItem[]> {
    console.log(`${this.apiUrl}/cart-items/${cartid}`)
    return this.http.get<CartItem[]>(`${this.apiUrl}/cart-items/${cartid}`);
  }

 createCartItem(cartItem: CartItem): Observable<CartItem> {
    return this.http.post<CartItem>(`${this.apiUrl}/cart-items`, cartItem);
  }

  deleteCartItem(cartItemId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/cart-items/${cartItemId}`);
  }
  deleteCartItems(): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/cart-items/`);
  }

 
}
