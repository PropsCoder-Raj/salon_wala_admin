import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/__helper/api/api.service';
declare var $ : any;

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  data:any=[];
  productStatus = 0;
  imageSrc: any;

  constructor(public apiS:ApiService,public router:Router,public toastr:ToastrService) { }

  ngOnInit(): void {
   this.getData();
  }
  getData(){
    this.data=[];
    this.apiS.getAllServiceProduct().subscribe(data=>{
      console.log(data.data);
      this.data = data.data;
      $(document).ready(() => {
        $('#productsTable').DataTable();
      });
    });
  
  }
  editProduct(id: string) {
    this.router.navigate(['/services/products/activity/update'], {
      queryParams: { id: id }
    });
  }
  deleteProduct(id: string) {
    this.apiS.deleteServiceProduct(id).subscribe((res) => {
      if(res.status){
        this.toastr.success(res.message);
        this.getData();
      }  
    })
  }
}
