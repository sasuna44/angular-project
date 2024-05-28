import { Component, OnInit } from '@angular/core';
import { OrderService, Order } from '../../../services/order.service';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-orders',
    standalone: true,
    imports: [RouterLink, FormsModule, CommonModule],
    templateUrl: './orders.component.html',
    styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
    orders :any [] = [];
    filterTerm: 'pending' | 'accepted' | 'rejected' | 'all' = 'all';
    sub :Subscription |null = null;

    constructor(private orderService: OrderService) {}

    ngOnInit(): void {

        this.sub= this.orderService.getOrders().subscribe(orders => {
            this.orders = orders;
            console.log(orders);
        });
        
      
    }
}

    // loadOrders(): void {
    //     this.orderService.getOrders().subscribe(
    //         (data: Order[]) => {
    //             this.orders = data;
    //             console.log (data);
    //             console.log('Orders loaded:', this.orders);
    //         },
    //         (error: any) => {
    //             console.error('Error fetching orders', error);
    //         }
    //     );
    // }

    // filterOrders(): any {
    //     if (this.filterTerm === 'all') {
    //         return this.orders;
    //     }
    //     return this.orders.filter(order => order.status === this.filterTerm);
    // }

    // updateOrderStatus(id: number, status: 'accepted' | 'rejected'): void {
    //     console.log('Updating order status:', id, status);
    //     this.orderService.updateOrderStatus(id, status).subscribe(
    //         () => {
    //             console.log('Order status updated:', id, status);
    //             const order = this.orders.find(order => order.id === id);
    //             if (order) {
    //                 order.status = status;
    //             }
    //         },
    //         (error: any) => {
    //             console.error('Error updating order status', error);
    //         }
    //     );
    // }

    // getProductTitles(order: Order): string {
    //     return order.products ? order.products.map(p => p.title).join(', ') : '';
    // }

