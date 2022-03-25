import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../__helper/api/api.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {

  maximumOrderSubtotal = 0;
  minimumOrderSubtotal = 0;
  amount = 0;
  id = '';

  constructor(public toast: ToastrService, public api: ApiService) { }

  ngOnInit(): void {
    this.getData();
  }

  getData(){
    this.api.getSettings().subscribe(res=>{
      this.id = res.data._id;
      this.amount = res.data.amount;
      this.maximumOrderSubtotal = res.data.maximumOrderSubtotal;
      this.minimumOrderSubtotal = res.data.minimumOrderSubtotal;
    });
  }
  
  saveRefer(){
    this.api.saveRefer(this.amount,this.id).subscribe(res=>{
      if(res.status == "success"){
        this.toast.success(res.message);
      } else {
        this.toast.error(res.message);
      }
    });
  }

  saveCartCheckout(){
    if(this.minimumOrderSubtotal == 0 || this.maximumOrderSubtotal == 0){
      this.api.saveCartCheckout(this.minimumOrderSubtotal,this.maximumOrderSubtotal,this.id).subscribe(res=>{
        if(res.status == "success"){
          this.toast.success(res.message);
        } else {
          this.toast.error(res.message);
        }
      }); 
    }else{
      if(this.minimumOrderSubtotal < this.maximumOrderSubtotal){
        this.api.saveCartCheckout(this.minimumOrderSubtotal,this.maximumOrderSubtotal,this.id).subscribe(res=>{
          if(res.status == "success"){
            this.toast.success(res.message);
          } else {
            this.toast.error(res.message);
          }
        }); 
      }else{
        this.toast.error("Minimum Order Subtotal is always less than Maximum Order Subtotal")
      }
    }
  }

}
