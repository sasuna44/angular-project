import { Component } from '@angular/core';
import { ProductsComponent } from '../products/products.component';
import { ProductListComponent } from '../product-list/product-list.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProductsComponent , ProductListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  
}
