import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/__helper/api/api.service';
import { AuthService } from 'src/app/__helper/auth/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-bread-products',
  templateUrl: './bread-products.component.html',
  styleUrls: ['./bread-products.component.scss']
})
export class BreadProductsComponent implements OnInit {
  name: any;
  description: any;
  tags: any;
  model: any;
  sku: any;
  price: any;
  isShippingReq = 1;
  featured: boolean = false;
  serviceChecked: any = [];
  servicesArr: any = [];
  length: any;
  width: any;
  height: any;
  weight: any;
  status = 1;
  productStatus = 0;
  img: Array<any> = [];
  productId: any;
  baseURL = environment.baseURL;

  subcategory: any = [];
  category: any = [];
  subcategoryId = '';
  categoryId = '';
  action = '';
  viewStatus = false;

  constructor(public route: ActivatedRoute, public apiS: ApiService, public toastr: ToastrService, public authService: AuthService, public router: Router) { }

  getAllSubCategories() {
    this.apiS.getAllSubServices().subscribe(data => {
      if (data['status'] === 'success') {
        this.subcategory = data['data'];
      }
    })
  }

  getAllCategories() {
    this.apiS.getAllServices().subscribe(data => {
      if (data['status'] === 'success') {
        this.category = data['data'];
      }
    })
  }

  addFieldValue() {
    this.img.push({ url: '', type: '' });
  }

  deleteFieldValue(index: any) {
    this.img.splice(index, 1);
  }

  ngOnInit(): void {
    this.getService();
    this.getAllSubCategories();
    this.getAllCategories();
    this.route.params.subscribe(data => {
      if (data.action == "create") {
        this.productStatus = 1;
      } else if (data.action == "update") {
        this.productStatus = 2;
        this.route.queryParams.subscribe(data => {
          this.productId = data.id;
          this.getSingleServiceProduct(data.id);
        })
      }
    })
  }
  getSingleServiceProduct(id: any) {
    this.apiS.getSingleServiceProduct(id).subscribe((res) => {
      console.log(res.data[0].name);
      this.name = res.data[0].name;
      this.description = res.data[0].description;
      this.tags = res.data[0].tags;
      this.status = res.data[0].status;
      this.img = [];
      for (let i = 0; i < res.data[0].media.length; i++) {
        this.img.push({ url: res.data[0].media[i].url, type: res.data[0].media[i].type });
      }
    });
  }

  getService() {
    this.servicesArr = [];
    this.apiS.getAllServices().subscribe(data => {
      this.servicesArr = data.data;
    });
  }
  shipping(event: any) {
    console.log(event.target.value);
    this.isShippingReq = event.target.value;
  }
  chooseService(id: string, event: any) {

    if (event.target.checked) {
      this.serviceChecked.push(id);

    } else {
      this.serviceChecked.forEach((element: string, index: any) => {
        if (element == id) this.serviceChecked.splice(index, 1);
      });

    }
    console.log(this.serviceChecked);
  }
  readURL(event: any, index: any): void {

    if (event.target.files && event.target.files[0]) {
      let fileData: FormData = new FormData();
      fileData.append('file', event.target.files[0]);
      this.apiS.uploadFile(fileData).subscribe(res => {
        console.log(res);
        if (res.data) {
          this.img[index].url = res.data.url;
          this.img[index].type = 'image';
        }
      });
    }
  }
  featuredPro(event: any) {
    console.log(event.target.checked)
    this.featured = event.target.checked;
  }
  createProduct() {
    if (this.name !== '' && this.description !== '' && this.tags !== '' && this.img.length > 0) {
      this.apiS.createServiceProduct(this.name, this.description, this.tags, this.status, this.img).subscribe(result => {
        if (result.status) {
          this.toastr.success(result.message);
          this.clearForm();
          this.router.navigate(['/services/products']);
        } else {
          this.toastr.error(result.message);
        }
      });
    } else {
      this.toastr.error("All data Mendatory.");
    }
  }
  editProduct() {
    if (this.name !== '' && this.description !== '' && this.tags !== '' && this.img.length > 0) {
      this.apiS.updateServiceProduct(this.name, this.description, this.tags, this.status, this.img, this.productId).subscribe(result => {
        if (result.status) {
          this.toastr.success(result.message);
          this.router.navigate(['/services/products']);
        } else {
          this.toastr.error(result.message);
        }
      });
    } else {
      this.toastr.error("All data Mendatory.");
    }
  }
  clearForm() {
    this.name = "";
    this.description = "";
    this.tags = "";
    this.model = "";
    this.sku = "";
    this.price = "";
    this.featured = false;
    this.serviceChecked = [];
    this.length = "";
    this.width = "";
    this.height = "";
    this.weight = "";
    this.status = 1;
    this.img = [];
  }

}
