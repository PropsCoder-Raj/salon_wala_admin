import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductsComponent } from './products/products.component';
import { CustomersComponent } from './customers/customers.component';
import { VendorComponent } from './vendor/vendor.component';
import { CategoriesComponent } from './categories/categories.component';
import { OrdersComponent } from './orders/orders.component';
import { BannersComponent } from './banners/banners.component';
import { CouponsComponent } from './coupons/coupons.component';
import { TaxComponent } from './tax/tax.component';
import { CustomerDetailsComponent } from './customers/customer-details/customer-details.component';
import { BreadCategoryComponent } from './categories/bread-category/bread-category.component';
import { BreadBannersComponent } from './banners/bread-banners/bread-banners.component';
import { BreadCouponsComponent } from './coupons/bread-coupons/bread-coupons.component';
import { BreadTaxComponent } from './tax/bread-tax/bread-tax.component';
import { BreadProductsComponent } from './products/bread-products/bread-products.component';
import { CKEditorModule } from 'ckeditor4-angular';



import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {RouterModule} from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './auth/login/login.component';
import { AppHeaderComponent } from './master/app-header/app-header.component';
import { AppFooterComponent } from './master/app-footer/app-footer.component';
import { AppMenuComponent } from './master/app-menu/app-menu.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { ErrorInterceptorInterceptor } from './__helper/other/error-interceptor.interceptor';
import { JwtInterceptorInterceptor } from './__helper/other/jwt-interceptor.interceptor';
import { AuthService } from './__helper/auth/auth.service';
import { UserService } from './__helper/user/user.service';
import { ApiService } from './__helper/api/api.service';
import { BreadVendorComponent } from './vendor/bread-vendor/bread-vendor.component';
import { VendorDashboardComponent } from './vendor/vendor-dashboard/vendor-dashboard.component';
import { VendorPayoutComponent } from './vendor/vendor-payout/vendor-payout.component';
import { OrdersDetailsComponent } from './orders/orders-details/orders-details.component';
import { ExcelService } from './__helper/excel/excel.service';
import { SettingComponent } from './setting/setting.component';
import { ContactsComponent } from './contacts/contacts.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ProductsComponent,
    CustomersComponent,
    VendorComponent,
    CategoriesComponent,
    OrdersComponent,
    BannersComponent,
    CouponsComponent,
    TaxComponent,
    CustomerDetailsComponent,
    BreadCategoryComponent,
    BreadBannersComponent,
    BreadCouponsComponent,
    BreadTaxComponent,
    BreadProductsComponent,
    LoginComponent,
    AppHeaderComponent,
    AppFooterComponent,
    AppMenuComponent,
    BreadVendorComponent,
    VendorDashboardComponent,
    VendorPayoutComponent,
    OrdersDetailsComponent,
    SettingComponent,
    ContactsComponent,
    
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CKEditorModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    AuthService, UserService, ApiService, ExcelService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptorInterceptor, multi: true },],
  bootstrap: [AppComponent]
})
export class AppModule { }
