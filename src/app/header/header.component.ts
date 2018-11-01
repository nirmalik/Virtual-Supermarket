import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StoreService } from '../services/store.service';
import { UsercontrolService } from '../services/usercontrol.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  currentUserName: string = "Guest";
  hideLogoutBtn: boolean = true;
  constructor(private router: Router, private myService: StoreService,
    private userService: UsercontrolService) {

  }
  ngOnInit() {
    this.myService.currentCustomerInStore.subscribe((data) => {
      if (data) {
        this.currentUserName = data.name;
        this.hideLogoutBtn = false;
      }
    });
  }

  goHome() {
    this.router.navigate(["login"]);
  }

  logout() {
    this.userService.logoutUser().subscribe((data) => {
      if (data.message == "logged out") {
        debugger;
        this.hideLogoutBtn = true;
        this.userService.isLoggedIn = false;
        this.currentUserName = "Guest";
        if (this.router.url == "/login") {
          location.reload();
        } else {
          this.router.navigate(["login"]);
        }
      }
    });
  }

}
