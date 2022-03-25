import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { BannersComponent } from './banners/banners.component';
import { BreadBannersComponent } from './banners/bread-banners/bread-banners.component';
import { BreadCategoryComponent } from './categories/bread-category/bread-category.component';
import { CategoriesComponent } from './categories/categories.component';
import { BreadCouponsComponent } from './coupons/bread-coupons/bread-coupons.component';
import { CouponsComponent } from './coupons/coupons.component';
import { CustomerDetailsComponent } from './customers/customer-details/customer-details.component';
import { CustomersComponent } from './customers/customers.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OrdersComponent } from './orders/orders.component';
import { BreadProductsComponent } from './products/bread-products/bread-products.component';
import { ProductsComponent } from './products/products.component';
import { BreadTaxComponent } from './tax/bread-tax/bread-tax.component';
import { TaxComponent } from './tax/tax.component';
import { BreadVendorComponent } from './vendor/bread-vendor/bread-vendor.component';
import { VendorComponent } from './vendor/vendor.component';
import { AuthGuard } from './__helper/auth/auth.guard';
import {VendorDashboardComponent} from "./vendor/vendor-dashboard/vendor-dashboard.component";
import {VendorPayoutComponent} from "./vendor/vendor-payout/vendor-payout.component";
import { OrdersDetailsComponent } from './orders/orders-details/orders-details.component';
import { SettingComponent } from './setting/setting.component';
import { ContactsComponent } from './contacts/contacts.component';

const routes: Routes = [
  { path : "", redirectTo: "dashboard", pathMatch: "full" },
  { path : "auth/login", component: LoginComponent},
  { path : "dashboard", component: DashboardComponent, canActivate: [AuthGuard] },
  { path : "settings", component: SettingComponent, canActivate: [AuthGuard] },
  { path : "categories", component: CategoriesComponent, canActivate: [AuthGuard] },
  { path : "categories/activity/:action", component: BreadCategoryComponent, canActivate: [AuthGuard] },
  { path : "products", component: ProductsComponent, canActivate: [AuthGuard] },
  { path : "products/activity/:action", component: BreadProductsComponent, canActivate: [AuthGuard] },
  { path : "customers", component: CustomersComponent, canActivate: [AuthGuard] },
  { path : "vendor", component: VendorComponent, canActivate: [AuthGuard] },
  { path : "vendor/activity/:action", component: BreadVendorComponent, canActivate: [AuthGuard] },
  { path : "vendor/dashboard/:id", component: VendorDashboardComponent, canActivate: [AuthGuard] },
  { path : "payout", component: VendorPayoutComponent, canActivate: [AuthGuard] },
  { path : "orders", component: OrdersComponent, canActivate: [AuthGuard] },
  { path : "order/:id", component: OrdersDetailsComponent, canActivate: [AuthGuard] },
  { path : "banners", component: BannersComponent, canActivate: [AuthGuard] },
  { path : "contacts", component: ContactsComponent, canActivate: [AuthGuard] },
  { path : "banners/activity/:action", component: BreadBannersComponent, canActivate: [AuthGuard] },
  { path : "coupons", component: CouponsComponent, canActivate: [AuthGuard] },
  { path : "coupons/activity/:action", component: BreadCouponsComponent, canActivate: [AuthGuard] },
  { path : "tax", component: TaxComponent, canActivate: [AuthGuard] },
  { path : "tax/activity/:action", component: BreadTaxComponent, canActivate: [AuthGuard] },
  { path : "customer-details/:id", component: CustomerDetailsComponent, canActivate: [AuthGuard] },
  {
     path : "services",
    loadChildren: ()=>import('./services/services.module').then(m=>m.ServicesModule)
  },
  {
    path : "vendor-panel",
    loadChildren: ()=>import('./vendor-panel/vendor-panel.module').then(m=>m.VendorPanelModule)
  },
  {
    path : "service-providers-panel",
    loadChildren: ()=>import('./service-providers-panel/service-providers-panel.module').then(m=>m.ServiceProvidersPanelModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
