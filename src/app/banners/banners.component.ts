import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../__helper/api/api.service';
declare var $ : any;

@Component({
  selector: 'app-banners',
  templateUrl: './banners.component.html',
  styleUrls: ['./banners.component.scss']
})
export class BannersComponent implements OnInit {

  data:any=[]
  constructor(public api: ApiService,public router:Router) { }

  ngOnInit(): void {
    this.getData();
  }

  getData(){
    this.data=[];
    this.api.getAllBanner().subscribe(data=>{
      this.data = data.data;
      $(document).ready(() => {
        $('#bannerTable').DataTable();
      });
    });
  }
  editBanner(id: string) {
    this.router.navigate(['/banners/activity/update'], {
      queryParams: { id: id }
    });
  }

}
