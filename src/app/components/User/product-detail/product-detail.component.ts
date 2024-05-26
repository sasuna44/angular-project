import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import Swiper from 'swiper';
import { Subscription } from 'rxjs';
import { Product, ProductService } from '../../../services/product.service';
@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit  , OnDestroy{
  
  faHeart = faHeart;
  sub:Subscription|null = null;
  product:Product |null = null;
  constructor(private activeRoute: ActivatedRoute , private productService : ProductService) { }

  ngOnInit(): void {
    this.sub = this.activeRoute.params.subscribe(params => {
      this.productService.getProductById(params['id']);
   });
  }
  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
  

}
