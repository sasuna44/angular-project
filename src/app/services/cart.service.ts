import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product , Promotion } from './product.service'; 


export interface Cart {
  id: number;
  user_id: number;
  created_at: string;
  updated_at: string;
  items: CartItem[];
}

export interface CartItem {
  cart_id: number;
  product_id: number;
  title: string;
  image: string;
  details: string;
  price: number;
  quantity: number;
  promotion?: Promotion;
}
@Injectable({
  providedIn: 'root'
})
export class CartService {
  
  private apiUrl = 'http://localhost:3001/carts'; 

  constructor(private http: HttpClient) {}

  getCarts(): Observable<Cart[]> {
    return this.http.get<Cart[]>(`${this.apiUrl}`);
  }

  getCartById(id: number): Observable<Cart> {
    return this.http.get<Cart>(`${this.apiUrl}/${id}`);
  }


  addCartItem(cartItem: CartItem): Observable<CartItem> {
    return this.http.post<CartItem>(`${this.apiUrl}/items`, cartItem);
  }

  deleteCartItem(cartId: number, productId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${cartId}/items/${productId}`);
  }


  
}
