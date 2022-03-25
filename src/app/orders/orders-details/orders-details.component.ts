import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/__helper/api/api.service';
import { UserService } from 'src/app/__helper/user/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-orders-details',
  templateUrl: './orders-details.component.html',
  styleUrls: ['./orders-details.component.scss']
})
export class OrdersDetailsComponent implements OnInit {

  createdAt: any;
  total: any;
  name: any;
  status: any;
  orderId: any;

  _id = '';
  products: Array<any> = [];

  additionalInfo : any;
  userInfo : any;

  baseURL= environment.baseURL;

  constructor(public route: ActivatedRoute, public userS: UserService, public apiS: ApiService) { }

  ngOnInit(): void {
    this.route.params.subscribe(data => {
      this._id = data['id'];
    });
    this.getData();
  }

  getData(){
    this.userS.getSingleOrder(this._id).subscribe(data =>{
      this.createdAt = data['data']['createdAt'];
      this.total = data['data']['total'];
      this.name = data['data']['additionalInfo']['name'];
      this.additionalInfo = data['data']['additionalInfo'];
      console.log(this.additionalInfo);
      this.status = data['data']['fulfillmentStatus'];
      this.orderId = data['data']['orderId'];
      this.userS.getSigleUser(data['data']['user']).subscribe(user=>{
        this.userInfo = user['data'];
      });
      data['data']['items'].forEach((items: any) => {
        this.apiS.getSingleProduct(items['productId']).subscribe(product => {
          this.userS.getSigleUser(product['data'][0]['user']).subscribe(user => {
            this.products.push({data : product['data'][0], qty: items['quantity'], items: items, brandName: user['data']['shopName'], taxes: items['taxes']});
          });
        });
      });
    })
  }

}
