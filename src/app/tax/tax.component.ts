import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../__helper/api/api.service';
declare var $: any;

@Component({
  selector: 'app-tax',
  templateUrl: './tax.component.html',
  styleUrls: ['./tax.component.scss']
})
export class TaxComponent implements OnInit {

  taxData: any = [];

  constructor(public apiS: ApiService, public router: Router, public toastr: ToastrService) { }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.taxData = [];
    $('#taxTable').DataTable().destroy();
    this.apiS.getAllTax().subscribe((res) => {
      this.taxData = res.data;
      setTimeout(() => {
        $('#taxTable').DataTable();
      }, 500);
    });
  }

  editTax(id: string) {
    this.router.navigate(['/tax/activity/update'], {
      queryParams: { id: id }
    });
  }
  
  deleteTax(id: string) {
    this.apiS.deleteTax(id).subscribe((res) => {
      if(res.status){
        this.toastr.success(res.message);
        this.getData();
      }  
    })
  }

}
