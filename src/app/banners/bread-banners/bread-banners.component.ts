import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/__helper/api/api.service';
import { AuthService } from 'src/app/__helper/auth/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-bread-banners',
  templateUrl: './bread-banners.component.html',
  styleUrls: ['./bread-banners.component.scss']
})
export class BreadBannersComponent implements OnInit {
  actionStatus = 0; // 1 for create & 2 for edit
  banners: Array<any> = [];
  media: Array<any> = [];
  baseURL=environment.baseURL;
  bannerName = '';
  desc = '';
  bannerId = '';

  constructor(public route: ActivatedRoute, public apiS: ApiService, public toastr: ToastrService, public router: Router,public authService:AuthService) { }

  addFieldValue() {
    this.banners.push({  url: '', type: '',link:''});
  }

  deleteFieldValue(index: any) {
    this.banners.splice(index, 1);
  }

  ngOnInit(): void {
    this.route.params.subscribe(data => {
      if (data.action == "create") {
        this.actionStatus = 1;
      } else if (data.action == "update") {
        this.actionStatus = 2;
        this.route.queryParams.subscribe(data=>{
          this.bannerId = data.id;
          this.getSingleBanner(data.id);
        }) 
      }
    });
  }

  getSingleBanner(id: any){
    this.apiS.getSingleBanner(id).subscribe((res) => {
      console.log(res);
      this.bannerName = res.data[0].name;
      this.desc = res.data[0].description;
      for(let i=0;i<res.data[0].media.length;i++){
        this.banners.push({ url: res.data[0].media[i].url, link: res.data[0].media[i].link, type:  res.data[0].media[i].type});
      }
      // this.bannerName = res.data[0].categoryName;
      // this.thumbnail = res.data[0].thumbnail;
      // $('#Thumbnail').text(this.thumbnail);
    });
  }

  readURL(event: any, index: any): void {

    if (event.target.files && event.target.files[0]) {
      let fileData: FormData = new FormData();
      fileData.append('file', event.target.files[0]);

      this.apiS.uploadFile(fileData).subscribe(res => {
        if (res.data) {
          this.banners[index].url = res.data.url;
          this.banners[index].type = 'image';
        }
      });
    }
  }

  submit() {
    if (this.actionStatus == 1) {
      this.createBanner();
    } else if (this.actionStatus == 2) {
      this.updateBanner();
    }
  }

  createBanner() {
    console.log(this.banners);
    if(this.bannerName !== '' && this.desc !== '' && this.banners.length > 0){
      this.apiS.createBanner(this.bannerName, this.desc, this.banners).subscribe(result => {
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

  updateBanner() {
    console.log(this.banners);
    if(this.bannerName !== '' && this.desc !== '' && this.banners.length > 0){
      this.apiS.updateBanner(this.bannerName, this.desc, this.banners,this.bannerId).subscribe(result => {
        if(result.status){
          this.toastr.success(result.message);
        } else {
          this.toastr.error(result.message);
        }
      });
    }else{
      this.toastr.error("All data Mendatory.");
    }
  }

  clearForm(){
    this.actionStatus = 0;
    this.bannerName = '';
    this.desc = '';
    this.media = [];
    this.banners = [];
    this.router.navigate(['/banners']);
  }

}
