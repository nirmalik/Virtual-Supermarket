import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { StoreService } from '../services/store.service';
import { UsercontrolService } from '../services/usercontrol.service';

@Injectable({
  providedIn: 'root'
})
export class AdminStoreGuard implements CanActivate {
  isUserAdmin: boolean = false;
  constructor(private userService: UsercontrolService, private router: Router) { }
  canActivate(): boolean {
    var isUserLoggedIn = this.userService.isLoggedIn;
    if (isUserLoggedIn){
      return true;
    } else{
      this.router.navigate(["login"]);
    }
  }
}
