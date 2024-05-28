import { Component, OnInit, OnDestroy } from '@angular/core';
import { OrderService, Order } from '../../../services/order.service';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-orders',
    standalone: true,
    imports: [FormsModule, CommonModule],
    templateUrl: './orders.component.html',
    styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit, OnDestroy {
    orders: Order[] = [];
    filterTerm: string = 'all';
    private subscription: Subscription = new Subscription();

    constructor(private orderService: OrderService) {}

    ngOnInit(): void {
        const orderSubscription = this.orderService.getDetailedOrders().subscribe((data: Order[]) => {
            console.log(data); // تحقق من البيانات
            this.orders = data;
        });
        this.subscription.add(orderSubscription);
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    filterOrders(): Order[] {
        if (this.filterTerm === 'all') {
            return this.orders;
        }
        return this.orders.filter(order => order.status === this.filterTerm);
    }

    getProductTitles(order: Order): string {
        if (order.products && order.products.length > 0) {
            return order.products.map(product => product.title).join(', ');
        }
        return 'No Products';
    }

    updateOrderStatus(id: number, status: 'accepted' | 'rejected'): void {
        this.orderService.updateOrderStatus(id, status).subscribe(
            (updatedOrder) => {
                const order = this.orders.find(o => o.id === id);
                if (order) {
                    order.status = status;
                }
            },
            error => {
                console.error('Error updating order status:', error);
            }
        );
    }
    

    updateOrderWithItems(id: number, orderData: any): void {
        this.orderService.updateOrderWithItems(id, orderData).subscribe((updatedOrder) => {
            const index = this.orders.findIndex(o => o.id === id);
            if (index !== -1) {
                this.orders[index] = updatedOrder;
            }
        });
    }
}
