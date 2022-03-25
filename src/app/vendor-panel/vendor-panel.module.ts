import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VendorPanelRoutingModule } from './vendor-panel-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OrdersComponent } from './orders/orders.component';
import { OrderDetailsComponent } from './orders/order-details/order-details.component';
import { ProductsComponent } from './products/products.component';
import { BreadProductsComponent } from './products/bread-products/bread-products.component';
import { TransactionComponent } from './transaction/transaction.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    DashboardComponent,
    OrdersComponent,
    OrderDetailsComponent,
    ProductsComponent,
    BreadProductsComponent,
    TransactionComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    VendorPanelRoutingModule
  ]
})
export class VendorPanelModule { }
