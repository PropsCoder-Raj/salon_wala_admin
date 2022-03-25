import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/__helper/api/api.service';
import { AuthService } from 'src/app/__helper/auth/auth.service';
import { UserService } from 'src/app/__helper/user/user.service';
import { formatDate } from "@angular/common";

@Component({
  selector: 'app-bread-provider',
  templateUrl: './bread-provider.component.html',
  styleUrls: ['./bread-provider.component.scss']
})
export class BreadProviderComponent implements OnInit {
  action = 1;
  vendorId = "";
  salutation = "";
  firstName = "";
  lastName = "";
  mobile = "";
  email = "";
  gender = "";
  dob = "";
  address = "";

  shopName = "";
  shopMobile = "";
  shopEmail = "";
  shopAddress = "";
  shopPostalCode = "";
  latitude = "";
  longitude = "";
  usualTime="";
  timings=[{open:"",close:""},{open:"",close:""},{open:"",close:""},{open:"",close:""},{open:"",close:""},{open:"",close:""},{open:"",close:""}]
  monday:boolean=false;
  tuesday:boolean=false;
  wednesday:boolean=false;
  thursday:boolean=false;
  friday:boolean=false;
  saturday:boolean=false;
  sunday:boolean=false;

  commission = '';

  bankName = '';
  bankIFSC = '';
  accountNo: any;
  accountType = '';
  bankId = '';

  password = "";
  passwordError = "";

  salutationError = "";
  firstNameError = "";
  lastNameError = "";
  mobileError = "";
  emailError = "";
  genderError = "";
  dobError = "";
  addressError = "";
  usualTimeError="";
  shopNameError = "";
  shopMobileError = "";
  shopEmailError = "";
  shopAddressError = "";
  shopPostalCodeError = "";
  latitudeError = "";
  longitudeError = "";
  mondayError="";
  tuesdayError="";
  wednesdayError="";
  thursdayError="";
  fridayError="";
  saturdayError="";
  sundayError="";
  viewStatus = false;

  constructor(public route: ActivatedRoute,public apiS:ApiService,public toastr:ToastrService,public authService:AuthService,private router:Router, private title: Title, public userS: UserService) {
    this.title.setTitle("Create Service Provider - SalonWala.com");
   }

  ngOnInit(): void {
    this.route.params.subscribe(data=>{
      if(data.action == "create"){
        this.action = 1;
      }else if(data.action == "update"){
        this.action = 2;
        this.route.queryParams.subscribe(data=>{
          this.vendorId = data.id;
          this.getInfo();
        }) 
      }else if(data.action == "view"){
        this.action = 2;
        this.viewStatus = true;
        this.route.queryParams.subscribe(data=>{
          this.vendorId = data.id;
          this.getInfo();
        }) 
      }
    })
  }

  

  getInfo() {
    this.userS.getSigleUser(this.vendorId).subscribe(data => {
      console.log(data);
      this.salutation = data['data']['salutation'];
      this.firstName = data['data']['firstName'];
      this.lastName = data['data']['lastName'];
      this.mobile = data['data']['mobile'];
      this.email = data['data']['email'];
      this.gender = data['data']['gender'];
      this.dob = formatDate(data['data']['dob'], "yyyy-MM-dd", 'en-US');;
      this.address = data['data']['address'];
      this.commission = '';
      this.shopName = data['data']['shopName'];
      this.shopMobile = data['data']['shopMobile'];
      this.shopAddress = data['data']['shopAddress'];
      this.shopPostalCode = data['data']['shopPostalCode'];
      this.shopEmail = data['data']['shopEmail'];
      this.latitude = data['data']['lat'];
      this.longitude = data['data']['long'];
      this.commission = data['data']['commission'];
      this.usualTime = data['data']['usualTime'];
      if(data['data']['timings'][0].monday.open !== ""){
        this.monday = true;
        this.timings[0].open = data['data']['timings'][0].monday.open;
        this.timings[0].close = data['data']['timings'][0].monday.close;
      }
      if(data['data']['timings'][0].tuesday.open !== ""){
        this.tuesday = true;
        this.timings[1].open = data['data']['timings'][0].tuesday.open;
        this.timings[1].close = data['data']['timings'][0].tuesday.close;
      }
      if(data['data']['timings'][0].wednesday.open !== ""){
        this.wednesday = true;
        this.timings[2].open = data['data']['timings'][0].wednesday.open;
        this.timings[2].close = data['data']['timings'][0].wednesday.close;
      }
      if(data['data']['timings'][0].thursday.open !== ""){
        this.thursday = true;
        this.timings[3].open = data['data']['timings'][0].thursday.open;
        this.timings[3].close = data['data']['timings'][0].thursday.close;
      }
      if(data['data']['timings'][0].friday.open !== ""){
        this.friday = true;
        this.timings[4].open = data['data']['timings'][0].friday.open;
        this.timings[4].close = data['data']['timings'][0].friday.close;
      }
      if(data['data']['timings'][0].saturday.open !== ""){
        this.saturday = true;
        this.timings[5].open = data['data']['timings'][0].saturday.open;
        this.timings[5].close = data['data']['timings'][0].saturday.close;
      }
      if(data['data']['timings'][0].sunday.open !== ""){
        this.sunday = true;
        this.timings[6].open = data['data']['timings'][0].sunday.open;
        this.timings[6].close = data['data']['timings'][0].sunday.close;
      }
      this.apiS.getSingleBank(this.vendorId).subscribe(bank => {
        this.bankName = bank['data'][0]['bankName'];
        this.bankIFSC = bank['data'][0]['bankIFSC'];
        this.accountNo = bank['data'][0]['accountNo'];
        this.accountType = bank['data'][0]['accountType'];
        this.bankId = bank['data'][0]['_id'];
      });
    });
  }

  createVendor(){

    if(this.salutation == ""){
      this.toastr.error("Please fill all details in Persoanl section");
      this.salutationError = "has-error";
      return;
    }

    if(this.firstName == ""){
      this.toastr.error("Please fill all details in Persoanl section");
      this.firstNameError = "has-error";
      return;
    }

    if(this.lastName == ""){
      this.toastr.error("Please fill all details in Persoanl section");
      this.lastNameError = "has-error";
      return;
    }

    if(this.mobile == ""){
      this.toastr.error("Please fill all details in Persoanl section");
      this.mobileError = "has-error";
      return;
    }

    if(this.email == ""){
      this.toastr.error("Please fill all details in Persoanl section");
      this.emailError = "has-error";
      return;
    }

    if(this.gender == ""){
      this.toastr.error("Please fill all details in Persoanl section");
      this.genderError = "has-error";
      return;
    }

    if(this.dob == ""){
      this.toastr.error("Please fill all details in Persoanl section");
      this.dobError = "has-error";
      return;
    }

    if(this.address == ""){
      this.toastr.error("Please fill all details in Persoanl section");
      this.addressError = "has-error";
      return;
    }

    if(this.shopName == ""){
      this.toastr.error("Please fill all details in Brand section");
      this.shopNameError = "has-error";
      return;
    }

    if(this.shopMobile == ""){
      this.toastr.error("Please fill all details in Brand section");
      this.shopMobileError = "has-error";
      return;
    }

    if(this.shopEmail == ""){
      this.toastr.error("Please fill all details in Brand section");
      this.shopEmailError = "has-error";
      return;
    }

    if(this.shopAddress == ""){
      this.toastr.error("Please fill all details in Brand section");
      this.shopAddressError = "has-error";
      return;
    }

    if(this.shopPostalCode == ""){
      this.toastr.error("Please fill all details in Brand section");
      this.shopPostalCodeError = "has-error";
      return;
    }

    if(this.latitude == ""){
      this.toastr.error("Please fill all details in Brand section");
      this.latitudeError = "has-error";
      return;
    }

    if(this.longitude == ""){
      this.toastr.error("Please fill all details in Brand section");
      this.longitudeError = "has-error";
      return;
    }

    if(this.usualTime == ""){
      this.toastr.error("Please fill all details in Brand section");
      this.usualTimeError = "has-error";
      return;
    }

    if(this.monday){
      if(this.timings[0].open == "" && this.timings[0].close == ""){
        this.toastr.error("Please fill all details in Brand section");
        this.mondayError = "has-error";
        return;
      }
      if(this.timings[0].close <= this.timings[0].open){
        this.toastr.error("Please fill all details in Brand section");
        this.mondayError = "has-error";
        return;
      }
    }
    if(this.tuesday){
      if(this.timings[1].open == "" && this.timings[1].close == ""){
        this.toastr.error("Please fill all details in Brand section");
        this.tuesdayError = "has-error";
        return;
      }
      if(this.timings[1].close <= this.timings[1].open){
        this.toastr.error("Please fill all details in Brand section");
        this.mondayError = "has-error";
        return;
      }
    }
    if(this.wednesday){
      if(this.timings[2].open == "" && this.timings[2].close == ""){
        this.toastr.error("Please fill all details in Brand section");
        this.wednesdayError = "has-error";
        return;
      }
      if(this.timings[2].close <= this.timings[2].open){
        this.toastr.error("Please fill all details in Brand section");
        this.mondayError = "has-error";
        return;
      }
    }
    if(this.thursday){
      if(this.timings[3].open == "" && this.timings[3].close == ""){
        this.toastr.error("Please fill all details in Brand section");
        this.thursdayError = "has-error";
        return;
      }
      if(this.timings[3].close <= this.timings[3].open){
        this.toastr.error("Please fill all details in Brand section");
        this.mondayError = "has-error";
        return;
      }
    }
    if(this.friday){
      if(this.timings[4].open == "" && this.timings[4].close == ""){
        this.toastr.error("Please fill all details in Brand section");
        this.fridayError = "has-error";
        return;
      }
      if(this.timings[4].close <= this.timings[4].open){
        this.toastr.error("Please fill all details in Brand section");
        this.mondayError = "has-error";
        return;
      }
    }
    if(this.saturday){
      if(this.timings[5].open == "" && this.timings[5].close == ""){
        this.toastr.error("Please fill all details in Brand section");
        this.saturdayError = "has-error";
        return;
      }
      if(this.timings[5].close <= this.timings[5].open){
        this.toastr.error("Please fill all details in Brand section");
        this.mondayError = "has-error";
        return;
      }
    }
    if(this.sunday){
      if(this.timings[6].open == "" && this.timings[6].close == ""){
        this.toastr.error("Please fill all details in Brand section");
        this.sundayError = "has-error";
        return;
      }
      if(this.timings[6].close <= this.timings[6].open){
        this.toastr.error("Please fill all details in Brand section");
        this.mondayError = "has-error";
        return;
      }
    }

    if(this.password == ""){
      this.toastr.error("Please fill all details in Auth section");
      this.passwordError = "has-error";
      return;
    }

    if (this.commission == "") {
      this.toastr.error("Please fill all details in Commission section");
      return;
    }

    if (this.bankName == "") {
      this.toastr.error("Please fill all details in Bank section");
      return;
    }


    if (this.bankIFSC == "") {
      this.toastr.error("Please fill all details in Bank section");
      return;
    }


    if (this.accountNo == 0) {
      this.toastr.error("Please fill all details in Bank section");
      return;
    }


    if (this.accountType == "") {
      this.toastr.error("Please fill all details in Bank section");
      return;
    }


    const data = JSON.stringify({
      salutation: this.salutation,
      firstName: this.firstName,
      lastName: this.lastName,
      mobile: this.mobile,
      email: this.email,
      gender: this.gender,
      dob: this.dob,
      address: this.address,
    
      shopName: this.shopName,
      shopMobile: this.shopMobile,
      shopEmail: this.shopEmail,
      shopAddress: this.shopAddress,
      shopPostalCode: this.shopPostalCode,
      lat: this.latitude,
      long: this.longitude,

      password: this.password,

      commission: this.commission,
      bankName: this.bankName,
      bankIFSC: this.bankIFSC,
      accountNo: this.accountNo,
      accountType: this.accountType,
      usualTime:this.usualTime,
      timings:{monday:{open:this.timings[0].open,close:this.timings[0].close},
      tuesday:{open:this.timings[1].open,close:this.timings[1].close},wednesday:{open:this.timings[2].open,close:this.timings[2].close},
      thursday:{open:this.timings[3].open,close:this.timings[3].close},friday:{open:this.timings[4].open,close:this.timings[4].close},
      saturday:{open:this.timings[5].open,close:this.timings[5].close},sunday:{open:this.timings[6].open,close:this.timings[6].close}},
      roles: ["serviceVendor"],
    });

    this.apiS.createServiceVendor(data).subscribe(res=>{
        if(res.status == "success"){
          this.toastr.success("Provider Created Successfully");
          this.router.navigateByUrl("/services/providers");
        } else {
          this.toastr.error(res.message);
        }
    });




  }

  editVendor(){
    
    const data = JSON.stringify({
      salutation: this.salutation,
      firstName: this.firstName,
      lastName: this.lastName,
      mobile: this.mobile,
      email: this.email,
      gender: this.gender,
      dob: this.dob,
      address: this.address,
      shopName: this.shopName,
      shopMobile: this.shopMobile,
      shopEmail: this.shopEmail,
      shopAddress: this.shopAddress,
      shopPostalCode: this.shopPostalCode,
      lat: this.latitude,
      long: this.longitude,
      timings:{monday:{open:this.timings[0].open,close:this.timings[0].close},
      tuesday:{open:this.timings[1].open,close:this.timings[1].close},wednesday:{open:this.timings[2].open,close:this.timings[2].close},
      thursday:{open:this.timings[3].open,close:this.timings[3].close},friday:{open:this.timings[4].open,close:this.timings[4].close},
      saturday:{open:this.timings[5].open,close:this.timings[5].close},sunday:{open:this.timings[6].open,close:this.timings[6].close}},
      commission: this.commission,
      bankName: this.bankName,
      usualTime:this.usualTime,
      bankIFSC: this.bankIFSC,
      accountNo: this.accountNo,
      accountType: this.accountType,
    });

    console.log(data);

    this.apiS.updateServiceVendor(data, this.vendorId).subscribe(res => {
      if (res.status == "success") {
        this.apiS.updateBank(this.bankName, this.bankIFSC, this.accountNo, this.accountType, this.bankId).subscribe(data => {
          if(data['status'] === 'success'){
            this.toastr.success("Provider Update Successfully");
            this.router.navigateByUrl("/services/providers");
          }
        });
      } else {
        this.toastr.error(res.message);
      }
    });
  }
}
