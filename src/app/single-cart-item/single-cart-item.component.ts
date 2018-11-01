import { Component, OnInit, Input } from '@angular/core';
import { CartItem } from '../models/CartItem';
import { StoreService } from '../services/store.service';

@Component({
  selector: 'app-single-cart-item',
  templateUrl: './single-cart-item.component.html',
  styleUrls: ['./single-cart-item.component.css']
})
export class SingleCartItemComponent implements OnInit {
  @Input() singleItem: CartItem;
  showOrNot: boolean = true;
  constructor(private myService: StoreService) { }

  ngOnInit() {
    this.myService.showDeleteIcon.subscribe((data) => {
      if (data == false) {
        this.showOrNot = false;
      } else {
        this.showOrNot = true;
      }
    });
  }

  removeProduct() {
    this.myService.deleteItem.next(this.singleItem);
  }
}
