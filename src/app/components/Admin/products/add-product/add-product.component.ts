import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProductService, Product } from '../../../../services/product.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {
  product: Product = {
    id: 0,
    title: '',
    image: '',
    price: 0,
    details: '',
    created_at: '',
    updated_at: '',
    quantity: 0,
    promotion: undefined
  };
  selectedFile: File | null = null;
  errorMessage: string | null = null;
  token: string = '';

  constructor(private productService: ProductService, private router: Router) {
    this.token = localStorage.getItem('token') || '';
  }

  onSubmit(productForm: NgForm): void {
    if (productForm.invalid || !this.selectedFile) {
      this.errorMessage = 'Please fill out the form correctly.';
      return;
    }

    const formData = new FormData();
    formData.append('title', this.product.title);
    formData.append('price', this.product.price.toString());
    formData.append('details', this.product.details);

    if (this.selectedFile) {
      formData.append('image', this.selectedFile, this.selectedFile.name);
    }

    this.productService.createProduct(formData, 'Bearer ' + this.token).subscribe(
      (response) => {
        console.log('Product created successfully:', response);
        this.router.navigate(['admin/products']);
      },
      (error) => {
        console.error('Error creating product:', error);
        this.errorMessage = 'Failed to create product. Please try again.';
      }
    );
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      this.selectedFile = file;
      this.errorMessage = null;
    } else {
      this.selectedFile = null;
      this.errorMessage = 'Please select a valid image file.';
    }
  }
}
