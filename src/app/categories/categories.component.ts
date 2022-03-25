import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { ApiService } from '../__helper/api/api.service';
import { AuthService } from '../__helper/auth/auth.service';
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
    this.apiS.getAllCategories().subscribe((res) => {
      this.categoriesData = res.data;
      setTimeout(() => {
        $('#categoriesTable').DataTable();
      }, 500);
    });
  }

  editcategory(id: string) {
    this.router.navigate(['/categories/activity/update'], {
      queryParams: { id: id }
    });
  }
  
  deletecategory(id: string) {
    this.apiS.deleteCategory(id).subscribe((res) => {
      if(res.status){
        this.toastr.success(res.message);
        this.getData();
      }  
    })
  }
}
