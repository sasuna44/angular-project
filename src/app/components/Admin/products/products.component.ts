import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductService, Product } from '../../../services/product.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';

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
  selectedProduct: Product | null = null;
  sub: Subscription | null = null;

  constructor(private productService: ProductService, private router: Router) {}

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.sub = this.productService.getAllProducts().subscribe(
      (data: Product[]) => {
        this.products = data;
        this.filteredProducts = data;
        console.log('Products loaded:', this.products);
      },
      (error) => {
        console.error('Error fetching products', error);
      }
    );
  }

  filterProducts(event: Event): void {
    const target = event.target as HTMLInputElement;
    const searchTerm = target.value;

    if (searchTerm) {
      this.filteredProducts = this.products.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else {
      this.filteredProducts = this.products;
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
          this.filterProducts(new Event('input'));
          console.log(`Product with id ${id} deleted successfully`);
        },
        (error) => {
          console.error('Error deleting product', error);
        }
      );
    }
  }

  onFileSelected(event: any): void {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e: any) => {
        if (this.selectedProduct) {
          this.selectedProduct.image = file;
        }
      };
      reader.readAsDataURL(file);
    }
  }

  saveProduct(form: NgForm): void {
    if (form.invalid) {
      return;
    }
    if (this.selectedProduct) {
      const formData = new FormData();
      formData.append('title', this.selectedProduct.title);
      formData.append('price', this.selectedProduct.price.toString());
      formData.append('details', this.selectedProduct.details);

      if (this.selectedProduct.image instanceof File) {
        formData.append('image', this.selectedProduct.image);
      } else {
        formData.append('image', this.selectedProduct.image as string);
      }

      this.productService.updateProduct(this.selectedProduct.id, formData).subscribe(
        () => {
          console.log('Product updated successfully');
          this.loadProducts();
          // Navigate back to products list or show success message
        },
        (error) => {
          console.error('Error updating product:', error);
          // Show error message
        }
      );
    }
  }
}
