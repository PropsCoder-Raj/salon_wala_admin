import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as $ from "jquery";
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/__helper/api/api.service';
import { AuthService } from 'src/app/__helper/auth/auth.service';
import { environment } from 'src/environments/environment';
declare var CKEDITOR: any;

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
  isShippingReq = 0;
  featured: boolean = false;
  categoryChecked: any = [];
  categoryArr: any = [];
  length: any;
  width: any;
  height: any;
  weight: any;
  status = 1;
  productStatus = 0;
  img: Array<any> = [];
  taxes: Array<any> = [];
  productId: any;
  baseURL = environment.baseURL;



  subsubcategory: any = [];
  subcategory: any = [];
  category: any = [];
  subsubcategoryId = '';
  subcategoryId = '';
  categoryId = '';
  action = '';
  viewStatus = false;

  taxesArray: any;
  constructor(public route: ActivatedRoute,public apiS:ApiService,public toastr:ToastrService,public authService:AuthService, public router: Router) { }

  getAllSubSubCategories() {
    this.apiS.getAllSubSubCategories().subscribe(data => {
      if (data['status'] === 'success') {
        this.subsubcategory = data['data'];
      }
    })
  }

  getAllTaxes(){
    this.apiS.getAllTax().subscribe(data => {
      this.taxesArray = data['data'];
    });
  }

  getAllSubCategories() {
    this.apiS.getAllSubCategories().subscribe(data => {
      if (data['status'] === 'success') {
        this.subcategory = data['data'];
      }
    })
  }

  getAllCategories() {
    this.apiS.getAllCategories().subscribe(data => {
      if (data['status'] === 'success') {
        this.category = data['data'];
      }
    })
  }

  addFieldValueTaxes() {
    this.taxes.push({ _id: '' });
  }

  deleteFieldValueTaxes(index: any) {
    this.taxes.splice(index, 1);
  }

  addFieldValue() {
    this.img.push({ url: '', type: '' });
  }

  deleteFieldValue(index: any) {
    this.img.splice(index, 1);
  }

  ngOnInit(): void {
    this.getAllCategories();
    this.getAllSubCategories();
    this.getAllSubSubCategories();
    this.getAllTaxes();
    this.route.params.subscribe(data => {
      this.action = data.action;
      if (this.action == "create") {
        this.productStatus = 1;
      } else if (this.action == "update") {
        this.productStatus = 2;
        this.route.queryParams.subscribe(data => {
          this.productId = data.id;
          this.getSingleProduct(data.id);
        })
      } else if (this.action == "view") {
        this.viewStatus = true;
        this.productStatus = 2;
        this.route.queryParams.subscribe(data => {
          this.productId = data.id;
          this.getSingleProduct(data.id);
        })
      }
    })
  }
  getSingleProduct(id: any) {
    this.apiS.getSingleProduct(id).subscribe((res) => {
      this.name = res.data[0].name;
      this.description = res.data[0].description;
      this.tags = res.data[0].tags;
      this.model = res.data[0].model;
      this.sku = res.data[0].sku;
      this.price = res.data[0].price;
      this.featured = res.data[0].featured;
      this.isShippingReq = res.data[0].isShippingRequired;
      this.length = res.data[0].Length;
      this.width = res.data[0].Width;
      this.height = res.data[0].Height;
      this.weight = res.data[0].weight;
      this.status = res.data[0].status;
      this.subsubcategoryId = res.data[0].subsubcategories;
      this.subcategoryId = res.data[0].subcategories;
      this.categoryId = res.data[0].category;
      this.img = res.data[0].media;
      this.taxes = res.data[0].taxes;
    });
  }
  shipping(event: any) {
    console.log(event.target.value);
    this.isShippingReq = event.target.value;
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
    if (this.name !== '' && this.description !== '' && this.tags !== '' && this.model !== '' && this.sku !== ''
      && this.price !== '' && this.subsubcategoryId !== '' && this.subcategoryId !== '' && this.categoryId !== ''
      && this.length !== '' && this.width !== '' && this.height !== '' && this.weight !== '' && this.img.length > 0) {
      this.apiS.createProduct(this.name, this.description, this.tags, this.model, this.sku, this.price, this.isShippingReq, this.featured, this.subsubcategoryId, this.subcategoryId, this.categoryId, this.length, this.width, this.height, this.weight, this.status, this.img, this.authService.currentUserValue.id, this.taxes).subscribe(result => {
        if (result.status) {
          this.toastr.success(result.message);
          this.clearForm();
          this.router.navigate(['/products']);
        } else {
          this.toastr.error(result.message);
        }
      });
    } else {
      this.toastr.error("All data Mendatory.");
    }
  }
  editProduct() {
    if (this.name !== '' && this.description !== '' && this.tags !== '' && this.model !== '' && this.sku !== ''
      && this.price !== '' && this.subsubcategoryId !== '' && this.subcategoryId !== '' && this.categoryId !== ''
      && this.length !== '' && this.width !== '' && this.height !== '' && this.weight !== '' && this.img.length > 0) {
      this.apiS.updateProduct(this.name, this.description, this.tags, this.model, this.sku, this.price, this.isShippingReq, this.featured, this.subsubcategoryId, this.subcategoryId, this.categoryId, this.length, this.width, this.height, this.weight, this.status, this.img, this.productId, this.taxes).subscribe(result => {
        if (result.status) {
          this.toastr.success(result.message);
          this.router.navigate(['/products']);
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
    this.categoryChecked = [];
    this.length = "";
    this.width = "";
    this.height = "";
    this.weight = "";
    this.status = 1;
    this.img = [];
  }
}
