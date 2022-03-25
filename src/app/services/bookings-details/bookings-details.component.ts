import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/__helper/api/api.service';
import { UserService } from 'src/app/__helper/user/user.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-bookings-details',
  templateUrl: './bookings-details.component.html',
  styleUrls: ['./bookings-details.component.scss']
})
export class BookingsDetailsComponent implements OnInit {

  createdAt: any;
  total: any;
  name: any;
  status: any;
  orderId: any;

  _id = '';
  servicesList: Array<any> = [];

  additionalInfo : any;

  userInfo : any;

  salutation = '';
  firstName = '';
  lastName = '';
  email = '';
  mobile = '';
  dob = '';

  bookingDate: any;
  slotDay: any;
  slotStart: any;
  slotEnd: any;
  bookingTotal: any;
  totalCommission = 0;


  baseURL= environment.baseURL;

  

  constructor(public route: ActivatedRoute, public userS: UserService, public apiS: ApiService) { }

  ngOnInit(): void {
    this.route.params.subscribe(data => {
      this._id = data['id'];
    });
    this.getData();
  }

  getData(){
    this.userS.getSigleBooking(this._id).subscribe(data =>{
      this.createdAt = data['data']['createdAt'];
      this.total = data['data']['total'];
      this.bookingDate = data['data']['bookingDate'];
      this.slotDay = data['data']['slot']['day'];
      this.slotStart = data['data']['slot']['start'];
      this.slotEnd = data['data']['slot']['end'];
      this.bookingTotal = data['data']['bookingTotal'];
      this.servicesList = data['data']['services'];
      this.servicesList.forEach((element: any) =>{
        this.totalCommission = this.totalCommission + Number(element['commissionAmount']);
      });
      this.userS.getSigleUser(data['data']['user']).subscribe(user=>{
        this.userInfo = user['data'];
        this.salutation = user['data']['salutation'];
        this.firstName = user['data']['firstName'];
        this.lastName = user['data']['lastName'];
        this.email = user['data']['email'];
        this.mobile = user['data']['mobile'];
        this.dob = user['data']['dob'];
      });
      // data['data']['items'].forEach((items: any) => {
      //   this.apiS.getSingleProduct(items['productId']).subscribe(product => {
      //     this.userS.getSigleUser(product['data'][0]['user']).subscribe(user => {
      //       this.products.push({data : product['data'][0], qty: items['quantity'], items: items, brandName: user['data']['shopName'], taxes: items['taxes']});
      //     });
      //   });
      // });
    })
  }

}
