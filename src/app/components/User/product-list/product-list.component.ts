import { AfterViewInit, Component } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import Swiper from 'swiper';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [FontAwesomeModule, RouterLink , CommonModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {
  constructor(private router: Router) {
    this.filteredProducts = this.products;
  }
  products = [
    {
      id: 1,
      tag: 'Promotion',
      title: "sara",
      images: ['https://cdn.shopify.com/s/files/1/0341/3458/9485/products/FB_POSTHOL22_T2PRODUCT_CONCRETE_FENTY_ICON_VELVET_LIQUID_LIP_OPEN_MVP_1200x1500_ea016da9-a316-4f2b-8afd-9d822277a907.jpg?v=1669934439'],
      details: 'The Ordinary Niacinamide 10% And Zinc 1% Clear 30ml',
      price: 450
    },
    {
      id: 2,
      tag: 'Promotion',
      title: "the magdi",
      images: ['https://cdn.shopify.com/s/files/1/0341/3458/9485/products/FB_POSTHOL22_T2PRODUCT_CONCRETE_FENTY_ICON_VELVET_LIQUID_LIP_OPEN_MVP_1200x1500_ea016da9-a316-4f2b-8afd-9d822277a907.jpg?v=1669934439'],
      details: 'The Ordinary Niacinamide 10% And Zinc 1% Clear 30ml',
      price: 450
    },
    {
      id: 3,
      tag: 'Promotion',
      title: "ww",
      images: ['https://cdn.shopify.com/s/files/1/0341/3458/9485/products/FB_POSTHOL22_T2PRODUCT_CONCRETE_FENTY_ICON_VELVET_LIQUID_LIP_OPEN_MVP_1200x1500_ea016da9-a316-4f2b-8afd-9d822277a907.jpg?v=1669934439'],
      details: 'The Ordinary Niacinamide 10% And Zinc 1% Clear 30ml',
      price: 450
    },
    {
      id: 4,
      tag: 'Promotion',
      title: "www",
      images: ['https://cdn.shopify.com/s/files/1/0341/3458/9485/products/FB_POSTHOL22_T2PRODUCT_CONCRETE_FENTY_ICON_VELVET_LIQUID_LIP_OPEN_MVP_1200x1500_ea016da9-a316-4f2b-8afd-9d822277a907.jpg?v=1669934439'],
      details: 'The Ordinary Niacinamide 10% And Zinc 1% Clear 30ml',
      price: 450
    },
  ];
  goToProduct(id:number): void {
    this.router.navigate(['product/detail/',id]);
  }
  faPlus= faPlus;
  filteredProducts : any[] =[]; 
  filterName(event:string){
    const Products = this.products.filter(product => product.title.includes(event));
      this.filteredProducts = Products;    
  }
  
}
