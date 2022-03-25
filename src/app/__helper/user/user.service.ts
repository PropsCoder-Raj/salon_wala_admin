import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor(public http: HttpClient) {
  }


  get(): Observable<any> {
    return this.http.get(`${environment.baseURL}/user/all`,);
  }

  // getSigle
  getSigleBooking(id : any) {
    return this.http.get<any>(`${environment.baseURL}/bookings-single/`+ id, )
    .pipe(map(data => {
      return data;
    }));
  }

  // Get User Bookings
  getAllBookings() {
    return this.http.get<any>(`${environment.baseURL}/bookings-all`)
    .pipe(map(data => {
      return data;
    }));
  }

  
  // getAllUsers
  getAllUsers() {
    return this.http.get<any>(`${environment.baseURL}/user/all`,)
      .pipe(map(data => {
        return data;
      }));
  }
  
  // updateUser
  updateUser(id: any, firstName: any, lastName: any, email: any, mobile: any, dob: any ) {
    const data = JSON.stringify({
      "firstName": firstName,
      "lastName": lastName,
      "email": email,
      "mobile": mobile,
      "dob": dob,
    });
    return this.http.put<any>(`${environment.baseURL}/user/update`+ id, data)
    .pipe(map(data => {
      return data;
    }));
  }
  
  // getSigleUser
  getSigleUser(id : any) {
    return this.http.get<any>(`${environment.baseURL}/user/`+ id, )
    .pipe(map(data => {
      return data;
    }));
  }
  
  // changePassword
  changePassword(id : any, password : any) {
    const data = JSON.stringify({
      "password": password
    });
    return this.http.put<any>(`${environment.baseURL}/user/change-password/` + id, data, )
    .pipe(map(data => {
      return data;
    }));
  }

  // updateWishList
  updateWishlist(id: any, wishlistArr: any) {
    const data = JSON.stringify({
      "wishlist": wishlistArr
    });
    return this.http.put<any>(`${environment.baseURL}/user/wishlist/`+ id, data)
    .pipe(map(data => {
      return data;
    }));
  }

  // getWishList
  getWishlist(id: any) {
    return this.http.get<any>(`${environment.baseURL}/user/wishlist/`+ id)
    .pipe(map(data => {
      return data;
    }));
  }
  
  // getCart
  getCart(id: any) {
    return this.http.get<any>(`${environment.baseURL}/user/cart/`+ id)
    .pipe(map(data => {
      return data;
    }));
  }
  
  // updateCart
  updateCart(id: any, cartArr: any) {
    const data = JSON.stringify({
      "cart": cartArr
    });
    return this.http.put<any>(`${environment.baseURL}/user/cart/`+ id, data)
    .pipe(map(data => {
      return data;
    }));
  }


  /*********************************   Orders   ***********************************/

  // Get All Orders
  getAllOrders() {
    return this.http.get<any>(`${environment.baseURL}/order-all`)
      .pipe(map(data => {
        return data;
      }));
  }

  // getAllLatest
  getAllOrdersLatest() {
    return this.http.get<any>(`${environment.baseURL}/order-latest`,)
      .pipe(map(data => {
        return data;
      }));
  }

  // Get Users Orders
  getUsersOrders(id: any) {
    return this.http.get<any>(`${environment.baseURL}/order/` + id)
      .pipe(map(data => {
        return data;
      }));
  }

  // Get Users Using Customer Id
  getSingleCustomerId(id: any) {
    return this.http.get<any>(`${environment.baseURL}/customer/id/` + id)
      .pipe(map(data => {
        return data;
      }));
  }

  // getSingleOrder
  getSingleOrder(id: any) {
    return this.http.get<any>(`${environment.baseURL}/order-single/`+ id)
    .pipe(map(data => {
      return data;
    }));
  }
}
