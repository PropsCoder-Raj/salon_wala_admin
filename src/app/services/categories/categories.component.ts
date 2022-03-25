import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/__helper/api/api.service';
import { AuthService } from 'src/app/__helper/auth/auth.service';
import { environment } from 'src/environments/environment';
declare var $ : any;
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  categoriesData: any = [];
  baseURL = environment.baseURL;

  constructor(public apiS: ApiService, public router: Router, public toastr: ToastrService, public authService: AuthService) { }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.categoriesData = [];
    $('#categoriesTable').DataTable().destroy();
    this.apiS.getAllServices().subscribe((res) => {
      this.categoriesData = res.data;
      console.log(this.categoriesData);
      setTimeout(() => {
        $('#categoriesTable').DataTable();
      }, 500);
    });
  }

  editcategory(id: string) {
    this.router.navigate(['/services/categories/activity/update'], {
      queryParams: { id: id }
    });
  }
  
  deletecategory(id: string) {
    this.apiS.deleteService(id).subscribe((res) => {
      if(res.status){
        this.toastr.success(res.message);
        this.getData();
      }  
    })
  }
}
