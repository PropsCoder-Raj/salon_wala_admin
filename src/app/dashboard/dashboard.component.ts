import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../__helper/api/api.service';
import { AuthService } from '../__helper/auth/auth.service';
import { UserService } from '../__helper/user/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public userDataAll : Array<any> = [];
  public userCountAll = 0;

  public ordersDataAll : Array<any> = [];
  public ordersCountAll = 0;

  public productsDataAll : Array<any> = [];
  public productsCountAll = 0;

  adminRoleId = '61a9c81186f8d1e2b7efc67a';

  constructor(public userS: UserService, public apiS: ApiService, public authS: AuthService, public toastr: ToastrService) { }

  ngOnInit(): void {

    this.checkAuth();

    this.getUserAll();
    this.getOrdersAll();
    this.getProductsAll();
  }

  checkAuth(){
    this.userS.getSigleUser(this.authS.currentUserValue.id).subscribe(data => {
      if(data['status'] === 'success'){
        let cnt = 0;
        let adminCnt = 0;
        data['data']['roles'].forEach((element: any) => {
          cnt++;
          if(element === this.adminRoleId){
            adminCnt++;
          }
        });

        let interval = setInterval(() => {
          if(data['data']['roles'].length === cnt){
            clearInterval(interval);
            if(adminCnt === 0){
              this.toastr.error("Only Admin Access This Panel");
              setTimeout(() => {
                this.authS.logout();
              }, 1000);
            }
          }
        })
      }
    });
  }

  getUserAll(){
    this.userS.getAllUsers().subscribe((data) => {
      if(data['status'] === 'success'){
        this.userDataAll = data['data'];
        this.userCountAll = data['data'].length;
      }
    }); 
  }

  getOrdersAll(){
    this.userS.getAllOrders().subscribe((data) => {
      if(data['status'] === 'success'){
        this.ordersDataAll = data['data'];
        this.ordersCountAll = data['count'];
      }
    }); 
  }

  getProductsAll(){
    this.apiS.getAllProduct().subscribe(data=>{
      if(data['status'] === 'success'){
        this.productsDataAll = data['data'];
        this.productsCountAll = data['data'].length;
      }
    });
    
  }

}
