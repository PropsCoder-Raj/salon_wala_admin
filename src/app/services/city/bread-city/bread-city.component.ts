import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/__helper/api/api.service';
import { AuthService } from 'src/app/__helper/auth/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-bread-city',
  templateUrl: './bread-city.component.html',
  styleUrls: ['./bread-city.component.scss']
})
export class BreadCityComponent implements OnInit {


  cityStatus = 0;
  city_name = '';
  sub_city_name='';
  sub_city_id='';
  sub_sub_city_name='';
  thumbnail = '';
  cityId = '';
  imageSrc: any;
  subCategories:any=[];
  subSubCategories:any=[];
  baseURL=environment.baseURL;
  constructor(public route: ActivatedRoute, public apiS: ApiService, public toastr: ToastrService, public router: Router, public authService: AuthService) { }

  ngOnInit(): void {
    this.route.params.subscribe(data=>{
      if(data.action == "create"){
        this.cityStatus = 1;
      }else if(data.action == "update"){
        this.cityStatus = 2;
        this.route.queryParams.subscribe(data=>{
          this.cityId = data.id;
          this.getSingleCity(data.id);
        })  
      }
    });
  }

  getSingleCity(id: any){
    this.apiS.getSingleCity(id).subscribe((res) => {
      this.city_name = res.data[0].CityName;
      this.thumbnail = res.data[0].thumbnail;
      $('#Thumbnail').text(this.thumbnail);
    });
  }

  readURL(event: any): void {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      // const reader = new FileReader();
      // reader.onload = e => this.imageSrc = reader.result;
      // reader.readAsDataURL(file);
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
    if (this.cityStatus == 1) {
      this.createCity(needEdit);
    } else if (this.cityStatus == 2) {
      this.updateCity();
    }
  }

  createCity(needEdit:boolean){
    if(this.city_name !== '' && this.thumbnail !== ''){
      this.apiS.createCity(this.city_name, this.thumbnail).subscribe(result => {
        if(result.status){
          this.toastr.success(result.message);
          this.clearForm();
          if(needEdit){
            this.router.navigate(["/services/city/activity/update"],{queryParams:{id:result.data._id}});
          }
        } else {
          this.toastr.error(result.message);
        }
      });
    }else{
      this.toastr.error("All data Mendatory.");
    }
  }

  updateCity(){
    if(this.city_name !== '' && this.thumbnail !== ''){
      this.apiS.updateCity(this.city_name, this.thumbnail, this.cityId).subscribe(result => {
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


  clearForm(){
    this.cityStatus = 0;
    this.city_name = '';
    this.thumbnail = '';
    location.reload();
  }

  back(){
    window.history.back();
  }

}
