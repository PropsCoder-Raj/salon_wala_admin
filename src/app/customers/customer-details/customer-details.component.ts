import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/__helper/api/api.service';
import { UserService } from 'src/app/__helper/user/user.service';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.scss']
})
export class CustomerDetailsComponent implements OnInit {

  public data:any=[];
  orders : Array<any> = [];
  ordersCount = 0;
  constructor(public route:ActivatedRoute,public apiService:ApiService,public userS: UserService) { }

  ngOnInit(): void {
    this.route.params.subscribe(data=>{
      this.getData(data.id);
      this.getUserOrders(data.id);
    });

  }
  getData(id:any){
    this.apiService.getSingleUser(id).subscribe(data=>{
      this.data = data.data;
    });
  }

  getUserOrders(id: any){
    this.userS.getUsersOrders(id).subscribe((data) => {
      console.log(data);
      this.ordersCount = data['data'].length;
      this.orders = data['data'];
    })  
  }

}
