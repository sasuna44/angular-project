import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartService, CartItem } from '../../../services/cart.service';
import { Product, ProductService } from '../../../services/product.service';
import { Subscription, subscribeOn } from 'rxjs';
import { ProductsComponent } from '../products/products.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit , OnDestroy {
  products: Product[] = []; 
  sub:Subscription|null = null;
  filteredProducts:Product[] = [];
  constructor( private cartService: CartService , private productservice :ProductService) {
  }
  ngOnInit(): void {
      this.sub = this.productservice.getProducts().subscribe(prodcuts => this.products = prodcuts);
  }
  
  ngOnDestroy(): void {
      this.sub?.unsubscribe();
  }


 

  filterName(event: string) {
    this.filteredProducts = this.products.filter(product => product.title.includes(event));
  }

 
}
