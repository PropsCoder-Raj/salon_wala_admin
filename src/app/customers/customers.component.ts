import { Component, OnInit } from '@angular/core';
import { ApiService } from '../__helper/api/api.service';
declare var $ : any;

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {

  constructor(public api: ApiService) { }

  data:any = [];
  ngOnInit(): void {
    this.getData();
  }

  getData(){
    this.data=[];
    this.api.getAllUsers().subscribe(users=>{
      this.data = users.data;
      console.log(this.data);
      $(document).ready(() => {
        $('#customersTable').DataTable();
      });
    });
  }

}
