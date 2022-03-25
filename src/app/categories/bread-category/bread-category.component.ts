import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/__helper/api/api.service';
import { AuthService } from 'src/app/__helper/auth/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-bread-category',
  templateUrl: './bread-category.component.html',
  styleUrls: ['./bread-category.component.scss']
})
export class BreadCategoryComponent implements OnInit {
  
  categoryStatus = 0;
  category_name = '';
  sub_category_name='';
  sub_category_id='';
  sub_sub_category_name='';
  thumbnail = '';
  categoryId = '';
  imageSrc: any;
  subCategories:any=[];
  subSubCategories:any=[];
  baseURL=environment.baseURL;
  constructor(public route: ActivatedRoute, public apiS: ApiService, public toastr: ToastrService, public router: Router, public authService: AuthService) { }

  ngOnInit(): void {
    this.route.params.subscribe(data=>{
      if(data.action == "create"){
        this.categoryStatus = 1;
      }else if(data.action == "update"){
        this.categoryStatus = 2;
        this.route.queryParams.subscribe(data=>{
          this.categoryId = data.id;
          this.getSingleCategory(data.id);
          this.getData();
        })  
      }
    });
  }

  getSingleCategory(id: any){
    this.apiS.getSingleCategory(id).subscribe((res) => {
      this.category_name = res.data[0].categoryName;
      this.thumbnail = res.data[0].thumbnail;
      $('#Thumbnail').text(this.thumbnail);
    });
  }

  getData(){
    this.subCategories=[];
    this.subSubCategories=[];
    this.apiS.getSubCategoryByCategoryId(this.categoryId).subscribe(data=>{
      console.log(data)
      this.subCategories = data.data;
      for(let i=0;i<data.data.length;i++){
        this.apiS.getSubSubCategoryByCategoryId(data.data[i]._id).subscribe(subCat=>{
          this.subSubCategories[data.data[i]._id]=subCat.data;
        })
      }
      console.log(this.subSubCategories)
    })
  }

  readURL(event: any): void {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = e => this.imageSrc = reader.result;
      reader.readAsDataURL(file);
      let fileData: FormData = new FormData();
      fileData.append('file', event.target.files[0]);
      this.apiS.uploadFile(fileData).subscribe(res => {
        console.log(res);
        if (res.data) {
          this.thumbnail = res.data.url;
        }
      });
    }
  }

  submit(needEdit:boolean) {
    if (this.categoryStatus == 1) {
      this.createCategory(needEdit);
    } else if (this.categoryStatus == 2) {
      this.updateCategory();
    }
  }

  createCategory(needEdit:boolean){
    if(this.category_name !== '' && this.thumbnail !== ''){
      this.apiS.createCategory(this.category_name, this.thumbnail).subscribe(result => {
        if(result.status){
          this.toastr.success(result.message);
          this.clearForm();
          if(needEdit){
            this.router.navigate(["/categories/activity/update"],{queryParams:{id:result.data._id}});
          }
        } else {
          this.toastr.error(result.message);
        }
      });
    }else{
      this.toastr.error("All data Mendatory.");
    }
  }
  addSubCategory(){
    if(this.sub_category_name !== ''){
      this.apiS.createSubCategory(this.sub_category_name, this.categoryId).subscribe(result => {
        if(result.status){
          this.toastr.success(result.message);
          this.sub_category_name="";
          this.getData();
        } else {
          this.toastr.error(result.message);
        }
      });
    }else{
      this.toastr.error("All data Mendatory.");
    }
  }

  addSubSubCategory(){
    if(this.sub_sub_category_name !== '' && this.sub_category_id !== ''){
      this.apiS.createSubSubCategory(this.sub_sub_category_name,this.sub_category_id).subscribe(result => {
        if(result.status){
          this.toastr.success(result.message);
          this.sub_sub_category_name="";
          this.getData();
        } else {
          this.toastr.error(result.message);
        }
      });
    }else{
      this.toastr.error("All data Mendatory.");
    }
  }

  updateCategory(){
    if(this.category_name !== '' && this.thumbnail !== ''){
      this.apiS.updateCategory(this.category_name, this.thumbnail, this.categoryId).subscribe(result => {
        if(result.status){
          this.toastr.success(result.message);
          this.clearForm();
        } else {
          this.toastr.error(result.message);
        }
      });
    }else{
      this.toastr.error("All data Mendatory.");
    }
  }

  deleteSubCategory(id:any){
    this.apiS.deleteSubCategory(id).subscribe(data=>{
      if(data.status){
        this.toastr.success(data.message);
        this.getData();
      } else {
        this.toastr.error(data.message);
      }
    });
    this.apiS.deleteSubSubCategoryByCategoryId(id).subscribe(subData=>{
      if(subData.status){
        this.toastr.success(subData.message);
        this.getData();
      } else {
        this.toastr.error(subData.message);
      }
    });
  }

  deleteSubSubCategory(id:any){
    this.apiS.deleteSubSubCategory(id).subscribe(data=>{
      if(data.status){
        this.toastr.success(data.message);
        this.getData();
      } else {
        this.toastr.error(data.message);
      }
    });
  }

  clearForm(){
    this.categoryStatus = 0;
    this.category_name = '';
    this.thumbnail = '';
    this.router.navigate(['/categories']);
  }

}
