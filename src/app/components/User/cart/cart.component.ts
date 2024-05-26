import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../services/cart.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faRemove } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterLink, CommonModule ,FontAwesomeModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartService.cartData$.subscribe(items => {
      this.cartItems = items;
    });
  }
  faremove=faRemove;
  removeFromCart(productId: number) {
    this.cartItems = this.cartItems.filter(item => item.products.id !== productId);
  }
}
