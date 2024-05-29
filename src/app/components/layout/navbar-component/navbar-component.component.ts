import { Component, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSignInAlt, faHeart, faShoppingCart, faUserPlus, faTachometerAlt } from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService, Product } from '../../../services/product.service'; 
import { RouterLink } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { ProfileService } from '../../../services/Profile.service';
import { Loginservice } from '../../../services/Login.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule, FormsModule,RouterLink,RouterOutlet],
  templateUrl: './navbar-component.component.html',
  styleUrls: ['./navbar-component.component.css']
})

export class NavbarComponent implements OnInit {

  faSignInAlt = faSignInAlt;
  faSignOutAlt = faSignOutAlt;
  faHeart = faHeart;
  faShoppingCart = faShoppingCart;
  faUserPlus = faUserPlus;
  faTachometerAlt = faTachometerAlt;

  products: Product[] = [];
  filteredProducts: Product[] = [];
  isLoggedIn: boolean = false; 
  isAdmin: boolean = false;

  constructor(private productService: ProductService, private router: Router,private profileService: ProfileService ,  private Loginservice: Loginservice) {} 

  ngOnInit(): void {
    this.productService.getProducts().subscribe((data: Product[]) => {
      this.products = data;
      this.filteredProducts = data;
      this.isLoggedIn = !!localStorage.getItem('userData');
      this.isAdmin = this.Loginservice.isAdmin();
    });
  }
  
  logout(): void {
    this.router.navigate(['']);
    this.isLoggedIn = true;
    this.profileService.removeTokenFromLocalStorage();
    this.profileService.removeUserFromLocalStorage();

  }
  login(): void {
    this.isLoggedIn = false;
  }
}
