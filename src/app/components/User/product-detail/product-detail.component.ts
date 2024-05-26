import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

import Swiper from 'swiper';
import { Subscription } from 'rxjs';
import { Product, ProductService } from '../../../services/product.service';
@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit  , OnDestroy{
  
  sub:Subscription|null = null;
  product:Product |null = null;
  quantities:number [] = [];
  constructor(private activeRoute: ActivatedRoute , private productService : ProductService) { }

  ngOnInit(): void {
    this.sub = this.activeRoute.params.subscribe(params => {

      this.productService.getProductById(params['id']).subscribe(data => {
        this.product = data; 
        this.quantities = Array.from({length: data.quantity},(_, i) => i + 1);
      });
    });
  }
  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
 
}
