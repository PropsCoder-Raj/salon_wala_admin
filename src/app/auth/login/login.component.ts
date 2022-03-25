import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/__helper/api/api.service';
import { AuthService } from 'src/app/__helper/auth/auth.service';
import { UserService } from 'src/app/__helper/user/user.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email = '';
  password = '';
  loader = false;
  returnUrl = "";

  
  adminRoleId = '61a9c81186f8d1e2b7efc67a';
  vendorRoleId = '61a9c81186f8d1e2b7efc67c';
  serviceProvidersId = '61a9c81186f8d1e2b7efc67b';

  adminRoleS = false;
  vendorRoleS = false;
  serviceProvidersS = false;


  constructor(private toastr: ToastrService, public authS: AuthService, public apiS: ApiService, public userS: UserService, public route: ActivatedRoute, public router: Router) { }

  ngOnInit(): void {
  }

  login(){
    this.loader = true;
    if(this.email !== '' && this.password !== ''){
      const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (re.test(this.email) == false) {
        this.toastr.error("Please! Enter valid email.");
        this.loader = false;
      }else{
        this.authS.userSignIn(this.email, this.password).pipe(first()).subscribe(data => {
          this.loader = false;
          this.userS.getSigleUser(this.authS.currentUserValue.id).subscribe(data => {
            if(data['status'] === 'success'){
              let cnt = 0;
              let adminCnt = 0;
              data['data']['roles'].forEach((element: any) => {
                cnt++;
                if(element === this.adminRoleId){
                  this.adminRoleS = true;
                  this.router.navigate(['/']).then(()=>{
                    location.reload();
                  });
                  adminCnt++;
                }else if(element === this.vendorRoleId){
                  this.vendorRoleS = true;
                  this.router.navigate(['/vendor-panel']).then(() =>{
                    location.reload();
                  });
                  adminCnt++;
                }else if(element === this.serviceProvidersId){
                  this.serviceProvidersS = true;
                  this.router.navigate(['/service-providers-panel']).then(() =>{
                    location.reload();
                  });
                  adminCnt++;
                }
              });
            }
          });
        },
        error => {
          if(error.status == "0"){
            this.toastr.error(error.statusText);
          } else {
            this.toastr.error(error);
          }
          this.loader = false;
        });
      }
    }else{
      this.loader = false;
      this.toastr.error("Please! Enter email & password.");
    }
  }

}
