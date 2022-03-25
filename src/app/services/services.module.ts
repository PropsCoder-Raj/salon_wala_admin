import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServicesRoutingModule } from './services-routing.module';
import { CategoriesComponent } from './categories/categories.component';
import { OrdersComponent } from './orders/orders.component';
import { ProductsComponent } from './products/products.component';
import { ProviderComponent } from './provider/provider.component';
import { BreadCategoriesComponent } from './categories/bread-categories/bread-categories.component';
import { BreadProductsComponent } from './products/bread-products/bread-products.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CKEditorModule } from 'ckeditor4-angular';
import { BreadProviderComponent } from './provider/bread-provider/bread-provider.component';
import { CityComponent } from './city/city.component';
import { BreadCityComponent } from './city/bread-city/bread-city.component';
import { ProvidersDashboardComponent } from './providers-dashboard/providers-dashboard.component';
import { BookingsDetailsComponent } from './bookings-details/bookings-details.component';

import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { PayoutsComponent } from './payouts/payouts.component';

@NgModule({
  declarations: [
    CategoriesComponent,
    OrdersComponent,
    ProductsComponent,
    ProviderComponent,
    BreadCategoriesComponent,
    BreadProductsComponent,
    BreadProviderComponent,
    CityComponent,
    BreadCityComponent,
    ProvidersDashboardComponent,
    BookingsDetailsComponent,
    PayoutsComponent
    
  ],
  imports: [
    MatButtonModule,
    MatIconModule,
    CommonModule,
    ServicesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CKEditorModule
  ]
})
export class ServicesModule { }
