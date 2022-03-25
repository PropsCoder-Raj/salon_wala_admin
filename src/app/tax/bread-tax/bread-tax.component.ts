import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/__helper/api/api.service';
import { AuthService } from 'src/app/__helper/auth/auth.service';

@Component({
  selector: 'app-bread-tax',
  templateUrl: './bread-tax.component.html',
  styleUrls: ['./bread-tax.component.scss']
})
export class BreadTaxComponent implements OnInit {

  taxName = '';
  taxPercentage = '';
  taxId = '';

  taxStatus = 0;

  constructor(public route: ActivatedRoute, public toastr: ToastrService, public router: Router, public apiS: ApiService, public auth: AuthService) {
    console.log(auth.currentUser);
    console.log(auth.currentUserValue);
  }

  ngOnInit(): void {
    this.route.params.subscribe(data=>{
      if(data.action == "create"){
        this.taxStatus = 1;
      }else if(data.action == "update"){
        this.taxStatus = 2;
        this.route.queryParams.subscribe(data=>{
          this.taxId = data.id;
          this.getSingleTax(data.id);
        })  
      }
    })
  }

  getSingleTax(id: any){
    this.apiS.getSingleTax(id).subscribe((res) => {
      this.taxName = res.data[0].name;
      this.taxPercentage = res.data[0].percentage;
    });
  }

  submit(){
    if(this.taxStatus == 1){
      this.createTax();
    }else if(this.taxStatus == 2){
      this.updateTax();
    }
  }

  createTax(){
    if(this.taxName !== '' && this.taxPercentage !== ''){
      this.apiS.createTax(this.taxName, this.taxPercentage).subscribe(result => {
        if(result.status){
          this.toastr.success(result.message);
          this.clearForm();
        } else {
          this.toastr.error(result.message);
        }
      });
    }else{
      this.toastr.error("Please Enter Tax Name & Percentage");
    }
  }

  updateTax(){
    if(this.taxName !== '' && this.taxPercentage !== ''){
      this.apiS.updateTax(this.taxName, this.taxPercentage, this.taxId).subscribe(result => {
        if(result.status){
          this.toastr.success(result.message);
          this.clearForm();
        } else {
          this.toastr.error(result.message);
        }
      });
    }else{
      this.toastr.error("Please Enter Tax Name & Percentage");
    }
  }

  clearForm(){
    this.taxStatus = 0;
    this.taxName = '';
    this.taxPercentage = '';
    this.router.navigate(['/tax']);
  }

}
