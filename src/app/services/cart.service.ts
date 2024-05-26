import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Product } from './product.service';

export interface CartItem {
  products: Product;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: CartItem[] = [];
  private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);
  cartData$ = this.cartItemsSubject.asObservable();

  addToCart(cartItem: CartItem) {
    const existingItem = this.cartItems.find(item => item.products.id === cartItem.products.id);
    if (existingItem) {
      existingItem.quantity += cartItem.quantity;
    } else {
      this.cartItems.push({ ...cartItem, quantity: 1 });
    }
    this.cartItemsSubject.next(this.cartItems);
  }

 

  
}
