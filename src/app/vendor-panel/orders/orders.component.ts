import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../__helper/api/api.service';
import { AuthService } from '../../__helper/auth/auth.service';
import { UserService } from '../../__helper/user/user.service';
declare var $: any;

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  products: Array<any> = [];
  ordersList: Array<any> = [];

  constructor(public userS: UserService, public apiS: ApiService, public authS: AuthService, public router: Router) { }

  ngOnInit(): void {
    this.getVendorProduct();
  }

  getVendorProduct(){
    this.products = [];
    this.apiS.getAllProductUserWise(this.authS.currentUserValue.id).subscribe(data=>{
      this.products = data['data'];
      this.getOrders();
    });
  }

  getOrders(){
    
    $('#ordersTable').DataTable().destroy();
    this.ordersList = [];
    let cnt = 0;
    this.userS.getAllOrders().subscribe(data => {
      data['data'].forEach((element: any) => {
        cnt++;
        element['items'].forEach((items: any) => {
          if(this.searchArray(items['productId']) === true){
            this.ordersList.push({data: items, orderId: element['orderId'], fulfillmentStatus: element['fulfillmentStatus'], _id: element['_id']});
          }
        });
      });

      let interval = setInterval(() => {
        if(data['data'].length === cnt){
          console.log("true")
          clearInterval(interval);
          $('#ordersTable').DataTable();
        }
      }, 1000)
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
    this.router.navigate(['/vendor-panel/order/'+ id]);
  }

}
