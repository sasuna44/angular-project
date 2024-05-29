import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Cart, CartItem, CartService, } from '../../../services/cart.service';
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
  sub: Subscription | null = null;
  cart_id: any = localStorage.getItem('cart_id') ;    
  user_id: number  =  parseInt(localStorage.getItem('id')!, 10) ;  
  cart: CartItem[] = [];
  order:Order |null = null;
  totalPrice :number = 0 ;

  constructor(private activatedRoute: ActivatedRoute, private cartService: CartService , private orderService :OrderService)   {}

  ngOnInit(): void {

    this.sub = 
      this.cartService.getCartByUserId(this.user_id).subscribe(items =>{
        this.sub = this.cartService.getCartItems(this.cart_id).subscribe(items => {
          this.cart = items;
          // items.forEach(item => {
          //   this.sub = this.orderService.createOrderItem(item).subscribe(data=>{
          //     console.log(data);
          //   })
          // });
      
          console.log(this.cart);

         
          this.calculateTotalPrice();
        });
      })

    } 

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  calculateTotalPrice(): void {
    this.cart.forEach(item => {
        if (item.product ) {
            item.product.price = item.product.price * item.quantity;
            console.log(item.product.price);
        }
    });

    this.totalPrice = this.cart.reduce((total, item) => {
        if (item.product) {
            return total + (item.product.price * item.quantity);
        }
        return total;
    }, 0);
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
  faTrashAlt = faTrashAlt;
  placeOrder():void{
    if (this.cart && this.user_id) {
      const orderData :Order = {
        id:0,
        user_id: this.user_id,
        total_price: this.totalPrice,
        status: 'pending'
      };
    this.orderService.createOrder(orderData).subscribe(order =>{
      this.order = order;
      console.log(this.order);

    })
    //send the cartitems to order items
    this.cartService.deleteCartItems(this.cart_id).subscribe(cart =>{
      console.log(cart);
    })
  }
  }
}
