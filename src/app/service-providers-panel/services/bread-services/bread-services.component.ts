import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as $ from "jquery";
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/__helper/api/api.service';
import { AuthService } from 'src/app/__helper/auth/auth.service';
import { environment } from 'src/environments/environment';
declare var CKEDITOR: any;


@Component({
  selector: 'app-bread-services',
  templateUrl: './bread-services.component.html',
  styleUrls: ['./bread-services.component.scss']
})
export class BreadServicesComponent implements OnInit {

  servicesStatus = 0;
  action = '';
  viewStatus = false;

  servicesProductsList: Array<any> = [];
  newServicesList: Array<any> = [];
  searchText = '';
  addTrueCount = 0;

  name = '';
  time = 0;
  price = 0;
  serviceId = '';

  

  constructor(public route: ActivatedRoute, public apiS: ApiService, public toastr: ToastrService, public authService: AuthService, public router: Router) { }

  ngOnInit(): void {
    this.getServicesProductsList();
    this.route.params.subscribe(data => {
      this.action = data.action;
      if (this.action == "create") {
        this.servicesStatus = 1;
      } else if (this.action == "update") {
        this.servicesStatus = 2;
        this.route.queryParams.subscribe(data => {
          this.serviceId = data.id;
          this.getSingleVendorServiceProduct(this.serviceId);
        })
      } else if (this.action == "view") {
        this.viewStatus = true;
        this.servicesStatus = 2;
        this.route.queryParams.subscribe(data => {
          this.serviceId = data.id;
          this.getSingleVendorServiceProduct(this.serviceId);
        })
      }
    })
  }

  getSingleVendorServiceProduct(id: any){
    this.apiS.getSingleVendorServiceProduct(id).subscribe(data => {
      this.price = data['data'][0]['price'];
      this.time = data['data'][0]['time'];
      this.apiS.getSingleServiceProduct(data['data'][0]['serviceProduct'][0]).subscribe(dataService=>{
        this.name = dataService['data'][0]['name'];
      })
    });
  }

  getServicesProductsList(){
    this.apiS.getAllServiceProduct().subscribe(data=> {
      data['data'].forEach((element: any) => {
        this.servicesProductsList.push({data: element, add: false, time: '', price: ''});
      });
    })
  }

  addServices(item: any){
    this.newServicesList.push(item);
  }

  editService(){
    this.apiS.updateVendorServiceProduct(this.time, this.price,this.serviceId).subscribe(res=>{
      if(res['status'] == 'success'){
        this.toastr.success("Service Update Successfully.")
        this.router.navigate(['/service-providers-panel/services']);
      }
    })
  }

  createService(){
    let cnt = 0;
    this.servicesProductsList.forEach((element: any) => {
      if(element['add'] === true){
        this.apiS.createVendorServiceProduct(element['time'], element['price'], element['data']['_id']).subscribe((res) => {
          if(res['status'] == 'success'){
            cnt++;
          }
          if(cnt === this.addTrueCount){
            this.toastr.success("Services Add Successfully.");
            this.router.navigate(['/service-providers-panel/services']);
          }
        });
      }
    });
  }

}
