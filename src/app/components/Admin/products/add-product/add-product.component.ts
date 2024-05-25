import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../../../../services/product.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';  // Ensure this is imported

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  addProductForm: FormGroup;
  imageFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private productService: ProductService
  ) {
    this.addProductForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      image: [null, Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      details: ['', Validators.maxLength(500)]
    });
  }

  ngOnInit(): void {}

  onFileChange(event: any): void {
    if (event.target.files.length > 0) {
      this.imageFile = event.target.files[0];
      this.addProductForm.patchValue({
        image: this.imageFile
      });
      this.addProductForm.get('image')!.updateValueAndValidity();
    }
  }

  onSubmit(): void {
    if (this.addProductForm.valid) {
      const formData = new FormData();
      formData.append('title', this.addProductForm.get('title')!.value);
      formData.append('price', this.addProductForm.get('price')!.value.toString());
      formData.append('details', this.addProductForm.get('details')!.value);

      if (this.imageFile) {
        formData.append('image', this.imageFile);
      }

      console.log('Form Data:', formData); 

      this.productService.addProduct(formData).subscribe(
        () => {
          this.router.navigate(['/products']);
        },
        (error: HttpErrorResponse) => {
          console.error('Error adding product', error);
          alert(`Error adding product: ${error.message}`);
        }
      );
    }
  }
}
