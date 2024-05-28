import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { faPlus  } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import Swiper from 'swiper';
import { Product, ProductService } from '../../../services/product.service';
import { Subscription, pipe } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Cart, CartItem, CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule , RouterLink],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})

export class ProductsComponent implements AfterViewInit , OnInit , OnDestroy {
  constructor( private productService :ProductService ) {}
  products: Product[] = []; 
  private sub: Subscription = new Subscription();
  ngAfterViewInit(): void {
    // const productsSwiper = new Swiper('.products-swiper', {
    //   pagination: {
    //     el: '.swiper-pagination',
    //   },
    //   autoplay: {
    //     delay: 1000,
    //     disableOnInteraction: false,
    //   },
    // });

    // const startBigDealSwiperAutoplay = () => {
    //   productsSwiper.autoplay.start();
    // };

    // const stopBigDealSwiperAutoplay = () => {
    //   productsSwiper.autoplay.stop();
    // };

    // const productsSwiperContainers = document.querySelectorAll('.products-swiper');
    // productsSwiperContainers.forEach(container => {
    //   container.addEventListener('mouseenter', startBigDealSwiperAutoplay);
    //   container.addEventListener('mouseleave', stopBigDealSwiperAutoplay);
    // });
  }
  ngOnInit(): void {
    this.sub = this.productService.getProducts().subscribe(
      (response: any) => {
          this.products = response.data;
          console.log(this.products);
        } 

    );
  
  }

  ngOnDestroy(): void {
    if(this.sub){
      this.sub.unsubscribe();
    }
  }
 

}