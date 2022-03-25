import { Component } from '@angular/core';
import { AuthService } from './__helper/auth/auth.service';
import * as $ from "jquery";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'salonwala-admin';
  isLogin = true;

  constructor(private authenticationService: AuthService ){
    const currentUser = this.authenticationService.currentUserValue;
    if (currentUser) {
      this.isLogin = true;
      $("#mainBody").addClass("hold-transition skin-blue sidebar-mini");
    } else {
      this.isLogin = false;
    }
  }
}
