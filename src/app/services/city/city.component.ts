import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/__helper/api/api.service';
import { AuthService } from 'src/app/__helper/auth/auth.service';
import { environment } from 'src/environments/environment';
declare var $ : any;

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.scss']
})
export class CityComponent implements OnInit {
  cityData: any = [];
  baseURL = environment.baseURL;

  constructor(public apiS: ApiService, public router: Router, public toastr: ToastrService, public authService: AuthService) { }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.cityData = [];
    $('#cityTable').DataTable().destroy();
    this.apiS.getAllCity().subscribe((res) => {
      this.cityData = res.data;
      console.log(this.cityData);
      setTimeout(() => {
        $('#cityTable').DataTable();
      }, 500);
    });
  }

  editcity(id: string) {
    this.router.navigate(['/services/city/activity/update'], {
      queryParams: { id: id }
    });
  }
  
  deletecity(id: string) {
    this.apiS.deleteCity(id).subscribe((res) => {
      if(res.status){
        this.toastr.success(res.message);
        this.getData();
      }  
    })
  }
}
