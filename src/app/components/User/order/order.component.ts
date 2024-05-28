import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { OrderService , Order } from '../../../services/order.service';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent  implements OnInit , OnDestroy{
  sub :Subscription |null = null;
  order_id : number | null = null;

  constructor(private orderService : OrderService) { }
  ngOnInit(): void {
    this.sub = this.orderService.getOrders().subscribe(data => {
      console.log("order :" , data);
      this.order_id = data[0].id;
      console.log("order id :", this.order_id);
      this.sub = this.orderService.getOrderItems(this.order_id).subscribe(data =>{
        // this.order_items = data;
      })
    }
    )
  }
  ngOnDestroy(): void {

  }
}
