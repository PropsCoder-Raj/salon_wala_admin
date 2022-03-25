import { Component, OnInit } from '@angular/core';

import {Title} from "@angular/platform-browser";
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/__helper/api/api.service';
import { AuthService } from 'src/app/__helper/auth/auth.service';
import { UserService } from 'src/app/__helper/user/user.service';

@Component({
  selector: 'app-providers-dashboard',
  templateUrl: './providers-dashboard.component.html',
  styleUrls: ['./providers-dashboard.component.scss']
})
export class ProvidersDashboardComponent implements OnInit {


  vendorId = '';

  totalOrders = 0;
  totalDeliveryOrders = 0;
  totalPendingOrders = 0;
  totalSales = 0;

  totalService = 0;
  totalIncome = 0;
  totalBookings = 0;
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
  bookingsList : Array<any> = [];
  ordersPendingList : Array<any> = [];

  constructor(public userS: UserService, public apiS: ApiService, public authS: AuthService, public route: ActivatedRoute, public router: Router, private title: Title) {
    this.title.setTitle("Ecommerce Vendor Dashboard - SalonWala.com");
  }

  ngOnInit(): void {
    this.route.params.subscribe(data => {
      this.vendorId = data['id'];
      this.getVendorInfo();
      this.getTransaction();
      this.getData()
    })
  }

  

  getData() {
    this.apiS.getUserVendorServiceProduct(this.vendorId).subscribe(data => {
      data.data.forEach((element: any) => {
        this.apiS.getSingleServiceProduct(element['serviceProduct'][0]).subscribe(dataService => {
          this.totalService++;
        })
      });
    });

    this.userS.getAllBookings().subscribe((data) => {
      if (data['data'].length > 0) {
        data['data'].forEach((element: any, index: any, array: any) => {
          element['services'].forEach((serviceElement: any, index: any, array: any) => {
            if (serviceElement['_shopUser'] === this.vendorId) {
              this.totalIncome = Number(this.totalIncome) + Number(serviceElement['priceCutWithCommision']);
              this.totalCommission = Number(this.totalCommission) + Number(serviceElement['commissionAmount']);
              this.userS.getSigleUser(serviceElement['_shopUser']).subscribe(user => {
                this.userS.getSigleUser(element['user']).subscribe(user1 => {
                  this.bookingsList.push({data: element, service: serviceElement, user: user['data'] , user1: user1['data']});
                  this.totalBookings++;
                })
              });
            }
          });
        });
      }
    });
  }

  searchArray(pid: any):any{
    for( var i = 0, len = this.products.length; i < len; i++ ) {
        if( this.products[i]['_id'] === pid.toString() ) {
            return true;
        }
    }
  }

  viewBookings(id: any){
    this.router.navigate(['/services/bookings-details/'+ id]);
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
