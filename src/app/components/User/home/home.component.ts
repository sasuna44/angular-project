import { Component, OnInit } from '@angular/core';
import { ProductsComponent } from '../products/products.component';
import { ProductListComponent } from '../product-list/product-list.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProductsComponent , ProductListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  user_id = localStorage.getItem('id');

  ngOnInit(): void {
    if(this.user_id  == null ){
      this.user_id = null ;
    }
    console.log( 'id' , this.user_id);
    console.log(localStorage.getItem('user_id'));
  }

}
