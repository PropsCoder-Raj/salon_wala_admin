import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/__helper/auth/auth.service';
import { UserService } from 'src/app/__helper/user/user.service';

@Component({
  selector: 'app-app-menu',
  templateUrl: './app-menu.component.html',
  styleUrls: ['./app-menu.component.scss']
})
export class AppMenuComponent implements OnInit {

  adminRoleId = '61a9c81186f8d1e2b7efc67a';
  vendorRoleId = '61a9c81186f8d1e2b7efc67c';
  serviceProvidersId = '61a9c81186f8d1e2b7efc67b';

  adminRoleS = false;
  vendorRoleS = false;
  serviceProvidersS = false;

  constructor(public authS: AuthService, public userS: UserService) { }

  ngOnInit(): void {
    this.userS.getSigleUser(this.authS.currentUserValue.id).subscribe(data => {
      if(data['status'] === 'success'){
        data['data']['roles'].forEach((element: any) => {
          if(element === this.adminRoleId){
            this.adminRoleS = true;
          }else if(element === this.vendorRoleId){
            this.vendorRoleS = true;
          }else if(element === this.serviceProvidersId){
            this.serviceProvidersS = true;
          }
        });
      }
    });
  }

}
