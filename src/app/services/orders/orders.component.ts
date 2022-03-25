import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/__helper/user/user.service';
declare var $: any;

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  bookingsList: Array<any> = [];
  bookingsCount = 0;

  constructor(public userS: UserService, public router: Router) { }

  ngOnInit(): void {
    this.getData();
  }

  getData(){
    this.userS.getAllBookings().subscribe((data) =>{
      if(data['data'].length > 0){
        console.log(data['data']);
        let newPromise = new Promise((resolve: any, reject: any)=>{
          data['data'].forEach((element: any, index: any, array: any) => {
            this.userS.getSigleUser(element['services'][0]['_shopUser']).subscribe(user => {
              this.userS.getSigleUser(element['user']).subscribe(user1 => {
                this.bookingsList.push({data: element, user: user['data'] , user1: user1['data']});    
                if(index === array.length - 1) resolve();
              })  
            });
          });
        })

        newPromise.then(() =>{
          console.log(this.bookingsList);
          $(document).ready(() => {
            $('#bookingsTable').DataTable();
          });
        })
        this.bookingsCount++;
      }
    });
  }

  
  viewBookings(id: any){
    this.router.navigate(['/services/bookings-details/'+ id]);
  }

}
