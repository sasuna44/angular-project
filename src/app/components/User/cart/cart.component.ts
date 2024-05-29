import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Cart, CartItem, CartService, } from '../../../services/cart.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'; 
import { Subscription } from 'rxjs';
import { OrderComponent } from '../order/order.component';
import { Product } from '../../../services/product.service';
import { Order, OrderItem, OrderService ,productOrder } from '../../../services/order.service';

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
  order_id  :number = 0;
  orderProducts :productOrder[] =  [];
  OrderItems:OrderItem[] = [];
  constructor(private activatedRoute: ActivatedRoute, private cartService: CartService , private orderService :OrderService)   {}

  ngOnInit(): void {

    this.sub = 
      this.cartService.getCartByUserId(this.user_id).subscribe(items =>{
        this.sub = this.cartService.getCartItems(this.cart_id).subscribe(items => {
          this.cart = items;
          
          this.orderProducts = items.map(item => {
            let price = 0;
            if (item.product) {
              price = item.product.price;
            }
            return {
              product_id: item.product_id,
              quantity: item.quantity,
              price: price
            };
          });
          console.log(this.orderProducts);

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
        if (item.product?.price) {
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
      this.order_id  = order.id;
      this.orderProducts.forEach(orderproduct => {
        let item : OrderItem = {
          id:0,
          order_id: this.order_id,
          product_id: orderproduct.product_id,
          quantity: orderproduct.quantity,
          price: orderproduct.price,
          created_at: "",
          updated_at: ""
        };
        this.OrderItems.push(item);
      });

      this.OrderItems.forEach(item => {
        console.log("sendddddddddddd",item);
        this.orderService.createOrderItem(item).subscribe((data) => {
        });
      });


      this.cartService.deleteCartItems().subscribe(() => {
        this.cart = [];
        this.totalPrice = 0;
        console.log('Cart cleared after placing order.');
      });


    })

    

    
  }
}
}

  