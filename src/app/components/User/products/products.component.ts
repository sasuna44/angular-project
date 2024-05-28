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
  constructor( private productService :ProductService , private cartService : CartService) {}
  products: Product[] = []; 
  private sub: Subscription = new Subscription();
    cart :Cart |null = null ;
  user_id :number = 2 ;
  cart_id = 1;
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
   this.cartFun(this.user_id);
  
  }

  ngOnDestroy(): void {
    if(this.sub){
      this.sub.unsubscribe();
    }
  }
  cartFun(user_id : number){
    // this.sub?.add(
    //   // this.cartService.getOrCreateCart(user_id).subscribe(cart =>{

    //   //   this.cart = cart ;
    //   //   this.cartItems(cart.id)
    //   // }))
  }
  cartItems(cartId : number){
    this.sub?.add(
      this.cartService.getCartItems(cartId).subscribe(items =>{
        console.log(items);
      })
    )
  }
  addItemToCart(product: Product, quantity: number = 1): void {
    // if (this.cart) {
    //   const cartItem: CartItem = {
    //     cart_id: this.cart.id,
    //     product_id: product.id,
    //     title: product.title,
    //     image: product.image,
    //     details: product.details,
    //     price: product.price,
    //     quantity: quantity,
    //     promotion : product?.promotion
    //   };
    //   this.sub?.add(
    //     this.cartService.addCartItem(cartItem).subscribe(() => {
    //       this.cartItems(this.cart!.id);
    //     })
    //   );
    // }
  }

  removeItemFromCart(cartItemId: number): void {
  //   this.sub?.add(
  //     this.cartService.deleteCartItem(cartItemId).subscribe(() => {
  //       this.cartItems = this.cartItems.filter(item => item.id !== cartItemId); 
      
  //     })
  //   );
  // }
  }
}