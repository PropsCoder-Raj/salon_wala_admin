import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../__helper/api/api.service';
import { AuthService } from '../../__helper/auth/auth.service';
import { UserService } from '../../__helper/user/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  vendorRoleId = '61a9c81186f8d1e2b7efc67c';

  totalOrders = 0;
  totalSales = 0;
  totalPendingOrders = 0;
  totalProdcuts = 0;
  

  products: Array<any> = []

  constructor(public userS: UserService, public toastr: ToastrService, public authS: AuthService, public apiS: ApiService) { }

  ngOnInit(): void {
    this.checkAuth();
    this.getVendorProduct();
  }

  checkAuth(){
    this.userS.getSigleUser(this.authS.currentUserValue.id).subscribe(data => {
      if(data['status'] === 'success'){
        let cnt = 0;
        let adminCnt = 0;
        data['data']['roles'].forEach((element: any) => {
          cnt++;
          if(element === this.vendorRoleId){
            adminCnt++;
          }
        });

        let interval = setInterval(() => {
          if(data['data']['roles'].length === cnt){
            clearInterval(interval);
            if(adminCnt === 0){
              this.toastr.error("Only Vendor Access This Panel");
              setTimeout(() => {
                this.authS.logout();
              }, 1000);
            }
          }
        })
      }
    });
  }

  getVendorProduct(){
    this.products = [];
    this.apiS.getAllProductUserWise(this.authS.currentUserValue.id).subscribe(data=>{
      this.products = data['data'];
      this.totalProdcuts = data['data'].length;
      this.getOrders();
    });
  }
  
  getOrders(){
    let _totalSales = 0;
    this.userS.getAllOrders().subscribe(data => {
      console.log(data['data']);
      data['data'].forEach((element: any) => {
        element['items'].forEach((items: any) => {
          console.log(this.searchArray(items['productId']));
          if(this.searchArray(items['productId']) === true){
            _totalSales = this.totalSales + ((items['quantity'] * items['price'] ) - items['commissionAmount'] );
            this.totalSales = _totalSales;
            if(element['fulfillmentStatus'] !== 'DELIVERED'){
              this.totalPendingOrders++;
            }
            this.totalOrders++;
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


}
