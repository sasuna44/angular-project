import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CartItem, CartService, } from '../../../services/cart.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'; 
import { Subscription } from 'rxjs';
import { OrderComponent } from '../order/order.component';
import { Product } from '../../../services/product.service';
import { Order, OrderService } from '../../../services/order.service';

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
  cartId: number = 0;
  user_id: number  = 0;
  cart: CartItem[] = [];
  order:Order |null = null;

  constructor(private activatedRoute: ActivatedRoute, private cartService: CartService , private orderService :OrderService)   {}

  ngOnInit(): void {
    const storedUserId = localStorage.getItem('user_id');
    if (storedUserId) {
      this.user_id = parseInt(storedUserId, 10); 
    }
    console.log(this.user_id);
    console.log(storedUserId);
    this.sub = 
      this.cartService.getCartByUserId(this.user_id).subscribe(items =>{
        // console.log(items);
        this.cartId = items[0].id;
        this.sub = this.cartService.getCartItems(this.cartId).subscribe(items => {
          console.log(this,this.cartId);
          console.log(items);
          this.cart = items;
        });
      })
      // this.sub = this.orderService.createOrder(order).subscribe(data => {
      //   console.log(data);
      // } 
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  removeFromCart(cartId: number, productId: number): void {
    if (this.cart) {
      this.cart = this.cart.filter(item => item.product_id !== productId);
      
      this.cartService.deleteCartItem(cartId).subscribe({
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