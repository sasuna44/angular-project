import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { faPlus  } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import Swiper from 'swiper';
import { Router, RouterLink } from '@angular/router';
import { Product, ProductService } from '../../../services/product.service';
import { Subscription, pipe } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [FontAwesomeModule, RouterLink, CommonModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})

export class ProductsComponent implements AfterViewInit , OnInit , OnDestroy {
  constructor(private router: Router , private productService :ProductService) {}
  products: Product[] = []; 
  sub:Subscription|null = null;
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
    this.sub = this.productService.getProducts().subscribe(prodcuts => this.products = prodcuts);

  }

  ngOnDestroy(): void {
    if(this.sub){
      this.sub.unsubscribe();
    }
  }

  faPlus  = faPlus ;

  goToProduct(id:number): void {
    this.router.navigate(['product/detail/',id]);
  }
}
