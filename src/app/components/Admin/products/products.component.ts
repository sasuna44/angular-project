import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductService, Product } from '../../../services/product.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, RouterLink } from '@angular/router';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule, RouterLink, RouterModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  sub: Subscription | null = null;

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  loadProducts(): void {
    this.sub = this.productService.getProducts().subscribe(
      (response: any) => {
        console.log('API response:', response); // Log the full response
        // Check if the response is an array or has a data property that is an array
        if (Array.isArray(response)) {
          this.products = response;
        } else if (response.data && Array.isArray(response.data)) {
          this.products = response.data;
        } else {
          console.error('Unexpected API response format:', response);
        }
        this.filteredProducts = [...this.products]; // Use spread operator to ensure a new array reference
        console.log('Products loaded:', this.products); // Check the data here
      },
      (error) => {
        console.error('Error fetching products', error);
      }
    );
  }

  filterProducts(event?: Event): void {
    const searchTerm = event ? (event.target as HTMLInputElement).value.toLowerCase() : '';
  
    if (searchTerm) {
      this.filteredProducts = this.products.filter(product =>
        product.title.toLowerCase().includes(searchTerm)
      );
    } else {
      this.filteredProducts = [...this.products];
    }
  }
  

  addProduct(): void {
    this.router.navigate(['/admin/add-product']);
  }

  viewProduct(id: number): void {
    this.router.navigate(['/admin/view-product', id]);
  }

  editProduct(id: number): void {
    this.router.navigate(['/admin/edit-product', id]);
  }

  deleteProduct(id: number): void {
  if (confirm('Are you sure you want to delete this product?')) {
    this.productService.deleteProduct(id).subscribe(
      () => {
        this.products = this.products.filter(product => product.id !== id);
        this.filterProducts();
        console.log(`Product with id ${id} deleted successfully`);
      },
      (error) => {
        console.error('Error deleting product', error);
      }
    );
  }
}

}
