import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../__helper/api/api.service';
import { AuthService } from '../../__helper/auth/auth.service';
declare var $ : any;

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {
  data:Array<any>=[];
  productStatus = 0;
  imageSrc: any;

  serviceProductsList : Array<any> = [];

  constructor(public apiS:ApiService,public router:Router,public toastr:ToastrService, public auth: AuthService) { }

  ngOnInit(): void {
    console.log(this.auth.currentUserValue);
   this.getData();
  }
  getData(){
    let cnt = 0;
    this.data=[];
    this.apiS.getUserVendorServiceProduct(this.auth.currentUserValue.id).subscribe(data=>{
      data.data.forEach((element: any) => {
        this.apiS.getSingleServiceProduct(element['serviceProduct'][0]).subscribe(dataService=>{
          cnt++;
          this.data.push({ time:element['time'], price:element['price'], _id:element['_id'], name: dataService['data'][0]['name'] })
        })
      });
      let interval = setInterval(() => {
        if(data.data.length === cnt){
          clearInterval(interval);     
          $(document).ready(() => {
            $('#servicesTable').DataTable();
          });
        }
      })
    });
    
  }
  editProduct(id: string) {
    this.router.navigate(['/service-providers-panel/services/activity/update'], {
      queryParams: { id: id }
    });
  }
  deleteProduct(id: string) {
    this.apiS.deleteVendorServiceProduct(id).subscribe((res) => {
      if(res.status){
        this.toastr.success(res.message);
        this.getData();
      }  
    })
  }
  viewProduct(id:any){
    this.router.navigate(['/service-providers-panel/services/activity/view'], {
      queryParams: { id: id }
    });
  }

}

