import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsercontrolService } from '../services/usercontrol.service';
import { StoreService } from '../services/store.service';

@Injectable({
  providedIn: 'root'
})
export class CanactivateGuard implements CanActivate {
  isUserLoggedIn: boolean;
  constructor(private authService: UsercontrolService,
    private router: Router,
    private storeService: StoreService) { }

  canActivate = async (): Promise<boolean> => {
    if (!this.authService.isLoggedIn) {
      let varo = await this.promiseResolver();
    };
    this.isUserLoggedIn = this.authService.isLoggedIn;
    if (this.isUserLoggedIn) {
      return true;
    } else {
      this.router.navigate(["login"]);
    };
  };


  promiseResolver() {
    return new Promise(resolve => {
      this.storeService.getSession().subscribe((data) => {
        if (!data.error) {
          this.authService.isLoggedIn = true;
        };
        // everything you want to do =]
        resolve(null);
      });
    })
  };
}
