import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CartItem, CartService, } from '../../../services/cart.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'; 
import { Subscription } from 'rxjs';
import { OrderComponent } from '../order/order.component';
import { Product } from '../../../services/product.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterLink, CommonModule, FontAwesomeModule, OrderComponent],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {
  faTrashAlt = faTrashAlt;
  sub: Subscription | null = null;
  cartId: number = 1;
  cart: CartItem[] = [];

  constructor(private activatedRoute: ActivatedRoute, private cartService: CartService) {}

  ngOnInit(): void {
    this.sub = this.cartService.getCartById(this.cartId).subscribe(data => {
      this.cart = data.items.map(item => ({ ...item, cartId: this.cartId }));    
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  removeFromCart(cartId: number, productId: number): void {
    if (this.cart) {
      this.cart = this.cart.filter(item => item.product_id !== productId);
      
      this.cartService.deleteCartItem(cartId, productId).subscribe({
        next: () => {
          console.log('this item has been deleted .');
        },
        error: (err) => {
          console.error('there is error in delteting item:', err);
        }
      });
    }
  }
}