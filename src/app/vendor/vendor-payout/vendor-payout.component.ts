import { Component, OnInit } from '@angular/core';
import { ApiService } from "../../__helper/api/api.service";
import { Title } from "@angular/platform-browser";
import { ExcelService } from 'src/app/__helper/excel/excel.service';
import { ToastrService } from 'ngx-toastr';
// import * as exceljs from "exceljs";
declare var $: any;

@Component({
  selector: 'app-vendor-payout',
  templateUrl: './vendor-payout.component.html',
  styleUrls: ['./vendor-payout.component.scss']
})
export class VendorPayoutComponent implements OnInit {
  public data: Array<any> = [];
  public printData: Array<any> = [];
  public totalPayouts = 0;
  public loader = false;

  constructor(public apiS: ApiService, private title: Title, public excelS: ExcelService, public toastr: ToastrService) {
    this.title.setTitle("Ecommerce Vendor - SalonWala.com");
  }

  ngOnInit(): void {
    this.getData();
  }
  
  exportAsXLSX():void {
    var dToday = new Date();
    var monthToday = dToday.getMonth() + 1;
    var dayToday = dToday.getDate();
    var yearToday = dToday.getFullYear();
    var hour = dToday.getHours();
    var min = dToday.getMinutes();
    var sec = dToday.getSeconds();

    var toToday = [yearToday, monthToday, dayToday, hour, min, sec].join('-');
    this.excelS.exportAsExcelFile(this.printData, 'Payouts Data '+ toToday);
  }

  markAsComplete(){
    let cnt = 0;
    this.loader = true;
    this.data.forEach(element => {
      if(element['data']['wallet'] > 0){
        this.apiS.createTransction(element['data']['wallet'], 'Withdraw', 'withdraw', "Withdraw", "","", element['data']['_id']).subscribe(data => {
          if(data['status'] === 'success'){
            this.apiS.updateWallet(0, element['data']['_id']).subscribe(wallet => {
              if(wallet['status'] === 'success'){
                cnt++;
              }
            })
          }
        })
      }else{
        cnt++;
      }
    }); 


    let interval = setInterval(() =>{
      if(this.data.length === cnt){
        clearInterval(interval);
        this.loader = false;
        this.toastr.success("All Payouts Completed");
        setTimeout(() => {
          location.reload();
        }, 500);
      }
    }, 1000)
  }

  getData() {
    let cnt = 0;
    this.data = [];
    this.apiS.getAllVendors().subscribe(vendors => {
      vendors.data.forEach((element: any) => {
        this.apiS.getSingleBank(element['_id']).subscribe(bank => {
          cnt++;
          this.totalPayouts = this.totalPayouts + element['wallet']; 
          this.data.push({ data: element, bank: bank['data'][0] })
          this.printData.push({
            "Sr. No.": cnt,
            "Name": element['salutation'] + ' ' + element['firstName'] + ' ' + element['lastName'],
            "Shop Name": element['shopName'],
            "Bank Name": bank['data'][0]['bankName'],
            "Bank IFSC": bank['data'][0]['bankIFSC'],
            "Account Number": bank['data'][0]['accountNo'],
            "Account Type": bank['data'][0]['accountType'],
            "Wallet": element['wallet'],
          })
        })
      });
      let interval = setInterval(() => {
        if (cnt === vendors['data'].length) {
          clearInterval(interval);
          $(document).ready(() => {
            $('#vendorsTable').DataTable();
          });
        }
      }, 1000)
    });
  }

}
