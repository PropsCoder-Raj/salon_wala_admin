import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BreadProductsComponent } from './products/bread-products/bread-products.component';
import { BreadCategoriesComponent } from './categories/bread-categories/bread-categories.component';
import { CategoriesComponent } from './categories/categories.component';
import { OrdersComponent } from './orders/orders.component';
import { ProductsComponent } from './products/products.component';
import { ProviderComponent } from './provider/provider.component';
import { BreadProviderComponent } from './provider/bread-provider/bread-provider.component';
import { CityComponent } from './city/city.component';
import { BreadCityComponent } from './city/bread-city/bread-city.component';
import { ProvidersDashboardComponent } from './providers-dashboard/providers-dashboard.component';
import { BookingsDetailsComponent } from './bookings-details/bookings-details.component';
import { PayoutsComponent } from './payouts/payouts.component';

const routes: Routes = [
  {
    path:'categories',
    component:CategoriesComponent
  },
  { path : "categories/activity/:action", component: BreadCategoriesComponent},
  {
    path:'orders',
    component:OrdersComponent
  },
  { path : "products/activity/:action", component: BreadProductsComponent},
  {
    path:'products',
    component:ProductsComponent
  },
  {
    path:'providers',
    component:ProviderComponent
  },
  {
    path:'payouts',
    component:PayoutsComponent
  },
  {
    path:'bookings-details/:id',
    component:BookingsDetailsComponent
  },
  {
    path:'providers/dashboard/:id',
    component:ProvidersDashboardComponent
  },
  {
    path:'providers/activity/:action',
    component:BreadProviderComponent
  },
  {
    path:'city',
    component:CityComponent
  },
  {
    path:'city/activity/:action',
    component:BreadCityComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServicesRoutingModule { }
