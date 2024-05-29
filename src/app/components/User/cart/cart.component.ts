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
  cart_id: any = localStorage.getItem('cart_id') ;    
  user_id: number  =  parseInt(localStorage.getItem('id')!, 10) ;  
  cart: any[] = [];
  order:Order |null = null;

  constructor(private activatedRoute: ActivatedRoute, private cartService: CartService , private orderService :OrderService)   {}

  ngOnInit(): void {

    this.sub = 
      this.cartService.getCartByUserId(this.user_id).subscribe(items =>{
        this.sub = this.cartService.getCartItems(this.cart_id).subscribe(items => {
          console.log("the items", items[0]);
          this.cart = items;
        });
      })
      // this.sub = this.orderService.(order).subscribe(data => {
      //   console.log(data);
      // } 
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  removeFromCart(cartItemId: number): void {
    this.cartService.deleteCartItem(cartItemId).subscribe({
      next: () => {
        this.cart = this.cart.filter(item => item.id !== cartItemId);
        console.log('Item has been deleted.');
      },
      error: (err) => {
        console.error('Error deleting item:', err);
      }
    });
  }
}