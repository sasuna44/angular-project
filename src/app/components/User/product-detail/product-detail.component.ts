import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product, ProductService } from '../../../services/product.service';
import { CartService, CartItem } from '../../../services/cart.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  sub: Subscription | null = null;
  product: Product = {
    id: 0,
    title: '',
    image: '',
    price: 0,
    details: '',
    created_at: '',
    updated_at: '',
    quantity: 0,
    promotion: undefined
  };
  quantities: number[] = [];
  cart_id: number = parseInt(localStorage.getItem('cart_id')!, 10);
  user_id: number = parseInt(localStorage.getItem('id')!, 10);

  constructor(
    private activeRoute: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.sub = this.activeRoute.params.subscribe(params => {
      this.productService.getProductById(params['id']).subscribe((response: any) => {
        this.product = response.data;
        console.log("Product info:", response.data);
      });
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  addToCart(product: Product): void {
    if (this.cart_id && this.product) {
      const cartItem: CartItem = {
        id: 0, 
        cart_id: this.cart_id,
        product_id: product.id,
        quantity: 1, 
        product: product 
      };

      this.cartService.createCartItem(cartItem).subscribe(response => {
        console.log('Item added to cart:', response);
      }, error => {
        console.error('Error adding item to cart:', error);
      });
    }
  }
}
