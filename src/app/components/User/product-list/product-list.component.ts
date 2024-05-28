import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CartService, } from '../../../services/cart.service';
import { Product, ProductService } from '../../../services/product.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [RouterLink , CommonModule],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit , OnDestroy {
  products: Product[] = []; 
  sub:Subscription|null = null;
  // filteredProducts:Product[] = [];
  user_id = localStorage.getItem('id');

  constructor( private cartService: CartService , private productService :ProductService) {
  }
  ngOnInit(): void {
    this.sub = this.productService.getProducts().subscribe(
      (response: any) => {
         if (response.data && Array.isArray(response.data)) {
          this.products = response.data;
          console.log(this.products);
        } 
    
      }
    );
  }
 
  
  ngOnDestroy(): void {
      this.sub?.unsubscribe();
  }


 

  // filterName(event: string) {
  //   this.filteredProducts = this.products.filter(product => product.title.includes(event));
  // }

 
}
