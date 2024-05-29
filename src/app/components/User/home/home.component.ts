import { Component, OnInit } from '@angular/core';
import { ProductsComponent } from '../products/products.component';
import { ProductListComponent } from '../product-list/product-list.component';
import { CartService } from '../../../services/cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProductsComponent , ProductListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  user_id: number | null = localStorage.getItem('id') ? parseInt(localStorage.getItem('id')!, 10) : null;  
  sub:Subscription | null = null;

  ngOnInit(): void {
  }

}
