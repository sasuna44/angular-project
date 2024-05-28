import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService, Product } from '../../../../services/product.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
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
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.productService.getProductById(+productId).subscribe(
        (response: any) => {
          if (response.status === 'success') {
            this.product = response.data;
          } else {
            console.error('Error fetching product', response);
          }
        },
        error => {
          console.error('Error fetching product', error);
        }
      );
    }
  }

  updateProduct(): void {
    const formData = new FormData();
    formData.append('title', this.product.title);
    formData.append('price', this.product.price.toString());
    formData.append('details', this.product.details);

    if (this.isFile(this.product.image)) {
      formData.append('image', this.product.image);
    }

    this.productService.updateProduct(this.product.id, formData).subscribe(
      updatedProduct => {
        this.router.navigate(['admin/products']);
      },
      error => {
        console.error('Error updating product:', error);
      }
    );
  }

  onImgSelected(event: any): void {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.product.image = file;
    }
  }

  isFile(value: any): value is File {
    return value instanceof File;
  }
}
