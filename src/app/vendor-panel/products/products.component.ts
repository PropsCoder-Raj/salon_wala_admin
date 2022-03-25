import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../__helper/api/api.service';
import { AuthService } from '../../__helper/auth/auth.service';
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

  constructor(public apiS:ApiService,public router:Router,public toastr:ToastrService, public auth: AuthService) { }

  ngOnInit(): void {
    console.log(this.auth.currentUserValue);
   this.getData();
  }
  getData(){
    this.data=[];
    this.apiS.getAllProductUserWise(this.auth.currentUserValue.id).subscribe(data=>{
      this.data = data.data;
      $(document).ready(() => {
        $('#productsTable').DataTable();
      });
    });
    
  }
  editProduct(id: string) {
    this.router.navigate(['/vendor-panel/products/activity/update'], {
      queryParams: { id: id }
    });
  }
  deleteProduct(id: string) {
    this.apiS.deleteProduct(id).subscribe((res) => {
      if(res.status){
        this.toastr.success(res.message);
        this.getData();
      }  
    })
  }

  viewProduct(id:any){
    this.router.navigate(['/vendor-panel/products/activity/view'], {
      queryParams: { id: id }
    });
  }

}
