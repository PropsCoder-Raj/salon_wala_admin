import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../__helper/api/api.service';
import { AuthService } from '../../__helper/auth/auth.service';
declare var $: any;

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent implements OnInit {

  transactionList : Array<any> = [];

  constructor(public apiS: ApiService, public authS: AuthService) { }

  ngOnInit(): void {
    this.getTransaction();
  }

  getTransaction(){
    $('#transactionTable').DataTable().destroy();
    this.transactionList = [];
    this.apiS.getVendorTransaction(this.authS.currentUserValue.id).subscribe(data=>{
      if(data['data'].length > 0){
        this.transactionList = data['data'];
        let interval = setInterval(() => {
          if(this.transactionList.length === data['data'].length){
            clearInterval(interval);
            $('#transactionTable').DataTable();
          }
        })
      }
    })
  }

}
