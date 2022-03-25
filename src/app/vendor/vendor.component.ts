import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ApiService } from '../__helper/api/api.service';
declare var $ : any;

@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.scss']
})
export class VendorComponent implements OnInit {
  public data:any=[];
  constructor(public apiS:ApiService,private title: Title, public router: Router) {
    this.title.setTitle("Ecommerce Vendor - SalonWala.com");
   }

  ngOnInit(): void {
    this.getData();
  }
  getData(){
    this.data=[];
    this.apiS.getAllVendors().subscribe(vendors=>{
      this.data = vendors.data;
      console.log(this.data);
      $(document).ready(() => {
        $('#vendorsTable').DataTable();
      });
    });
  }
  vendorDashBoard(id: any){
    this.router.navigate(['/vendor/dashboard/'+id]);
  }
  vendorUpdate(id: any){
    this.router.navigate(['/vendor/activity/update'], {
      queryParams: {id : id}
    })
  }

}
