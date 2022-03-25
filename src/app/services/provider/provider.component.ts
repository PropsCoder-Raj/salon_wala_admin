import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/__helper/api/api.service';
declare var $ : any;
@Component({
  selector: 'app-provider',
  templateUrl: './provider.component.html',
  styleUrls: ['./provider.component.scss']
})
export class ProviderComponent implements OnInit {
  public data:any=[];
  constructor(public apiS:ApiService, public router: Router) { }

  ngOnInit(): void {
    this.getData();
  }
  getData(){
    this.data=[];
    this.apiS.getAllServiceVendors().subscribe(vendors=>{
      this.data = vendors.data;
      console.log(this.data);
      $(document).ready(() => {
        $('#vendorsTable').DataTable();
      });
    });
  }
  
  providersView(id: any){
    this.router.navigate(['/services/providers/dashboard/'+id])
    // this.router.navigate(['/services/providers/activity/view'], {
    //   queryParams: {id : id}
    // })
  }
  providersUpdate(id: any){
    this.router.navigate(['/services/providers/activity/update'], {
      queryParams: {id : id}
    })
  }
}
