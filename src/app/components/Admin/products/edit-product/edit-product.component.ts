import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
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
  selectedFile: File | null = null;
  errorMessage: string | null = null;
  file: any;
  fileData: any;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.productService.getProductById(+productId).subscribe(
        (response: any) => {
          if (response.status === 'success') {
            this.product = response.data;
            this.fileData = this.product.image; // تعيين رابط الصورة إلى fileData
            console.log(this.product); // تحقق من أن البيانات تم جلبها بشكل صحيح
          } else {
            console.error('Error fetching product', response);
          }
        },
        (error) => {
          console.error('Error fetching product:', error);
        }
      );
    }
  }


  onSubmit(productForm: NgForm): void {
    if (productForm.invalid) {
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

    console.log('Form Data:', {
      id: this.product.id,
      title: this.product.title,
      price: this.product.price,
      details: this.product.details,
      image: this.selectedFile ? this.selectedFile.name : 'No image selected'
    });

    this.productService.updateProduct(this.product.id, formData).subscribe(
      (response) => {
        console.log('Product updated successfully:', response);
        this.router.navigate(['admin/products']);
      },
      (error) => {
        console.error('Error updating product:', error);
        console.error('Error details:', error.error);
        this.errorMessage = error.error.message || 'Failed to update product. Please try again.';
      }
    );
  }

 onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      this.selectedFile = file;
      this.errorMessage = null;
      this.readFile(file); // تحديث fileData لعرض الصورة الجديدة
    } else {
      this.selectedFile = null;
      this.errorMessage = 'Please select a valid image file.';
    }
  }

  readFile(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      this.fileData = reader.result;
    };
    reader.readAsDataURL(file);
  }

}
