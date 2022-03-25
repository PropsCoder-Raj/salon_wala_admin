import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../__helper/auth/auth.service';
import { UserService } from '../../__helper/user/user.service';
declare var $ : any;

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.scss']
})
export class BookingsComponent implements OnInit {
  
  bookingsList: Array<any> = [];
  bookingsCount = 0;

  constructor(public userS: UserService, public authS: AuthService, public router: Router) { }

  ngOnInit(): void {
    this.getData();
  }

  getData(){
    let count = 0;
    this.userS.getAllBookings().subscribe((data) =>{
      if(data['data'].length > 0){
        console.log(data['data']);
        let newPromise = new Promise((resolve: any, reject: any)=>{
          data['data'].forEach((element: any, index: any, array: any) => {
            element['services'].forEach((serviceElement: any, index: any, array: any) => {  
              if(serviceElement['_shopUser'] === this.authS.currentUserValue.id){
                this.userS.getSigleUser(serviceElement['_shopUser']).subscribe(user => {
                  this.userS.getSigleUser(element['user']).subscribe(user1 => {
                    this.bookingsList.push({data: element, service: serviceElement, user: user['data'] , user1: user1['data']});
                    console.log(this.bookingsList);
                    this.bookingsCount++;
                    count++;
                  })  
                });
              }
            });
          });
        })
      }
    });

    

    let interval = setInterval(() =>{
      if(count === this.bookingsList.length && this.bookingsList.length > 0){
        clearInterval(interval);
        $(document).ready(() => {
          $('#bookingsTable').DataTable();
        });
      }
    }, 300);
  }

  viewBookings(id: any){
    this.router.navigate(['/service-providers-panel/bookings-details/'+ id]);
  }

}
