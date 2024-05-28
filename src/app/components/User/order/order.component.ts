import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { OrderService, OrderItem } from '../../../services/order.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'; 
@Component({
  selector: 'app-order',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit, OnDestroy {
  sub: Subscription | null = null;
  order_id: number | null = null;
  order_items: OrderItem[] = [];
  faTrashAlt=faTrashAlt;
  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.sub = this.orderService.getOrders().subscribe(data => {
      console.log("order:", data);
      if (data.length > 0) {
        this.order_id = data[0].id;
        console.log("order id:", this.order_id);
        this.orderService.getOrderItems(this.order_id).subscribe(items => {
          this.order_items = items;
          console.log("order items:", this.order_items);
        });
      }
    });
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
  RemoveFromItems(id:number){
    this.orderService.deleteOrderItem(id).subscribe(data=>{
      console.log(data);
    
    })
  }

}
