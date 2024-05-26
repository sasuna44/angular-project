import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';
import { CartService, CartItem } from '../../../services/cart.service';
import { Product, ProductService } from '../../../services/product.service';
import { Subscription, subscribeOn } from 'rxjs';
import { ProductsComponent } from '../products/products.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit , OnDestroy {
  faPlus = faPlus;
  products: Product[] = []; 
  sub:Subscription|null = null;
  filteredProducts:Product[] = [];
  constructor(private router: Router, private cartService: CartService , private productservice :ProductService) {
  }
  ngOnInit(): void {
      this.sub = this.productservice.getProducts().subscribe(prodcuts => this.products = prodcuts);
  }
  
  ngOnDestroy(): void {
      this.sub?.unsubscribe();
  }

    goToProduct(id:number){

    }
 

  filterName(event: string) {
    this.filteredProducts = this.products.filter(product => product.title.includes(event));
  }

  addProductToCart(product: Product) {
    const cartItem: CartItem = { products: product, quantity: 1 };
    this.cartService.addToCart(cartItem);
  }
}
