import { Component, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSignInAlt, faHeart, faShoppingCart, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService, Product } from '../../../services/product.service'; 
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule, FormsModule,RouterLink],
  templateUrl: './navbar-component.component.html',
  styleUrls: ['./navbar-component.component.css']
})
export class NavbarComponent implements OnInit {
  faSignInAlt = faSignInAlt;
  faHeart = faHeart;
  faShoppingCart = faShoppingCart;
  faUserPlus = faUserPlus;

  products: Product[] = [];
  filteredProducts: Product[] = [];

  constructor(private productService: ProductService ) {}

  ngOnInit(): void {
    this.productService. getProducts().subscribe((data: Product[]) => {
      this.products = data;
      this.filteredProducts = data;
    });
  }
  
 

 
}
