import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService, Product } from '../../../../services/product.service';
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
  product: Product = new Product(0, "", "", 0, "", "", "");

  constructor(
    private productService: ProductService,
    private router: Router
  ) {}

  addProduct(): void {
    const formData = new FormData();
    // formData.append('id',this.product.id)
    formData.append('title', this.product.title);
    formData.append('price', this.product.price.toString());
    formData.append('details', this.product.details);
    formData.append('image', this.product.image);


    this.productService.createProduct(formData)
      .subscribe(createdProduct => {
        this.product = createdProduct;
        this.router.navigate(['/products']);
      });
  }

  onImgSelected(event: any): void {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.product.image = file;
    }
  }
}
