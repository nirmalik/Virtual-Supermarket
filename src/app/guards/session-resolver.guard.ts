import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { StoreService } from '../services/store.service';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class SessionResolverGuard implements Resolve<any> {
  constructor(private myService: StoreService) { }
  resolve = async () => {
    let data = await this.promise();
    if (data.hasOwnProperty('error')) {
      return data;
    } else {
      let finalData = await this.gettingUserDetails(data);
      return finalData;
    };
  };

  gettingUserDetails = (data) => {
    let that = this;
    return new Promise(resolve => {
      that.myService.getUserDetails(data).subscribe(response => {
        resolve(response);
      });
    });
  }

  promise = () => {
    let that = this;
    return new Promise(resolve => {
      that.myService.getSession().subscribe(data => {
        resolve(data);
      });
    });
  }
}


