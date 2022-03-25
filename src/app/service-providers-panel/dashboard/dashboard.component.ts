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

  vendorRoleId = '61a9c81186f8d1e2b7efc67b';

  totalService = 0;
  totalIncome = 0;
  totalBookings = 0;


  products: Array<any> = []

  constructor(public userS: UserService, public toastr: ToastrService, public authS: AuthService, public apiS: ApiService) { }

  ngOnInit(): void {
    this.checkAuth();
    this.getData();
  }

  checkAuth() {
    this.userS.getSigleUser(this.authS.currentUserValue.id).subscribe(data => {
      if (data['status'] === 'success') {
        let cnt = 0;
        let adminCnt = 0;
        data['data']['roles'].forEach((element: any) => {
          cnt++;
          if (element === this.vendorRoleId) {
            adminCnt++;
          }
        });

        let interval = setInterval(() => {
          if (data['data']['roles'].length === cnt) {
            clearInterval(interval);
            if (adminCnt === 0) {
              this.toastr.error("Only Service Vendor Access This Panel");
              setTimeout(() => {
                this.authS.logout();
              }, 1000);
            }
          }
        })
      }
    });
  }

  getData() {
    this.apiS.getUserVendorServiceProduct(this.authS.currentUserValue.id).subscribe(data => {
      data.data.forEach((element: any) => {
        this.apiS.getSingleServiceProduct(element['serviceProduct'][0]).subscribe(dataService => {
          this.totalService++;
        })
      });
    });

    this.userS.getAllBookings().subscribe((data) => {
      if (data['data'].length > 0) {
        console.log(data['data']);
        data['data'].forEach((element: any, index: any, array: any) => {
          element['services'].forEach((serviceElement: any, index: any, array: any) => {
            if (serviceElement['_shopUser'] === this.authS.currentUserValue.id) {
              this.totalIncome = Number(this.totalIncome) + Number(serviceElement['priceCutWithCommision']);
              this.userS.getSigleUser(serviceElement['_shopUser']).subscribe(user => {
                this.userS.getSigleUser(element['user']).subscribe(user1 => {
                  this.totalBookings++;
                })
              });
            }
          });
        });
      }
    });
  }


}
