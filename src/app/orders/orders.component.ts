import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../__helper/user/user.service';
import {Title} from "@angular/platform-browser";
declare var $: any;

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  orders: Array<any> = [];
  ordersCount = 0;

  constructor(public userS: UserService,private title:Title,public router: Router) {
    this.title.setTitle("Ecommerce Orders - SalonWala.com");
  }

  getUserOrders() {
    this.orders = [];
    this.ordersCount = 0;
    $('#ordersTable').DataTable().destroy();
    this.userS.getAllOrders().subscribe((data) => {
      this.ordersCount = data['count'];
      data['data'].forEach((element: any) => {
        let cnt = 0;
        let totalAmount = 0;
        let commissionAmount = 0;
        element['items'].forEach((items: any) => {
          cnt++;
          totalAmount = totalAmount + (items['price'] * items['quantity']);
          commissionAmount = commissionAmount + items['commissionAmount'];
        });

        let intervalItems = setInterval(() => {
          if(cnt === element['items'].length){
            clearInterval(intervalItems);
            this.orders.push({ totalAmount: totalAmount, commissionAmount: commissionAmount, orderData: element});
          }
        }, 1000);
      });

      let interval = setInterval(() => {
        if (this.ordersCount === this.orders.length) {
          clearInterval(interval);
          $('#ordersTable').dataTable();
        }
      }, 1000);

    })
  }

  ngOnInit(): void {
    this.getUserOrders();
  }

  viewOrder(id: any){
    this.router.navigate(['/order/'+ id]);
  }

}
