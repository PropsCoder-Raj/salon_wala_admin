import { Component, OnInit } from '@angular/core';

import {Title} from "@angular/platform-browser";
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/__helper/api/api.service';
import { AuthService } from 'src/app/__helper/auth/auth.service';
import { UserService } from 'src/app/__helper/user/user.service';


@Component({
  selector: 'app-vendor-dashboard',
  templateUrl: './vendor-dashboard.component.html',
  styleUrls: ['./vendor-dashboard.component.scss']
})
export class VendorDashboardComponent implements OnInit {


  vendorId = '';

  totalOrders = 0;
  totalDeliveryOrders = 0;
  totalPendingOrders = 0;
  totalSales = 0;
  wallet = 0;
  totalCommission = 0;


  salutation = '';
  name = '';
  email = '';
  mobile = '';
  brandName = '';
  officialEmail = '';
  officialMobile = '';
  shopPincode = '';
  pickupPincode = '';

  transactionList: Array<any> = [];
  transactionCount = 0;

  products : Array<any> = [];
  ordersList : Array<any> = [];
  ordersPendingList : Array<any> = [];

  constructor(public userS: UserService, public apiS: ApiService, public authS: AuthService, public route: ActivatedRoute, public router: Router, private title: Title) {
    this.title.setTitle("Ecommerce Vendor Dashboard - SalonWala.com");
  }

  ngOnInit(): void {
    this.route.params.subscribe(data => {
      this.vendorId = data['id'];
    })
    this.getVendorProduct();
    this.getVendorInfo();
    this.getTransaction();

  }
  getVendorProduct(){
    this.products = [];
    this.apiS.getAllProductUserWise(this.vendorId).subscribe(data=>{
      this.products = data['data'];
      this.getOrders();
    });
  }

  getOrders(){
    this.ordersList = [];
    let _totalSales = 0;
    this.userS.getAllOrders().subscribe(data => {
      console.log(data['data']);
      data['data'].forEach((element: any) => {
        element['items'].forEach((items: any) => {
          console.log(this.searchArray(items['productId']));
          if(this.searchArray(items['productId']) === true){
            this.totalOrders++;
            if(element['fulfillmentStatus'] === 'DELIVERED'){
              _totalSales = this.totalSales + ((items['quantity'] * items['price'] ) - items['commissionAmount'] );
              this.totalSales = _totalSales;
              this.totalCommission = this.totalCommission + items['commissionAmount'];
              this.ordersList.push({data: items, orderId: element['orderId'], fulfillmentStatus: element['fulfillmentStatus'], _id: element['_id']});
              this.totalDeliveryOrders++;
            }else{
              _totalSales = this.totalSales + ((items['quantity'] * items['price'] ) - items['commissionAmount'] );
              this.totalSales = _totalSales;
              this.totalCommission = this.totalCommission + items['commissionAmount'];
              this.ordersPendingList.push({data: items, orderId: element['orderId'], fulfillmentStatus: element['fulfillmentStatus'], _id: element['_id']});
              this.totalPendingOrders++;
            }
          }
        });
      });
    });
  }

  searchArray(pid: any):any{
    for( var i = 0, len = this.products.length; i < len; i++ ) {
        if( this.products[i]['_id'] === pid.toString() ) {
            return true;
        }
    }
  }

  viewOrder(id: any){
    this.router.navigate(['/order/'+ id]);
  }

  getVendorInfo(){
    this.userS.getSigleUser(this.vendorId).subscribe(data=>{
      this.wallet = data['data']['wallet'];
        this.name = data['data']['firstName'] + ' ' + data['data']['lastName'];
        this.salutation = data['data']['salutation'];
        this.email = data['data']['email'];
        this.mobile = data['data']['mobile'];
        this.brandName = data['data']['shopName'];
        this.officialEmail = data['data']['shopEmail'];
        this.officialMobile = data['data']['shopMobile'];
        this.shopPincode = data['data']['shopPostalCode'];
        this.pickupPincode = data['data']['pickupPostalCode'];
    })
  }

  getTransaction(){
    this.apiS.getVendorTransaction(this.vendorId).subscribe(data=>{
      if(data['data'].length > 0){
        this.transactionList = data['data'];
        this.transactionCount = data['data'].length;
      }
    })
  }

}
