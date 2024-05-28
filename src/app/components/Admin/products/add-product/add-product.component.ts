import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService, Product } from '../../../../services/product.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Loginservice } from '../../../../services/Login.service';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  token: string | null = null;
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

  constructor(
    private productService: ProductService,
    private router: Router,
    private Loginservice: Loginservice
  ) {}

  ngOnInit(): void {
    this.token = this.Loginservice.getTokenFromLocalStorage();
    console.log(this.token);
  }

  addProduct(): void {
    if (!this.token) {
      console.error('No token found. Cannot create product.');
      return;
    }

    const formData = new FormData();
    formData.append('title', this.product.title);
    formData.append('price', this.product.price.toString());
    formData.append('details', this.product.details);

    if (this.isFile(this.product.image)) {
      formData.append('image', this.product.image);
    }

    this.productService.createProduct(formData, this.token).subscribe(
      createdProduct => {
        this.router.navigate(['admin/products']);
      },
      error => {
        console.error('Error creating product:', error);
        // Show error message to the user
      }
    );
  }

  onImgSelected(event: any): void {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.product.image = file;
    }
  }

  private isFile(value: any): value is File {
    return value instanceof File;
  }
}
