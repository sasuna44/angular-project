import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import Swiper from 'swiper';
@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule,FontAwesomeModule],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product_id: number; 
  product: any;
  faHeart = faHeart;

  constructor(private route: ActivatedRoute) { 
    this.product_id = 0; 
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.product_id = +params['id']; 
      this.getProduct();
    });
  }

  products = [
    {
      id: 1,
      tag: 'Promotion',
      title: "the Ordinary",
      images: ['https://cdn.shopify.com/s/files/1/0341/3458/9485/products/FB_POSTHOL22_T2PRODUCT_CONCRETE_FENTY_ICON_VELVET_LIQUID_LIP_OPEN_MVP_1200x1500_ea016da9-a316-4f2b-8afd-9d822277a907.jpg?v=1669934439','https://cdn.shopify.com/s/files/1/0341/3458/9485/products/FB_POSTHOL22_T2PRODUCT_CONCRETE_FENTY_ICON_VELVET_LIQUID_LIP_OPEN_MVP_1200x1500_ea016da9-a316-4f2b-8afd-9d822277a907.jpg?v=1669934439'],
      details: 'The Ordinary Niacinamide 10% And Zinc 1% Clear 30ml',
      price: 450
    },
    {
      id: 2,
      tag: 'Promotion',
      title: "the Ordinary",
      images: ['https://cdn.shopify.com/s/files/1/0341/3458/9485/products/FB_POSTHOL22_T2PRODUCT_CONCRETE_FENTY_ICON_VELVET_LIQUID_LIP_OPEN_MVP_1200x1500_ea016da9-a316-4f2b-8afd-9d822277a907.jpg?v=1669934439'],
      details: 'The Ordinary Niacinamide 10% And Zinc 1% Clear 30ml',
      price: 450
    },
    {
      id: 3,
      tag: 'Promotion',
      title: "the Ordinary",
      images: ['https://cdn.shopify.com/s/files/1/0341/3458/9485/products/FB_POSTHOL22_T2PRODUCT_CONCRETE_FENTY_ICON_VELVET_LIQUID_LIP_OPEN_MVP_1200x1500_ea016da9-a316-4f2b-8afd-9d822277a907.jpg?v=1669934439'],
      details: 'The Ordinary Niacinamide 10% And Zinc 1% Clear 30ml',
      price: 450
    },
    {
      id: 4,
      tag: 'Promotion',
      title: "the Ordinary",
      images: ['https://cdn.shopify.com/s/files/1/0341/3458/9485/products/FB_POSTHOL22_T2PRODUCT_CONCRETE_FENTY_ICON_VELVET_LIQUID_LIP_OPEN_MVP_1200x1500_ea016da9-a316-4f2b-8afd-9d822277a907.jpg?v=1669934439'],
      details: 'The Ordinary Niacinamide 10% And Zinc 1% Clear 30ml',
      price: 450
    },
  ];

  getProduct(): void {
    this.product = this.products.find(p => p.id === this.product_id); 
  }

}
