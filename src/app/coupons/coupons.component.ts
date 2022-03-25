import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../__helper/api/api.service';
declare var $ : any;

@Component({
  selector: 'app-coupons',
  templateUrl: './coupons.component.html',
  styleUrls: ['./coupons.component.scss']
})
export class CouponsComponent implements OnInit {

  couponsData: any = [];

  constructor(public apiS: ApiService, public router: Router, public toastr: ToastrService) { }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.couponsData = [];
    $('#couponsTable').DataTable().destroy();
    this.apiS.getAllCoupon().subscribe((res) => {
      this.couponsData = res.data;
      setTimeout(() => {
        $('#couponsTable').DataTable();
      }, 500);
    });
  }

  updateStatus(id: any, status: any){
    this.apiS.updateCouponStatus(status, id).subscribe(data => {
      if(data['status'] === 'success'){
        this.toastr.success("Status Update");
        this.getData();
      }
    });
  }

  editCoupon(id: string) {
    this.router.navigate(['/coupons/activity/update'], {
      queryParams: { id: id }
    });
  }
  
  deleteCoupon(id: string) {
    this.apiS.deleteCoupon(id).subscribe((res) => {
      if(res.status){
        this.toastr.success(res.message);
        this.getData();
      }  
    })
  }

}
