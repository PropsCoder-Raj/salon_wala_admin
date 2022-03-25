import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/__helper/api/api.service';
import { AuthService } from 'src/app/__helper/auth/auth.service';

@Component({
  selector: 'app-bread-coupons',
  templateUrl: './bread-coupons.component.html',
  styleUrls: ['./bread-coupons.component.scss']
})
export class BreadCouponsComponent implements OnInit {

  couponsStatus = 0;

  name = '';
  code = '';
  status = '1';
  discount = '';
  amountLimit = '';
  couponId = '';


  constructor(public route: ActivatedRoute, public toastr: ToastrService, public router: Router, public apiS: ApiService, public auth: AuthService) {}

  ngOnInit(): void {
    
    this.route.params.subscribe(data=>{
      if(data.action == "create"){
        this.couponsStatus = 1;
      }else if(data.action == "update"){
        this.couponsStatus = 2;
        this.route.queryParams.subscribe(data=>{
          this.couponId = data.id;
          this.getSingleCoupon(data.id);
        })  
      }
    })
  }

  getSingleCoupon(id: any){
    this.apiS.getSingleCoupon(id).subscribe((res) => {
      this.name = res.data[0].name;
      this.code = res.data[0].code;
      this.status = res.data[0].status;
      this.discount = res.data[0].discount;
      this.amountLimit = res.data[0].amountLimit;
    });
  }

  submit(){
    if(this.couponsStatus == 1){
      this.createCoupon();
    }else if(this.couponsStatus == 2){
      this.updateCoupon();
    }
  }

  createCoupon(){
    if(this.name !== '' && this.code !== '' && this.status !== '' && this.discount !== '' && this.amountLimit !== ''){
      this.apiS.createCoupon(this.name, this.code, this.status, this.discount, this.amountLimit).subscribe(result => {
        if(result.status){
          this.toastr.success(result.message);
          this.clearForm();
        } else {
          this.toastr.error(result.message);
        }
      });
    }else{
      this.toastr.error("All data Mendatory.");
    }
  }

  updateCoupon(){
    if(this.name !== '' && this.code !== '' && this.status !== '' && this.discount !== '' && this.amountLimit !== ''){
      this.apiS.updateCoupon(this.name, this.code, this.status, this.discount, this.amountLimit, this.couponId).subscribe(result => {
        if(result.status){
          this.toastr.success(result.message);
          this.clearForm();
        } else {
          this.toastr.error(result.message);
        }
      });
    }else{
      this.toastr.error("All data Mendatory.");
    }
  }  

  clearForm(){
    this.couponsStatus = 0;
    this.name = '';
    this.code = '';
    this.status = '';
    this.amountLimit = '';
    this.router.navigate(['/coupons']);
  }

}
