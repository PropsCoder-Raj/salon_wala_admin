import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../__helper/auth/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OrdersComponent } from './orders/orders.component';
import { OrderDetailsComponent } from './orders/order-details/order-details.component';
import { ProductsComponent } from './products/products.component';
import { BreadProductsComponent } from './products/bread-products/bread-products.component';
import { TransactionComponent } from './transaction/transaction.component';

const routes: Routes = [
  { path : "", redirectTo: "dashboard", pathMatch: "full" },
  { path : "dashboard", component: DashboardComponent, canActivate: [AuthGuard] },
  { path : "products", component: ProductsComponent, canActivate: [AuthGuard] },
  { path : "products/activity/:action", component: BreadProductsComponent, canActivate: [AuthGuard] },
  { path : "orders", component: OrdersComponent, canActivate: [AuthGuard] },
  { path : "order/:id", component: OrderDetailsComponent, canActivate: [AuthGuard] },
  { path : "transaction", component: TransactionComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VendorPanelRoutingModule { }
