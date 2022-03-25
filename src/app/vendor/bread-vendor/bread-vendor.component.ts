import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/__helper/api/api.service';
import { AuthService } from 'src/app/__helper/auth/auth.service';
import { Title } from "@angular/platform-browser";
import { UserService } from 'src/app/__helper/user/user.service';
import { formatDate } from "@angular/common";

@Component({
  selector: 'app-bread-vendor',
  templateUrl: './bread-vendor.component.html',
  styleUrls: ['./bread-vendor.component.scss']
})
export class BreadVendorComponent implements OnInit {

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
  commission = '';

  bankName = '';
  bankIFSC = '';
  accountNo: any;
  accountType = '';
  bankId = '';

  shopName = "";
  shopMobile = "";
  shopEmail = "";
  shopAddress = "";
  shopPostalCode = "";
  pickupAddress = "";
  pickupPostalCode = "";

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

  shopNameError = "";
  shopMobileError = "";
  shopEmailError = "";
  shopAddressError = "";
  shopPostalCodeError = "";
  pickupAddressError = "";
  pickuPostalCodeError = "";

  constructor(public route: ActivatedRoute, public apiS: ApiService, public toastr: ToastrService, public authService: AuthService, private router: Router, private title: Title, public userS: UserService) {
    this.title.setTitle("Create ECommerce Vendor - SalonWala.com");
  }

  ngOnInit(): void {
    this.route.params.subscribe(data => {
      if (data.action == "create") {
        this.action = 1;
      } else if (data.action == "update") {
        this.action = 2;
        this.route.queryParams.subscribe(data => {
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
      this.shopEmail = data['data']['shopEmail'];
      this.shopAddress = data['data']['shopAddress'];
      this.shopPostalCode = data['data']['shopPostalCode'];
      this.pickupAddress = data['data']['pickupAddress'];
      this.pickupPostalCode = data['data']['pickupPostalCode'];
      this.commission = data['data']['commission'];
      this.password = data['data']['password'];

      this.apiS.getSingleBank(this.vendorId).subscribe(bank => {
        this.bankName = bank['data'][0]['bankName'];
        this.bankIFSC = bank['data'][0]['bankIFSC'];
        this.accountNo = bank['data'][0]['accountNo'];
        this.accountType = bank['data'][0]['accountType'];
        this.bankId = bank['data'][0]['_id'];
      })
    });
  }

  createVendor() {

    if (this.salutation == "") {
      this.toastr.error("Please fill all details in Persoanl section");
      this.salutationError = "has-error";
      return;
    }

    if (this.firstName == "") {
      this.toastr.error("Please fill all details in Persoanl section");
      this.firstNameError = "has-error";
      return;
    }

    if (this.lastName == "") {
      this.toastr.error("Please fill all details in Persoanl section");
      this.lastNameError = "has-error";
      return;
    }

    if (this.mobile == "") {
      this.toastr.error("Please fill all details in Persoanl section");
      this.mobileError = "has-error";
      return;
    }

    if (this.email == "") {
      this.toastr.error("Please fill all details in Persoanl section");
      this.emailError = "has-error";
      return;
    }

    if (this.gender == "") {
      this.toastr.error("Please fill all details in Persoanl section");
      this.genderError = "has-error";
      return;
    }

    if (this.dob == "") {
      this.toastr.error("Please fill all details in Persoanl section");
      this.dobError = "has-error";
      return;
    }

    if (this.address == "") {
      this.toastr.error("Please fill all details in Persoanl section");
      this.addressError = "has-error";
      return;
    }

    if (this.shopName == "") {
      this.toastr.error("Please fill all details in Brand section");
      this.shopNameError = "has-error";
      return;
    }

    if (this.shopMobile == "") {
      this.toastr.error("Please fill all details in Brand section");
      this.shopMobileError = "has-error";
      return;
    }

    if (this.shopEmail == "") {
      this.toastr.error("Please fill all details in Brand section");
      this.shopEmailError = "has-error";
      return;
    }

    if (this.shopAddress == "") {
      this.toastr.error("Please fill all details in Brand section");
      this.shopAddressError = "has-error";
      return;
    }

    if (this.shopPostalCode == "") {
      this.toastr.error("Please fill all details in Brand section");
      this.shopPostalCodeError = "has-error";
      return;
    }

    if (this.pickupAddress == "") {
      this.toastr.error("Please fill all details in Brand section");
      this.pickupAddressError = "has-error";
      return;
    }

    if (this.pickupPostalCode == "") {
      this.toastr.error("Please fill all details in Brand section");
      this.pickuPostalCodeError = "has-error";
      return;
    }

    if (this.password == "") {
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
      pickupAddress: this.pickupAddress,
      pickupPostalCode: this.pickupPostalCode,

      password: this.password,

      commission: this.commission,
      bankName: this.bankName,
      bankIFSC: this.bankIFSC,
      accountNo: this.accountNo,
      accountType: this.accountType,

      roles: ["vendor"]
    });

    console.log(data);

    this.apiS.createVendor(data).subscribe(res => {
      if (res.status == "success") {
        this.toastr.success("Vendor Created Successfully");
        this.router.navigateByUrl("/vendor");
      } else {
        this.toastr.error(res.message);
      }
    });
  }

  editVendor() {
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
      pickupAddress: this.pickupAddress,
      pickupPostalCode: this.pickupPostalCode,
      commission: this.commission,
      bankName: this.bankName,
      bankIFSC: this.bankIFSC,
      accountNo: this.accountNo,
      accountType: this.accountType,
    });

    console.log(data);

    this.apiS.updateVendor(data, this.vendorId).subscribe(res => {
      if (res.status == "success") {
        this.apiS.updateBank(this.bankName, this.bankIFSC, this.accountNo, this.accountType, this.bankId).subscribe(data => {
          if(data['status'] === 'success'){
            this.toastr.success("Vendor Update Successfully");
            this.router.navigateByUrl("/vendor");
          }
        });
      } else {
        this.toastr.error(res.message);
      }
    });
  }

}
